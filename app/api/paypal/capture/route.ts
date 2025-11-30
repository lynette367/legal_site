import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { capturePayPalOrder } from '@/lib/paypal/orders';
import { prisma, UserCreditsService } from '@/lib/prisma';

/**
 * POST /api/paypal/capture
 * 捕获（完成）PayPal 订单支付，并为用户增加 credits（需要登录）
 */
export async function POST(request: NextRequest) {
  try {
    // 验证用户登录状态
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: '未登录，请先登录' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { paypalOrderId } = body;

    // 验证必需参数
    if (!paypalOrderId) {
      return NextResponse.json(
        { error: '缺少必需参数: paypalOrderId' },
        { status: 400 }
      );
    }

    // 查找内部订单记录（使用 Prisma）
    const orderRecord = await prisma.order.findUnique({
      where: { paypalOrderId },
    });

    if (!orderRecord) {
      return NextResponse.json(
        { error: '订单不存在' },
        { status: 404 }
      );
    }

    // 验证订单归属
    if (orderRecord.userId !== session.user.id) {
      return NextResponse.json(
        { error: '无权操作此订单' },
        { status: 403 }
      );
    }

    // 检查订单是否已经完成
    if (orderRecord.status === 'completed') {
      return NextResponse.json(
        { error: '订单已完成，请勿重复支付' },
        { status: 400 }
      );
    }

    // 捕获 PayPal 订单
    const captureResult = await capturePayPalOrder(paypalOrderId);

    if (!captureResult.success) {
      // 更新订单状态为失败
      await prisma.order.update({
        where: { id: orderRecord.id },
        data: {
          status: 'failed',
          errorMessage: captureResult.error,
        },
      });

      return NextResponse.json(
        { error: captureResult.error || 'PayPal 支付捕获失败' },
        { status: 500 }
      );
    }

    // 支付成功，更新订单状态
    const updatedOrder = await prisma.order.update({
      where: { id: orderRecord.id },
      data: {
        status: 'completed',
        capturedAt: new Date(),
      },
    });

    // 为用户增加 credits（使用 Prisma）
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
  } catch (error: any) {
    console.error('Capture PayPal order error:', error);
    return NextResponse.json(
      { error: error.message || '支付捕获失败' },
      { status: 500 }
    );
  }
}

