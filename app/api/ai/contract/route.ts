export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserCreditsService } from "@/lib/prisma";
import { callDeepSeek, PROMPTS } from "@/lib/ai/deepseek";

/**
 * POST /api/ai/contract
 * 合同生成 AI 接口
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
    const { contractType, requirements } = body;

    if (!contractType || !requirements) {
      return NextResponse.json(
        { error: "缺少参数：contractType（合同类型）和 requirements（需求描述）" },
        { status: 400 }
      );
    }

    if (typeof requirements !== "string" || requirements.trim().length === 0) {
      return NextResponse.json(
        { error: "需求描述不能为空" },
        { status: 400 }
      );
    }

    // 3. 扣除 Credits（合同生成 = 3 Credits）
    const CREDITS_COST = 3;
    try {
      await UserCreditsService.deductCredits(
        userId,
        CREDITS_COST,
        `生成${contractType}`
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
    const prompt = `请生成一份${contractType}。

用户需求：
${requirements.trim()}

请按照标准的合同格式输出，包含所有必要条款。`;

    const answer = await callDeepSeek(prompt, PROMPTS.CONTRACT);

    // 5. 返回结果
    return NextResponse.json({
      success: true,
      answer,
      contractType,
      creditsUsed: CREDITS_COST,
    });
  } catch (error: unknown) {
    console.error("Contract API Error:", error);
    const message =
      error instanceof Error ? error.message : "AI 调用失败，请稍后重试";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

