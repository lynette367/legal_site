export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { capturePayPalOrder } from '@/lib/paypal/orders';
import { prisma, UserCreditsService } from '@/lib/prisma';

/**
 * POST /api/paypal/capture
 * Capture (complete) a PayPal order payment and add credits (requires authentication)
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

    const body = await request.json();
    const { paypalOrderId } = body;

    // Validate required params
    if (!paypalOrderId) {
      return NextResponse.json(
        { error: 'Missing required parameter: paypalOrderId' },
        { status: 400 }
      );
    }

    // Find internal order record (Prisma)
    const orderRecord = await prisma.order.findUnique({
      where: { paypalOrderId },
    });

    if (!orderRecord) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Validate order ownership
    if (orderRecord.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'You are not authorized to operate on this order' },
        { status: 403 }
      );
    }

    // Check if order already completed
    if (orderRecord.status === 'completed') {
      return NextResponse.json(
        { error: 'Order already completed. Please do not pay twice.' },
        { status: 400 }
      );
    }

    // Capture PayPal order
    const captureResult = await capturePayPalOrder(paypalOrderId);

    if (!captureResult.success) {
      // Update order status to failed
      await prisma.order.update({
        where: { id: orderRecord.id },
        data: {
          status: 'failed',
          errorMessage: captureResult.error,
        },
      });

      return NextResponse.json(
        { error: captureResult.error || 'Failed to capture PayPal payment' },
        { status: 500 }
      );
    }

    // Payment succeeded, update order status
    const updatedOrder = await prisma.order.update({
      where: { id: orderRecord.id },
      data: {
        status: 'completed',
        capturedAt: new Date(),
      },
    });

    // Add credits for the user (Prisma)
    const userCredits = await UserCreditsService.addCredits(
      orderRecord.userId,
      orderRecord.credits,
      orderRecord.id
    );

    return NextResponse.json({
      success: true,
      order: updatedOrder,
      credits: {
        userId: userCredits.id,
        totalCredits: userCredits.totalCredits,
        usedCredits: userCredits.usedCredits,
        remainingCredits: userCredits.remainingCredits,
        lastUpdated: userCredits.updatedAt,
      },
      captureDetails: {
        captureId: captureResult.captureId,
        status: captureResult.status,
        payer: captureResult.payer,
      },
    });
  } catch (error: unknown) {
    console.error('Capture PayPal order error:', error);
    const message =
      error instanceof Error ? error.message : 'Payment capture failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
