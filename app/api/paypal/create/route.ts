export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createPayPalOrder } from '@/lib/paypal/orders';
import { prisma } from '@/lib/prisma';
import { plans } from '@/data/plans';

/**
 * POST /api/paypal/create
 * Create a PayPal order (requires authentication)
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
    const { planId } = body;

    // Validate required params
    if (!planId) {
      return NextResponse.json(
        { error: 'Missing required parameter: planId' },
        { status: 400 }
      );
    }

    // Find plan info
    const plan = plans.find(p => p.id === planId);
    if (!plan) {
      return NextResponse.json(
        { error: 'Plan not found' },
        { status: 404 }
      );
    }

    // Extract numeric price (strip currency symbol)
    const priceMatch = plan.price.match(/[\d.]+/);
    if (!priceMatch) {
      return NextResponse.json(
        { error: 'Plan price format error' },
        { status: 400 }
      );
    }
    const amount = priceMatch[0];

    // Ensure user exists
    let user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          id: userId,
          totalCredits: 0,
          usedCredits: 0,
          remainingCredits: 0,
        },
      });
    }

    // Create internal order record (Prisma)
    const order = await prisma.order.create({
      data: {
        userId,
        planId: plan.id,
        planName: plan.name,
        credits: plan.credits,
        amount: parseFloat(amount),
        currency: 'USD', // PayPal recommends USD; adjust as needed
        status: 'pending',
      },
    });

    // Create PayPal order
    const paypalResult = await createPayPalOrder(
      amount,
      'USD',
      `${plan.name} - ${plan.credits} credits`
    );

    if (!paypalResult.success) {
      // Update order status to failed
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: 'failed',
          errorMessage: paypalResult.error,
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
      plan: {
        id: plan.id,
        name: plan.name,
        credits: plan.credits,
        amount,
      },
    });
  } catch (error: unknown) {
    console.error('Create PayPal order error:', error);
    const message =
      error instanceof Error ? error.message : 'Failed to create order';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
