export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserCreditsService } from "@/lib/prisma";
import { callDeepSeek, PROMPTS } from "@/lib/ai/deepseek";

/**
 * POST /api/ai/document
 * Legal document generation AI endpoint
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
    const { docType, description } = body;

    if (!docType || !description) {
      return NextResponse.json(
        { error: "Missing parameters: docType (document type) and description (case summary)" },
        { status: 400 }
      );
    }

    if (typeof description !== "string" || description.trim().length === 0) {
      return NextResponse.json(
        { error: "Case description cannot be empty" },
        { status: 400 }
      );
    }

    // 3. Deduct Credits (document generation = 3 Credits)
    const CREDITS_COST = 3;
    try {
      await UserCreditsService.deductCredits(
        userId,
        CREDITS_COST,
        `Generate ${docType}`
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
    const prompt = `Draft a ${docType}.

Case description:
${description.trim()}

Use a standard legal document format and include all essential sections.`;

    const answer = await callDeepSeek(prompt, PROMPTS.DOCUMENT);

    // 5. Return result
    return NextResponse.json({
      success: true,
      answer,
      docType,
      creditsUsed: CREDITS_COST,
    });
  } catch (error: unknown) {
    console.error("Document API Error:", error);
    const message =
      error instanceof Error ? error.message : "AI request failed. Please try again.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
