import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { isPaid: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        totalCredits: true,
        usedCredits: true,
        remainingCredits: true,
      }
    });

    if (!user) {
      return NextResponse.json(
        { isPaid: false, error: 'User not found' },
        { status: 404 }
      );
    }

    const hasActiveSubscription = user.remainingCredits > 0;

    return NextResponse.json({
      success: true,
      isPaid: hasActiveSubscription,
      credits: {
        total: user.totalCredits,
        used: user.usedCredits,
        remaining: user.remainingCredits
      }
    });

  } catch (error) {
    console.error('Subscription check error:', error);
    const message = error instanceof Error ? error.message : 'Failed to check subscription status';
    return NextResponse.json(
      { error: message, isPaid: false },
      { status: 500 }
    );
  }
}
