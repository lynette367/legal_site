import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserCreditsService } from "@/lib/prisma";
import { callDeepSeek, PROMPTS } from "@/lib/ai/deepseek";

/**
 * POST /api/ai/explain
 * 条款解释 AI 接口
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
    const { clause } = body;

    if (!clause || typeof clause !== "string" || clause.trim().length === 0) {
      return NextResponse.json(
        { error: "缺少参数：clause（合同条款）" },
        { status: 400 }
      );
    }

    // 3. 扣除 Credits
    try {
      await UserCreditsService.useCredits(
        userId,
        1,
        "合同条款解释"
      );
    } catch (error: any) {
      if (error.message === "Credits 余额不足") {
        return NextResponse.json(
          { error: "Credits 余额不足，请先购买套餐" },
          { status: 402 }
        );
      }
      throw error;
    }

    // 4. 调用 DeepSeek API
    const prompt = `请解释以下合同条款：

${clause.trim()}

请详细说明这个条款的含义、法律效力和可能的风险。`;

    const answer = await callDeepSeek(prompt, PROMPTS.EXPLAIN);

    // 5. 返回结果
    return NextResponse.json({
      success: true,
      answer,
      creditsUsed: 1,
    });
  } catch (error: any) {
    console.error("Explain API Error:", error);
    return NextResponse.json(
      {
        error: error.message || "AI 调用失败，请稍后重试",
      },
      { status: 500 }
    );
  }
}


