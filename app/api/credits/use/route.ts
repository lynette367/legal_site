export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { UserCreditsService } from '@/lib/prisma';

/**
 * POST /api/credits/use
 * Consume user Credits (AI feature calls)
 */
export async function POST(request: NextRequest) {
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
    const body = await request.json();
    const { amount, description } = body;

    // Validate params
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid Credits amount' },
        { status: 400 }
      );
    }

    if (!description) {
      return NextResponse.json(
        { error: 'Usage description is required' },
        { status: 400 }
      );
    }

    // Deduct Credits
    try {
      const updatedCredits = await UserCreditsService.deductCredits(
        userId,
        amount,
        description
      );

      return NextResponse.json({
        success: true,
        credits: {
          totalCredits: updatedCredits.totalCredits,
          usedCredits: updatedCredits.usedCredits,
          remainingCredits: updatedCredits.remainingCredits,
        },
        message: `Successfully used ${amount} Credits`,
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Failed to deduct Credits';
      if (message.toLowerCase().includes('insufficient')) {
        return NextResponse.json(
          { error: 'Insufficient Credits. Please recharge first.' },
          { status: 400 }
        );
      }
      throw error;
    }
  } catch (error: unknown) {
    console.error('Use credits error:', error);
    const message =
      error instanceof Error ? error.message : 'Failed to use Credits';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
