import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserCreditsService } from "@/lib/prisma";
import { callDeepSeek, PROMPTS } from "@/lib/ai/deepseek";

/**
 * POST /api/ai/legal-qa
 * 法律问答 AI 接口
 */
export async function POST(request: NextRequest) {
  try {
    // 1. 验证用户登录
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "未登录，请先登录" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // 2. 解析请求参数
    const body = await request.json();
    const { query } = body;

    if (!query || typeof query !== "string" || query.trim().length === 0) {
      return NextResponse.json(
        { error: "缺少参数：query（法律问题）" },
        { status: 400 }
      );
    }

    // 3. 扣除 Credits（1 次调用 = 1 Credit）
    try {
      await UserCreditsService.deductCredits(
        userId,
        1,
        "AI 法律问答"
      );
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "扣除 Credits 失败";
      if (message === "Credits 余额不足") {
        return NextResponse.json(
          { error: "Credits 余额不足，请先购买套餐" },
          { status: 402 }
        );
      }
      throw error;
    }

    // 4. 调用 DeepSeek API
    const answer = await callDeepSeek(
      `用户问题：${query.trim()}`,
      PROMPTS.LEGAL_QA
    );

    // 5. 返回结果
    return NextResponse.json({
      success: true,
      answer,
      creditsUsed: 1,
    });
  } catch (error: unknown) {
    console.error("Legal QA API Error:", error);
    const message =
      error instanceof Error ? error.message : "AI 调用失败，请稍后重试";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

