export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { UserCreditsService } from '@/lib/prisma';

/**
 * GET /api/credits/me
 * Retrieve current user's Credits info
 */
export async function GET() {
  try {
    // Verify authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: 'Not authenticated. Please sign in.' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Fetch user Credits
    const credits = await UserCreditsService.getUserCredits(userId);

    return NextResponse.json({
      success: true,
      credits: {
        totalCredits: credits.totalCredits,
        usedCredits: credits.usedCredits,
        remainingCredits: credits.remainingCredits,
        lastUpdated: credits.updatedAt,
      },
    });
  } catch (error: unknown) {
    console.error('Get credits error:', error);
    const message =
      error instanceof Error ? error.message : 'Failed to fetch Credits';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
