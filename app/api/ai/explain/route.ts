export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserCreditsService } from "@/lib/prisma";
import { callDeepSeek, PROMPTS } from "@/lib/ai/deepseek";

/**
 * POST /api/ai/explain
 * Clause explanation AI endpoint
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
    const { clause } = body;

    if (!clause || typeof clause !== "string" || clause.trim().length === 0) {
      return NextResponse.json(
        { error: "Missing parameter: clause (contract clause)" },
        { status: 400 }
      );
    }

    // 3. Deduct Credits
    try {
      await UserCreditsService.deductCredits(
        userId,
        1,
        "Contract clause explanation"
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
    const prompt = `Explain the following contract clause in detail:

${clause.trim()}

Describe its meaning, legal effect, and potential risks.`;

    const answer = await callDeepSeek(prompt, PROMPTS.EXPLAIN);

    // 5. Return result
    return NextResponse.json({
      success: true,
      answer,
      creditsUsed: 1,
    });
  } catch (error: unknown) {
    console.error("Explain API Error:", error);
    const message =
      error instanceof Error ? error.message : "AI request failed. Please try again.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
