import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { UserCreditsService } from '@/lib/prisma';

/**
 * POST /api/credits/use
 * 消费用户 Credits（AI 功能调用）
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
    const { amount, description } = body;

    // 验证参数
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: '无效的 Credits 数量' },
        { status: 400 }
      );
    }

    if (!description) {
      return NextResponse.json(
        { error: '缺少使用描述' },
        { status: 400 }
      );
    }

    // 使用 Credits
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
        message: `成功消费 ${amount} Credits`,
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : '扣除 Credits 失败';
      if (message === 'Credits 余额不足') {
        return NextResponse.json(
          { error: 'Credits 余额不足，请先充值' },
          { status: 400 }
        );
      }
      throw error;
    }
  } catch (error: unknown) {
    console.error('Use credits error:', error);
    const message =
      error instanceof Error ? error.message : '消费 Credits 失败';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
