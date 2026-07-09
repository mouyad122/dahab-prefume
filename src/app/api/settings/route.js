import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/session';
import { sanitize } from '@/lib/security';
import { getCache, setCache, invalidateSettings } from '@/lib/cache';


export const dynamic = 'force-dynamic';
// ─── GET /api/settings ────────────────────────────────────────────────────────
// Public endpoint — returns all site settings as a nested key-value map.
// Keys are organized by their category.
export async function GET() {
  try {
    const cacheKey = 'settings:all';
    const cached = await getCache(cacheKey);
    if (cached) {
      return NextResponse.json(cached, {
        headers: { 'X-Cache': 'HIT' },
      });
    }

    const settings = await prisma.siteSettings.findMany({
      orderBy: [{ category: 'asc' }, { key: 'asc' }],
    });

    // Group by category into a nested map: { colors: { key: value }, ... }
    const result = {};
    for (const setting of settings) {
      const cat = setting.category || 'general';
      if (!result[cat]) result[cat] = {};

      // Cast value to its declared type
      let parsed = setting.value;
      if (setting.value_type === 'number') {
        parsed = Number(setting.value);
      } else if (setting.value_type === 'boolean') {
        parsed = setting.value === 'true';
      } else if (setting.value_type === 'json') {
        try { parsed = JSON.parse(setting.value); } catch { /* keep string */ }
      }

      result[cat][setting.key] = parsed;
    }

    await setCache(cacheKey, result, 1800);

    return NextResponse.json(result, {
      headers: { 'X-Cache': 'MISS' },
    });
  } catch (error) {
    console.error('[GET /api/settings]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ─── POST /api/settings ───────────────────────────────────────────────────────
// Admin only — upserts multiple settings at once.
// Body: { settings: [{ key, value, value_type?, category?, label_ar?, label_en? }] }
export async function POST(request) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { settings } = body;

    if (!Array.isArray(settings) || settings.length === 0) {
      return NextResponse.json(
        { error: 'settings must be a non-empty array' },
        { status: 400 }
      );
    }

    // Validate each entry
    for (const s of settings) {
      if (!s.key || typeof s.key !== 'string') {
        return NextResponse.json(
          { error: 'Each setting must have a valid key (string)' },
          { status: 400 }
        );
      }
      if (s.value === undefined || s.value === null) {
        return NextResponse.json(
          { error: `Setting "${s.key}" must have a value` },
          { status: 400 }
        );
      }
    }

    const VALID_TYPES      = ['string', 'number', 'boolean', 'json', 'color', 'url'];
    const VALID_CATEGORIES = ['colors', 'content', 'social', 'hours', 'general', 'branding', 'contact', 'hero', 'layout', 'pos'];

    // Perform all upserts in a transaction
    await prisma.$transaction(
      settings.map((s) => {
        const key        = sanitize(String(s.key)).trim();
        const value      = String(s.value); // store everything as string
        const value_type = VALID_TYPES.includes(s.value_type) ? s.value_type : 'string';
        const category   = VALID_CATEGORIES.includes(s.category) ? s.category : 'general';
        const label_ar   = s.label_ar ? sanitize(String(s.label_ar)) : undefined;
        const label_en   = s.label_en ? sanitize(String(s.label_en)) : undefined;

        return prisma.siteSettings.upsert({
          where:  { key },
          update: {
            value,
            value_type,
            category,
            ...(label_ar !== undefined && { label_ar }),
            ...(label_en !== undefined && { label_en }),
          },
          create: {
            key,
            value,
            value_type,
            category,
            label_ar: label_ar ?? null,
            label_en: label_en ?? null,
          },
        });
      })
    );

    await invalidateSettings();

    return NextResponse.json({ ok: true, updated: settings.length });
  } catch (error) {
    console.error('[POST /api/settings]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
