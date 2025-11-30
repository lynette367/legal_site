import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserCreditsService } from "@/lib/prisma";
import { callDeepSeek, PROMPTS } from "@/lib/ai/deepseek";

/**
 * POST /api/ai/document
 * 法律文书生成 AI 接口
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
    const { docType, description } = body;

    if (!docType || !description) {
      return NextResponse.json(
        { error: "缺少参数：docType（文书类型）和 description（案情描述）" },
        { status: 400 }
      );
    }

    if (typeof description !== "string" || description.trim().length === 0) {
      return NextResponse.json(
        { error: "案情描述不能为空" },
        { status: 400 }
      );
    }

    // 3. 扣除 Credits（文书生成 = 3 Credits）
    const CREDITS_COST = 3;
    try {
      await UserCreditsService.useCredits(
        userId,
        CREDITS_COST,
        `生成${docType}`
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
    const prompt = `请生成一份${docType}。

案情描述：
${description.trim()}

请按照标准的法律文书格式输出，包含必要的各个部分。`;

    const answer = await callDeepSeek(prompt, PROMPTS.DOCUMENT);

    // 5. 返回结果
    return NextResponse.json({
      success: true,
      answer,
      docType,
      creditsUsed: CREDITS_COST,
    });
  } catch (error: any) {
    console.error("Document API Error:", error);
    return NextResponse.json(
      {
        error: error.message || "AI 调用失败，请稍后重试",
      },
      { status: 500 }
    );
  }
}


