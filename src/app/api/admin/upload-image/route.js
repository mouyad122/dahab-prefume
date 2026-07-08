import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { verifyAdminSession, verifyEmployeeSession } from '@/lib/session';

export const dynamic = 'force-dynamic';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const BUCKET = 'images';

export async function POST(request) {
  const adminSession = await verifyAdminSession();
  const employeeSession = await verifyEmployeeSession();

  if (!adminSession && !employeeSession) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseSecretKey) {
    return NextResponse.json({ error: 'Image upload is not configured.' }, { status: 500 });
  }

  let file;
  try {
    const formData = await request.formData();
    file = formData.get('file');
  } catch {
    return NextResponse.json({ error: 'Invalid upload request.' }, { status: 400 });
  }

  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'Image file is required.' }, { status: 400 });
  }

  if (!file.type?.startsWith('image/')) {
    return NextResponse.json({ error: 'Only image files are allowed.' }, { status: 400 });
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return NextResponse.json({ error: 'Image must be less than 5MB.' }, { status: 400 });
  }

  const extension = file.name?.split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'webp';
  const filePath = `${crypto.randomUUID()}.${extension}`;
  const supabase = createClient(supabaseUrl, supabaseSecretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const { error } = await supabase.storage.from(BUCKET).upload(filePath, buffer, {
      contentType: file.type,
      cacheControl: '3600',
      upsert: false,
    });

    if (error) {
      console.error('[POST /api/admin/upload-image]', error.message);
      return NextResponse.json({ error: 'Failed to upload image.' }, { status: 500 });
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
    return NextResponse.json({ url: data.publicUrl });
  } catch (error) {
    console.error('[POST /api/admin/upload-image]', error?.message || error);
    return NextResponse.json({ error: 'Failed to upload image.' }, { status: 500 });
  }
}
