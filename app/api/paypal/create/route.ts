import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createPayPalOrder } from '@/lib/paypal/orders';
import { prisma } from '@/lib/prisma';
import { plans } from '@/data/plans';

/**
 * POST /api/paypal/create
 * 创建 PayPal 订单（需要登录）
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

    const userId = session.user.id;
    const body = await request.json();
    const { planId } = body;

    // 验证必需参数
    if (!planId) {
      return NextResponse.json(
        { error: '缺少必需参数: planId' },
        { status: 400 }
      );
    }

    // 查找套餐信息
    const plan = plans.find(p => p.id === planId);
    if (!plan) {
      return NextResponse.json(
        { error: '套餐不存在' },
        { status: 404 }
      );
    }

    // 提取价格数字（去掉 ¥ 符号）
    const priceMatch = plan.price.match(/[\d.]+/);
    if (!priceMatch) {
      return NextResponse.json(
        { error: '套餐价格格式错误' },
        { status: 400 }
      );
    }
    const amount = priceMatch[0];

    // 确保用户存在
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

    // 创建内部订单记录（使用 Prisma）
    const order = await prisma.order.create({
      data: {
        userId,
        planId: plan.id,
        planName: plan.name,
        credits: plan.credits,
        amount: parseFloat(amount),
        currency: 'USD', // PayPal 建议使用 USD，您可以根据需要修改
        status: 'pending',
      },
    });

    // 创建 PayPal 订单
    const paypalResult = await createPayPalOrder(
      amount,
      'USD',
      `${plan.name} - ${plan.credits} credits`
    );

    if (!paypalResult.success) {
      // 更新订单状态为失败
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: 'failed',
          errorMessage: paypalResult.error,
        },
      });

      return NextResponse.json(
        { error: paypalResult.error || 'PayPal 订单创建失败' },
        { status: 500 }
      );
    }

    // 更新订单记录，保存 PayPal Order ID
    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: {
        paypalOrderId: paypalResult.orderId,
      },
    });

    // 获取支付链接
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
      error instanceof Error ? error.message : '订单创建失败';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
