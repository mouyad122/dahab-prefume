import { NextResponse } from 'next/server';
import { destroyEmployeeSession } from '@/lib/session';


export const dynamic = 'force-dynamic';
export async function POST() {
  try {
    await destroyEmployeeSession();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[POST /api/auth/employee/logout]', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
