export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserCreditsService } from "@/lib/prisma";
import { callDeepSeek, PROMPTS } from "@/lib/ai/deepseek";

/**
 * POST /api/ai/legal-qa
 * Legal Q&A AI endpoint
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
    const { query } = body;

    if (!query || typeof query !== "string" || query.trim().length === 0) {
      return NextResponse.json(
        { error: "Missing parameter: query (legal question)" },
        { status: 400 }
      );
    }

    // 3. Deduct Credits (1 call = 1 Credit)
    try {
      await UserCreditsService.deductCredits(
        userId,
        1,
        "AI legal Q&A"
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
    const answer = await callDeepSeek(
      `User question: ${query.trim()}`,
      PROMPTS.LEGAL_QA
    );

    // 5. Return result
    return NextResponse.json({
      success: true,
      answer,
      creditsUsed: 1,
    });
  } catch (error: unknown) {
    console.error("Legal QA API Error:", error);
    const message =
      error instanceof Error ? error.message : "AI request failed. Please try again.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
