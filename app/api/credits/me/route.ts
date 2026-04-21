export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const FREE_ACCESS_EMAIL = "yqying95@gmail.com";

/**
 * GET /api/credits/me
 * Retrieve current user's contract credits info
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: 'Not authenticated. Please sign in.' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const userEmail = session.user.email?.toLowerCase();

    if (userEmail === FREE_ACCESS_EMAIL.toLowerCase()) {
      return NextResponse.json({
        success: true,
        remainingContracts: -1,
        isDeveloper: true,
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { remainingContracts: true },
    });

    if (!user) {
      return NextResponse.json({
        success: true,
        remainingContracts: 0,
      });
    }

    return NextResponse.json({
      success: true,
      remainingContracts: user.remainingContracts,
      isDeveloper: false,
    });
  } catch (error: unknown) {
    console.error('Get contracts error:', error);
    const message =
      error instanceof Error ? error.message : 'Failed to fetch contracts';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}