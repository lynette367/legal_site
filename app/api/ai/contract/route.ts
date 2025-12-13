export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserCreditsService } from "@/lib/prisma";
import { callDeepSeek, PROMPTS } from "@/lib/ai/deepseek";

/**
 * POST /api/ai/contract
 * Contract generation AI endpoint
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Verify authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Not authenticated. Please sign in." },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // 2. Parse payload
    const body = await request.json();
    const { contractType, requirements } = body;

    if (!contractType || !requirements) {
      return NextResponse.json(
        { error: "Missing parameters: contractType and requirements" },
        { status: 400 }
      );
    }

    if (typeof requirements !== "string" || requirements.trim().length === 0) {
      return NextResponse.json(
        { error: "Requirements description cannot be empty" },
        { status: 400 }
      );
    }

    // 3. Deduct Credits (contract generation = 3 Credits)
    const CREDITS_COST = 3;
    try {
      await UserCreditsService.deductCredits(
        userId,
        CREDITS_COST,
        `Generate ${contractType}`
      );
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to deduct Credits";
      if (message.toLowerCase().includes("insufficient")) {
        return NextResponse.json(
          { error: "Insufficient Credits. Please purchase a plan first." },
          { status: 402 }
        );
      }
      throw error;
    }

    // 4. Call DeepSeek API
    const prompt = `Draft a ${contractType} based on the requirements below.

Requirements:
${requirements.trim()}

Use a standard contract structure and include all essential clauses.`;

    const answer = await callDeepSeek(prompt, PROMPTS.CONTRACT);

    // 5. Return result
    return NextResponse.json({
      success: true,
      answer,
      contractType,
      creditsUsed: CREDITS_COST,
    });
  } catch (error: unknown) {
    console.error("Contract API Error:", error);
    const message =
      error instanceof Error ? error.message : "AI request failed. Please try again.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
