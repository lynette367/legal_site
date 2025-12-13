export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getPayPalOrderDetails } from '@/lib/paypal/orders';
import { prisma, UserCreditsService } from '@/lib/prisma';

/**
 * GET /api/paypal/query?orderId=xxx
 * Query order details (requires authentication; user can only view their own orders)
 */
export async function GET(request: NextRequest) {
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
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const paypalOrderId = searchParams.get('paypalOrderId');

    // If no query params, return all user orders
    if (!orderId && !paypalOrderId) {
      const orders = await prisma.order.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });
      
      const userCredits = await UserCreditsService.getUserCredits(userId);
      
      return NextResponse.json({
        success: true,
        orders,
        credits: {
          userId: userCredits.id,
          totalCredits: userCredits.totalCredits,
          usedCredits: userCredits.usedCredits,
          remainingCredits: userCredits.remainingCredits,
          lastUpdated: userCredits.updatedAt,
        },
      });
    }

    // Query a single order
    let orderRecord;
    if (orderId) {
      orderRecord = await prisma.order.findUnique({
        where: { id: orderId },
      });
    } else if (paypalOrderId) {
      orderRecord = await prisma.order.findUnique({
        where: { paypalOrderId },
      });
    }

    if (!orderRecord) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Validate order ownership
    if (orderRecord.userId !== userId) {
      return NextResponse.json(
        { error: 'You are not authorized to view this order' },
        { status: 403 }
      );
    }

    // If PayPal Order ID exists, fetch PayPal order details
    let paypalDetails = null;
    if (orderRecord.paypalOrderId) {
      const paypalResult = await getPayPalOrderDetails(orderRecord.paypalOrderId);
      if (paypalResult.success) {
        paypalDetails = paypalResult.order;
      }
    }

    return NextResponse.json({
      success: true,
      order: orderRecord,
      paypalDetails,
    });
  } catch (error: unknown) {
    console.error('Query order error:', error);
    const message =
      error instanceof Error ? error.message : 'Failed to query order';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
