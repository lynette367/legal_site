export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { callDeepSeek, PROMPTS } from "@/lib/ai/deepseek";

const FREE_ACCESS_EMAIL = "yqying95@gmail.com";

/**
 * POST /api/ai/contract
 * Contract generation AI endpoint
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Verify authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json(
        { error: "Not authenticated. Please sign in." },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const userEmail = session.user.email.toLowerCase();

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

    // 3. Check access permission
    const isDeveloper = userEmail === FREE_ACCESS_EMAIL.toLowerCase();

    if (!isDeveloper) {
      // Check remaining contracts for normal users
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { remainingContracts: true },
      });

      if (!user || user.remainingContracts <= 0) {
        return NextResponse.json(
          {
            error: "No remaining contracts. Please purchase a contract generation credit.",
            code: "INSUFFICIENT_CONTRACTS",
          },
          { status: 402 }
        );
      }

      // Deduct 1 contract from remainingContracts
      await prisma.user.update({
        where: { id: userId },
        data: {
          remainingContracts: {
            decrement: 1,
          },
        },
      });
    }

    // 4. Call DeepSeek API
    const prompt = `Draft a ${contractType} based on the requirements below.

Requirements:
${requirements.trim()}

Format requirements:
1. Use standard Markdown format with proper headings (H1, H2, H3)
2. Do NOT add asterisks (*) before or after headings
3. Do NOT add asterisks (*) around quoted content
4. Use **bold** only for important terms, not for entire headings
5. Include actual content, not placeholders
6. Make the contract ready for immediate signing
7. Include all SB 988 required clauses
8. Use professional legal language but clear formatting

Important: The output should be clean Markdown without any unnecessary asterisks or formatting marks. The contract should be directly usable without any modifications needed.`;

    const answer = await callDeepSeek(prompt, PROMPTS.DOCUMENT);

    // 5. Return result
    return NextResponse.json({
      success: true,
      answer,
      contractType,
      remainingContracts: isDeveloper ? "unlimited" : "deducted",
    });
  } catch (error: unknown) {
    console.error("Contract API Error:", error);
    const message =
      error instanceof Error ? error.message : "AI request failed. Please try again.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}