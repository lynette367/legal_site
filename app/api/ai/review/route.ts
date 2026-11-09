export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { callDeepSeekJSON, PROMPTS } from "@/lib/ai/deepseek";

/**
 * /api/ai/review — Free AI contract review.
 *
 * Quota order:
 *   1. Developer account → unlimited.
 *   2. Free quota: FREE_REVIEWS_PER_WINDOW reviews per IP per FREE_REVIEW_WINDOW_HOURS
 *      (no login required), subject to a site-wide FREE_REVIEW_DAILY_CAP cost guard.
 *   3. Signed-in users with credits → 1 credit (refunded on failure).
 *
 * Only a salted SHA-256 hash of the IP is stored (FreeReviewUsage table).
 */

const FREE_ACCESS_EMAIL = "yqying95@gmail.com";

const FREE_REVIEWS_PER_WINDOW = Number(process.env.FREE_REVIEWS_PER_WINDOW || 1);
const FREE_REVIEW_WINDOW_HOURS = Number(process.env.FREE_REVIEW_WINDOW_HOURS || 24);
const FREE_REVIEW_DAILY_CAP = Number(process.env.FREE_REVIEW_DAILY_CAP || 200);
const CREDIT_COST = 1;

const MIN_CHARS = 300;
const MAX_CHARS = 30000;

type Severity = "high" | "medium" | "low";
type RiskLevel = Severity | "unknown";

export interface ContractReviewResult {
  summary: string;
  riskLevel: RiskLevel;
  risks: {
    severity: Severity;
    title: string;
    clauseExcerpt: string;
    explanation: string;
    suggestion: string;
  }[];
  missingClauses: { title: string; whyItMatters: string }[];
}

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip")?.trim() || req.ip || "unknown";
}

function hashIp(ip: string): string {
  const salt = process.env.REVIEW_IP_SALT || process.env.NEXTAUTH_SECRET || "";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

function windowStart(): Date {
  return new Date(Date.now() - FREE_REVIEW_WINDOW_HOURS * 60 * 60 * 1000);
}

async function freeReviewsUsed(ipHash: string): Promise<number> {
  return prisma.freeReviewUsage.count({
    where: { ipHash, createdAt: { gte: windowStart() } },
  });
}

async function siteWideCapReached(): Promise<boolean> {
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const used = await prisma.freeReviewUsage.count({ where: { createdAt: { gte: since } } });
  return used >= FREE_REVIEW_DAILY_CAP;
}

const str = (v: unknown, max: number): string =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

const severity = (v: unknown): Severity =>
  v === "high" || v === "medium" || v === "low" ? v : "medium";

/** Normalize model output so the client never receives an unexpected shape. */
function sanitize(raw: unknown): ContractReviewResult {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const riskLevel: RiskLevel =
    r.riskLevel === "high" || r.riskLevel === "medium" || r.riskLevel === "low"
      ? r.riskLevel
      : "unknown";

  const risks = (Array.isArray(r.risks) ? r.risks : [])
    .slice(0, 10)
    .map((x) => {
      const o = (x && typeof x === "object" ? x : {}) as Record<string, unknown>;
      return {
        severity: severity(o.severity),
        title: str(o.title, 120),
        clauseExcerpt: str(o.clauseExcerpt, 240),
        explanation: str(o.explanation, 800),
        suggestion: str(o.suggestion, 800),
      };
    })
    .filter((x) => x.title);

  const order: Record<Severity, number> = { high: 0, medium: 1, low: 2 };
  risks.sort((a, b) => order[a.severity] - order[b.severity]);

  const missingClauses = (Array.isArray(r.missingClauses) ? r.missingClauses : [])
    .slice(0, 8)
    .map((x) => {
      const o = (x && typeof x === "object" ? x : {}) as Record<string, unknown>;
      return { title: str(o.title, 120), whyItMatters: str(o.whyItMatters, 400) };
    })
    .filter((x) => x.title);

  return {
    summary: str(r.summary, 1200) || "Review complete.",
    riskLevel,
    risks,
    missingClauses,
  };
}

/**
 * GET /api/ai/review — does this visitor still have a free review available?
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email?.toLowerCase();
    if (email === FREE_ACCESS_EMAIL) {
      return NextResponse.json({ freeAvailable: true, signedIn: true, isDeveloper: true });
    }
    const [used, capped] = await Promise.all([
      freeReviewsUsed(hashIp(getClientIp(req))),
      siteWideCapReached(),
    ]);
    return NextResponse.json({
      freeAvailable: !capped && used < FREE_REVIEWS_PER_WINDOW,
      signedIn: Boolean(session?.user?.id),
      windowHours: FREE_REVIEW_WINDOW_HOURS,
    });
  } catch (error) {
    console.error("Review quota check failed:", error);
    // Fail open for the UI hint only; POST still enforces the quota.
    return NextResponse.json({ freeAvailable: true, signedIn: false });
  }
}

/**
 * POST /api/ai/review  { contractText: string }
 */
export async function POST(req: NextRequest) {
  let body: { contractText?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const contractText = typeof body.contractText === "string" ? body.contractText.trim() : "";
  if (contractText.length < MIN_CHARS) {
    return NextResponse.json(
      { error: `Please paste the full contract text (at least ${MIN_CHARS} characters).`, code: "TOO_SHORT" },
      { status: 400 }
    );
  }
  if (contractText.length > MAX_CHARS) {
    return NextResponse.json(
      { error: `Contract is too long (max ${MAX_CHARS.toLocaleString()} characters). Paste the key sections only.`, code: "TOO_LONG" },
      { status: 400 }
    );
  }

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ?? null;
  const email = session?.user?.email?.toLowerCase() ?? null;
  const ipHash = hashIp(getClientIp(req));

  // ---- Decide how this review is paid for ----
  let usage: "developer" | "free" | "credit";
  let freeRecordId: string | null = null;

  try {
    if (email === FREE_ACCESS_EMAIL) {
      usage = "developer";
    } else {
      let freeGranted = false;

      if (!(await siteWideCapReached())) {
        // Insert first, then count: concurrent requests from the same IP
        // cannot both squeeze through the quota.
        const record = await prisma.freeReviewUsage.create({ data: { ipHash, userId } });
        const used = await freeReviewsUsed(ipHash);
        if (used <= FREE_REVIEWS_PER_WINDOW) {
          freeGranted = true;
          freeRecordId = record.id;
        } else {
          await prisma.freeReviewUsage.delete({ where: { id: record.id } });
        }
      }

      if (freeGranted) {
        usage = "free";
      } else if (email) {
        const updated = await prisma.user.updateMany({
          where: { email, remainingContracts: { gte: CREDIT_COST } },
          data: { remainingContracts: { decrement: CREDIT_COST } },
        });
        if (updated.count === 0) {
          return NextResponse.json(
            {
              error: "You've used your free review. Get more reviews on the pricing page.",
              code: "INSUFFICIENT_CREDITS",
            },
            { status: 402 }
          );
        }
        usage = "credit";
      } else {
        return NextResponse.json(
          {
            error: `You've used your free review for the last ${FREE_REVIEW_WINDOW_HOURS} hours. Sign in to continue reviewing contracts.`,
            code: "FREE_LIMIT_REACHED",
          },
          { status: 429 }
        );
      }
    }
  } catch (error) {
    console.error("Review quota error:", error);
    return NextResponse.json({ error: "Service temporarily unavailable. Please try again." }, { status: 503 });
  }

  // ---- Run the review; refund on failure ----
  try {
    const raw = await callDeepSeekJSON(
      `Review the following contract and return the JSON report.\n\n<contract>\n${contractText}\n</contract>`,
      PROMPTS.CONTRACT_REVIEW
    );
    const review = sanitize(raw);
    return NextResponse.json({ success: true, review, usage });
  } catch (error) {
    console.error("Contract review failed:", error);
    try {
      if (usage === "free" && freeRecordId) {
        await prisma.freeReviewUsage.delete({ where: { id: freeRecordId } });
      } else if (usage === "credit" && email) {
        await prisma.user.updateMany({
          where: { email },
          data: { remainingContracts: { increment: CREDIT_COST } },
        });
      }
    } catch (refundError) {
      console.error("Review refund failed:", refundError);
    }
    return NextResponse.json(
      { error: "The review failed and was not counted against your quota. Please try again." },
      { status: 500 }
    );
  }
}
