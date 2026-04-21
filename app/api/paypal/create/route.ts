export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createPayPalOrder } from '@/lib/paypal/orders';
import { prisma } from '@/lib/prisma';

const CONTRACT_PRICE = '4.99';
const CONTRACT_DESCRIPTION = 'CA Freelancer Contract Generation - 1 time';

/**
 * POST /api/paypal/create
 * Create a PayPal order for contract generation (requires authentication)
 */
export async function POST() {
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

    // Ensure user exists
    let user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          id: userId,
          remainingContracts: 0,
        },
      });
    }

    // Create internal order record (Prisma)
    const order = await prisma.order.create({
      data: {
        userId,
        amount: parseFloat(CONTRACT_PRICE),
        status: 'pending',
      },
    });

    // Create PayPal order
    const paypalResult = await createPayPalOrder(
      CONTRACT_PRICE,
      'USD',
      CONTRACT_DESCRIPTION
    );

    if (!paypalResult.success) {
      // Update order status to failed
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: 'failed',
        },
      });

      return NextResponse.json(
        { error: paypalResult.error || 'Failed to create PayPal order' },
        { status: 500 }
      );
    }

    // Update order with PayPal Order ID
    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: {
        paypalOrderId: paypalResult.orderId,
      },
    });

    // Retrieve approval link
    const approveLink = paypalResult.links?.find(
      (link) => link.rel === 'approve'
    );

    return NextResponse.json({
      success: true,
      orderId: updatedOrder.id,
      paypalOrderId: paypalResult.orderId,
      approveUrl: approveLink?.href,
      amount: CONTRACT_PRICE,
    });
  } catch (error: unknown) {
    console.error('Create PayPal order error:', error);
    const message =
      error instanceof Error ? error.message : 'Failed to create order';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}