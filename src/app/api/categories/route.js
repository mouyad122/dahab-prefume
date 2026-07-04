import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/session';


export const dynamic = 'force-dynamic';
// ─── GET /api/categories — Public ───────────────────────────────────────────
// Returns all active categories with product count, ordered by display_order.
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: { is_active: true },
      orderBy: { display_order: 'asc' },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    return Response.json({ categories }, { status: 200 });
  } catch (error) {
    console.error('[GET /api/categories]', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ─── POST /api/categories — Admin only ──────────────────────────────────────
// Body: { slug, name_ar, name_en, description_ar?, description_en?, image?, display_order? }
export async function POST(request) {
  try {
    // ── Auth ─────────────────────────────────────────────────────────────────
    const session = await verifyAdminSession();
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // ── Parse body ───────────────────────────────────────────────────────────
    let body;
    try {
      body = await request.json();
    } catch {
      return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const {
      slug,
      name_ar,
      name_en,
      description_ar,
      description_en,
      image,
      display_order,
    } = body;

    // ── Validate required fields ──────────────────────────────────────────────
    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      return Response.json({ error: 'slug is required' }, { status: 400 });
    }
    if (!name_ar || typeof name_ar !== 'string' || name_ar.trim() === '') {
      return Response.json({ error: 'name_ar is required' }, { status: 400 });
    }
    if (!name_en || typeof name_en !== 'string' || name_en.trim() === '') {
      return Response.json({ error: 'name_en is required' }, { status: 400 });
    }

    // Normalize slug: lowercase, trim, replace spaces with hyphens
    const normalizedSlug = slug.trim().toLowerCase().replace(/\s+/g, '-');

    // ── Validate slug uniqueness ─────────────────────────────────────────────
    const existing = await prisma.category.findUnique({
      where: { slug: normalizedSlug },
    });
    if (existing) {
      return Response.json(
        { error: `A category with slug "${normalizedSlug}" already exists` },
        { status: 409 },
      );
    }

    // ── Sanitize & build data ─────────────────────────────────────────────────
    const parsedOrder =
      typeof display_order === 'number' && Number.isFinite(display_order)
        ? Math.floor(display_order)
        : 0;

    const data = {
      slug: normalizedSlug,
      name_ar: name_ar.trim(),
      name_en: name_en.trim(),
      ...(description_ar !== undefined && description_ar !== null && { description_ar: String(description_ar).trim() }),
      ...(description_en !== undefined && description_en !== null && { description_en: String(description_en).trim() }),
      ...(image !== undefined && image !== null && { image: String(image).trim() }),
      display_order: parsedOrder,
    };

    // ── Create ────────────────────────────────────────────────────────────────
    const category = await prisma.category.create({ data });

    return Response.json({ category }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/categories]', error);
    // Prisma unique constraint error
    if (error.code === 'P2002') {
      return Response.json({ error: 'Slug already in use' }, { status: 409 });
    }
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
