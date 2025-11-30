import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getPayPalOrderDetails } from '@/lib/paypal/orders';
import { prisma, UserCreditsService } from '@/lib/prisma';

/**
 * GET /api/paypal/query?orderId=xxx
 * 查询订单详情（需要登录，只能查询自己的订单）
 */
export async function GET(request: NextRequest) {
  try {
    // 验证用户登录状态
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: '未登录，请先登录' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const paypalOrderId = searchParams.get('paypalOrderId');

    // 如果没有指定查询参数，返回用户所有订单
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

    // 查询单个订单
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
        { error: '订单不存在' },
        { status: 404 }
      );
    }

    // 验证订单归属
    if (orderRecord.userId !== userId) {
      return NextResponse.json(
        { error: '无权查看此订单' },
        { status: 403 }
      );
    }

    // 如果有 PayPal Order ID，获取 PayPal 端的订单详情
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
      error instanceof Error ? error.message : '查询订单失败';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
