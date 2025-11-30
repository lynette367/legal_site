import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { UserCreditsService } from '@/lib/prisma';

/**
 * GET /api/credits/me
 * 获取当前用户的 Credits 信息
 */
export async function GET() {
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

    // 获取用户 Credits
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
      error instanceof Error ? error.message : '获取 Credits 失败';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
