export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { callDeepSeek } from "@/lib/ai/deepseek";

// Mirrors the existing /api/ai/contract pattern:
// credit deduction commits BEFORE the DeepSeek call so a failed
// generation cannot be retried for free. Credit is refunded on error.

interface DemandLetterInput {
  yourName: string;
  yourAddress?: string;
  clientName: string;
  clientAddress?: string;
  serviceDescription: string;
  invoiceDate?: string;
  dueDate: string;
  amountOwed: string;
  invoiceNumber?: string;
  additionalContext?: string;
}

const CREDIT_COST = 1; // flat $4.99 = 1 credit, per current simplified pricing

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = (await req.json()) as DemandLetterInput;

  if (!body.yourName || !body.clientName || !body.serviceDescription || !body.amountOwed || !body.dueDate) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // --- Deduct credit first (atomic, only if balance sufficient) ---
  const updated = await prisma.user.updateMany({
    where: {
      email: session.user.email,
      remainingContracts: { gte: CREDIT_COST },
    },
    data: {
      remainingContracts: { decrement: CREDIT_COST },
    },
  });

  if (updated.count === 0) {
    return NextResponse.json({ error: "Insufficient credits" }, { status: 402 });
  }

  try {
    const systemPrompt =
      "You are a legal document assistant helping California freelancers draft formal payment demand letters under the Freelance Worker Protection Act (SB 988). Write in a firm, professional, non-threatening tone. Reference SB 988's 30-day payment requirement and statutory double-damages remedy where the facts support it. Do not invent facts not provided. Always include a closing disclaimer that this is not legal advice.";

    const letter = await callDeepSeek(buildPrompt(body), systemPrompt, 0.4);

    if (!letter) {
      throw new Error("Empty response from generation model");
    }

    return NextResponse.json({ letter });
  } catch (err) {
    // Refund the credit since generation failed after deduction.
    await prisma.user.update({
      where: { email: session.user.email },
      data: { remainingContracts: { increment: CREDIT_COST } },
    });

    console.error("Demand letter generation failed:", err);
    return NextResponse.json({ error: "Generation failed, credit refunded" }, { status: 500 });
  }
}

function buildPrompt(input: DemandLetterInput): string {
  return `Draft a formal SB 988 payment demand letter using these facts:

Sender: ${input.yourName}
Sender address: ${input.yourAddress || "[Not provided — leave placeholder]"}
Recipient (client): ${input.clientName}
Recipient address: ${input.clientAddress || "[Not provided — leave placeholder]"}
Invoice number: ${input.invoiceNumber || "[Not provided — leave placeholder]"}
Invoice date: ${input.invoiceDate || "[Not provided — leave placeholder]"}
Payment due date: ${input.dueDate}
Amount owed: $${input.amountOwed}
Work performed: ${input.serviceDescription}
Additional context: ${input.additionalContext || "None provided."}

Structure: sender/recipient blocks, subject line, statement of facts, statutory basis (SB 988 30-day payment rule and double damages for willful violation), clear demand with a deadline (10 business days from letter date), consequences of non-payment, closing, signature block, and a one-line disclaimer that this is not legal advice.`;
}
