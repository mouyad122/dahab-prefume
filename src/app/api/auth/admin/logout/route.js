import { NextResponse } from 'next/server';
import { destroyAdminSession } from '../../../../../lib/session';

export async function POST() {
  try {
    await destroyAdminSession();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[POST /api/auth/admin/logout]', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
