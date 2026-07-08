import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession, verifyEmployeeSession } from '@/lib/session';
import { sanitize } from '@/lib/security';


export const dynamic = 'force-dynamic';
const VALID_INQUIRY_TYPES = [
  'استفسار عن عطر',
  'توفر منتج',
  'طلب توصية',
  'طلب سابق',
  'استفسار عام'
];

import { rateLimit } from '@/lib/redis';

// ─── POST /api/inquiries (Public Submission) ─────────────────────────────────
export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    
    // Rate limit window: 15 minutes
    const rateLimitWindow = 15 * 60;
    const maxRequests = 5; // Stricter limit: 5 requests per 15 mins

    // IP-based Rate Limiting
    const isIpAllowed = await rateLimit(`rate_limit:inquiry:ip:${ip}`, maxRequests, rateLimitWindow);
    if (!isIpAllowed) {
      return NextResponse.json(
        { error: 'لقد قمت بإرسال عدة استفسارات خلال فترة قصيرة. يرجى المحاولة لاحقًا.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    let { name, phone, type, message } = body;

    // Sanitize input strings
    name = name ? sanitize(String(name).trim()) : '';
    phone = phone ? sanitize(String(phone).trim()) : '';
    type = type ? sanitize(String(type).trim()) : 'استفسار عام';
    message = message ? sanitize(String(message).trim()) : '';

    // Validation
    if (!name || name.length < 2 || name.length > 100) {
      return NextResponse.json({ error: 'يرجى إدخال اسم صحيح (بين 2 و 100 حرف)' }, { status: 400 });
    }

    if (!phone || phone.length < 7 || phone.length > 25) {
      return NextResponse.json({ error: 'يرجى إدخال رقم هاتف صحيح' }, { status: 400 });
    }

    // Phone-based Rate Limiting (normalized)
    const normalizedPhone = phone.replace(/\D/g, '');
    if (normalizedPhone) {
      const isPhoneAllowed = await rateLimit(`rate_limit:inquiry:phone:${normalizedPhone}`, maxRequests, rateLimitWindow);
      if (!isPhoneAllowed) {
        return NextResponse.json(
          { error: 'لقد قمت بإرسال عدة استفسارات خلال فترة قصيرة. يرجى المحاولة لاحقًا.' },
          { status: 429 }
        );
      }
    }

    if (!message || message.length < 3 || message.length > 2000) {
      return NextResponse.json({ error: 'يرجى كتابة نص الرسالة (بحد أقصى 2000 حرف)' }, { status: 400 });
    }

    if (!VALID_INQUIRY_TYPES.includes(type)) {
      type = 'استفسار عام';
    }

    const inquiry = await prisma.contactInquiry.create({
      data: {
        name,
        phone,
        type,
        message,
        status: 'new'
      }
    });

    return NextResponse.json({
      success: true,
      message: 'تم إرسال استفسارك بنجاح! سنقوم بالتواصل معك في أقرب وقت.',
      inquiryId: inquiry.id
    }, { status: 201 });

  } catch (error) {
    console.error('Error handling inquiry submission:', error);
    return NextResponse.json({ error: 'حدث خطأ غير متوقع أثناء إرسال الاستفسار' }, { status: 500 });
  }
}

// ─── GET /api/inquiries (Admin Fetch) ─────────────────────────────────────────
export async function GET(request) {
  try {
    const adminSession = await verifyAdminSession();
    const employeeSession = !adminSession ? await verifyEmployeeSession() : null;

    if (!adminSession && !employeeSession) {
      return NextResponse.json({ error: 'غير مصرح بالوصول' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const search = searchParams.get('search');
    const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 200);
    const page = Math.max(parseInt(searchParams.get('page') || '1', 10), 1);
    const skip = (page - 1) * limit;

    const where = {};

    if (status && status !== 'all') {
      where.status = status;
    }

    if (type && type !== 'all') {
      where.type = type;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
        { message: { contains: search, mode: 'insensitive' } }
      ];
    }

    const [inquiries, total] = await Promise.all([
      prisma.contactInquiry.findMany({
        where,
        orderBy: { created_at: 'desc' },
        take: limit,
        skip
      }),
      prisma.contactInquiry.count({ where })
    ]);

    const countsByStatus = await prisma.contactInquiry.groupBy({
      by: ['status'],
      _count: { status: true }
    });

    const countsMap = {
      all: total,
      new: 0,
      read: 0,
      replied: 0,
      archived: 0
    };

    countsByStatus.forEach(item => {
      countsMap[item.status] = item._count.status;
    });

    return NextResponse.json({
      success: true,
      inquiries,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      countsMap
    });

  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json({ error: 'فشل في جلب الاستفسارات' }, { status: 500 });
  }
}
