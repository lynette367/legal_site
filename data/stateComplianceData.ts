// data/stateComplianceData.ts
//
// Single source of truth for the /compliance/[state]/[industry]
// content cluster — WORKER CLASSIFICATION (1099 vs W-2 / ABC / economic realities /
// non-compete) content, distinct from seoPages.ts (California-only SB 988
// payment/contract content) and distinct from professions.ts (creative freelance
// professions used for SB 988 templates).
//
// California is intentionally excluded here — it already lives at
// /tools/ca-contractor-laws. Do not add a "california"
// entry to stateConfigs; link to the existing page instead.

export interface LocalFaq {
  q: string;
  a: string;
}

export type ClassificationTestType =
  | "ABC" // California-style ABC test
  | "Economic Realities" // multi-factor economic realities test
  | "Common Law" // IRS-style right-to-control test
  | "Statutory" // state has its own named statutory test
  | "Unverified"; // placeholder — do not publish until researched

export interface NonCompeteRule {
  status: "banned" | "restricted" | "unrestricted" | "unverified";
  /** Plain-language summary. Must cite effective dates precisely — many states
   * are mid-transition between an old threshold-based rule and a new ban. */
  summary: string;
  effectiveDate?: string; // ISO date the CURRENT rule as written takes effect
  citation?: string; // bill number / RCW / statute cite
  lastVerified: string; // ISO date this content was last fact-checked — required for legal content
}

export interface StateConfig {
  slug: string; // "washington"
  stateName: string;
  agencyName: string;
  riskLevel: "High" | "Moderate" | "Low" | "Unverified";
  /** Which of the two core algorithms ComplianceAuditTool should run. */
  testType: "ABC" | "Economic Realities";
  /** REQUIRED scoping statement — which liability area this testType claim
   * covers (UI tax, workers' comp, wage claims, etc). A state can use ABC
   * for one purpose and economic realities for another; never state a bare
   * "this state uses the ABC test" without scoping it to a purpose unless
   * independently verified across all purposes. */
  testScope: string;
  classificationTestNote: string;
  /** Shown on-page as the safe-harbor / methodology disclaimer. Required for
   * any state whose testType claim doesn't cover every legal context. */
  methodologyDisclaimer: string;
  nonCompete: NonCompeteRule;
  localFaq: LocalFaq[];
  /**
   * "verified": full state-specific calculator + content, safe to publish.
   * "coming-soon": page still ships (generic federal Economic Realities
   *   calculator + waitlist banner) so it isn't a thin/empty doorway page,
   *   but state-specific claims are withheld until verified.
   */
  status: "verified" | "coming-soon";
}

export interface IndustryConfig {
  slug: string; // "caregiver"
  industryName: string;
  /** Relative weighting used by the quiz component to bias its W-2 risk score
   * for this industry. Not a legal determination — directional only. */
  quizWeights: {
    hasScheduleControl: number;
    providesSupplies: number;
    isCoreBusiness: number;
  };
  industryAlert: string;
  relatedFaqTopics: string[];
  published: boolean;
}

// ─── State seeds ────────────────────────────────────────────────────────────

export const stateConfigs: StateConfig[] = [
  {
    slug: "washington",
    stateName: "Washington",
    agencyName: "Washington State Employment Security Department (ESD) & Dept. of Labor & Industries (L&I)",
    riskLevel: "High",
    testType: "ABC",
    // Verified 2026-07-15: RCW 50.04.140 codifies an ABC-style test used for
    // unemployment insurance purposes; multiple independent sources confirm
    // roughly half of U.S. states (WA included) use some version of ABC for
    // UI, and it's commonly applied for L&I workers' comp premium purposes
    // too. NOT independently verified for wage-and-hour claims (WMWA), which
    // may run on a different standard — hence the scoped language + disclaimer.
    testScope: "unemployment insurance (ESD) and workers' compensation premium (L&I) purposes",
    classificationTestNote:
      "For unemployment insurance and workers' compensation purposes, Washington applies an ABC-style test under RCW 50.04.140: a worker is presumed an employee unless the hiring party proves the worker is free from control, performs work outside the hiring party's usual course of business, and runs an independently established trade. This is a purpose-specific standard — Washington's wage-and-hour claim standard has not been independently verified against this same test.",
    methodologyDisclaimer:
      "This tool applies an ABC-style algorithm calibrated to Washington's unemployment insurance and workers' compensation classification standard (RCW 50.04.140). Washington may apply a different standard for wage-and-hour or contract disputes. Because agencies can apply varying standards depending on the claim type, this tool calculates your Maximum Risk Exposure under the strictest applicable standard — it is a compliance self-assessment, not a formal legal determination or legal advice.",
    nonCompete: {
      status: "restricted",
      summary:
        "Through June 29, 2027, Washington voids non-compete agreements with independent contractors earning below the state's inflation-adjusted threshold (in 2026: $317,147.09 for independent contractors, $126,858.83 for employees). Separately, Engrossed Substitute House Bill 1155 — signed March 23, 2026 — eliminates that income threshold entirely and bans nearly all non-compete covenants for both employees and independent contractors, effective June 30, 2027. Violations allow the greater of actual damages or $5,000 in statutory damages, plus attorney's fees and costs.",
      effectiveDate: "2027-06-30",
      citation: "RCW 49.62; Engrossed Substitute House Bill 1155 (2026)",
      lastVerified: "2026-07-14",
    },
    localFaq: [
      {
        q: "Do I need a business license as an independent contractor in Washington?",
        a: "Generally yes. Washington L&I expects independent contractors to hold a UBI (Unified Business Identifier) and an active business license. Without one, it becomes harder to satisfy the 'independent business' factor in a misclassification audit, increasing the risk of a workers' comp premium assessment against the hiring party.",
      },
      {
        q: "What is the '7-minute rule' in Washington state?",
        a: "It refers to an L&I wage-and-hour timekeeping and rounding practice. It isn't a classification test on its own, but granular, employer-controlled time tracking of a contractor's hours is the kind of behavioral-control evidence that can support reclassifying them as a W-2 employee.",
      },
      {
        q: "Does Washington use the ABC test for every kind of dispute?",
        a: "No. The ABC-style test under RCW 50.04.140 governs unemployment insurance and workers' compensation classification specifically. Wage-and-hour claims and private contract disputes can involve different standards — this tool flags maximum exposure under the strictest applicable test rather than assuming one test covers every context.",
      },
    ],
    status: "verified",
  },
  {
    slug: "oregon",
    stateName: "Oregon",
    agencyName: "Oregon Bureau of Labor and Industries (BOLI)",
    riskLevel: "Unverified",
    testType: "Economic Realities", // generic federal fallback until verified
    testScope: "unverified — generic federal standard shown until Oregon-specific research is complete",
    classificationTestNote: "TODO: research Oregon's controlling classification test(s) before marking verified.",
    methodologyDisclaimer:
      "Oregon-specific classification rules are still being verified. This page currently shows a general assessment based on the federal economic realities test used under the FLSA — it is not Oregon-specific guidance.",
    nonCompete: {
      status: "unverified",
      summary: "TODO: verify Oregon's current non-compete rules for independent contractors before publishing.",
      lastVerified: "",
    },
    localFaq: [],
    status: "coming-soon",
  },
];

// ─── Industry seeds ─────────────────────────────────────────────────────────
// These are directional risk-quiz weightings and general pattern descriptions,
// not state-specific legal claims — safe to publish independent of state
// verification status, but they only render on pages for published states.

export const industryConfigs: IndustryConfig[] = [
  {
    slug: "caregiver",
    industryName: "Healthcare & In-Home Care",
    quizWeights: { hasScheduleControl: 0.9, providesSupplies: 0.7, isCoreBusiness: 0.95 },
    industryAlert:
      "Government agencies heavily scrutinize caregiving arrangements. When the hiring party or family controls how, when, and where care is delivered, workers are frequently classified as employees (W-2) rather than 1099 contractors, regardless of what the written agreement says.",
    relatedFaqTopics: ["Caregiver 1099 vs W-2", "Household employee rules"],
    published: true,
  },
  {
    slug: "tech-consulting",
    industryName: "Technology & Consulting",
    quizWeights: { hasScheduleControl: 0.3, providesSupplies: 0.5, isCoreBusiness: 0.8 },
    industryAlert:
      "Tech engagements often add non-compete or IP-forfeiture clauses to standard 1099 consulting agreements. In states that restrict or ban non-competes for contractors, these clauses may be void even if the contractor signed them.",
    relatedFaqTopics: ["Contractor non-compete enforceability", "IP assignment in consulting agreements"],
    published: true,
  },
  {
    slug: "licensed-trades",
    industryName: "Construction & Licensed Trades",
    quizWeights: { hasScheduleControl: 0.6, providesSupplies: 0.6, isCoreBusiness: 0.7 },
    industryAlert:
      "Licensing matters here: if a tradesperson doesn't hold their own business license, most state classification tests treat that as strong evidence against independent-contractor status.",
    relatedFaqTopics: ["Business license requirements for contractors", "Salon booth renter classification"],
    published: true,
  },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

// "Live" = any state that should get a real page, verified or coming-soon.
// Only fully unlisted/removed states are excluded entirely.
export const liveStates = () => stateConfigs; // all seeded states ship a page
export const verifiedStates = () => stateConfigs.filter((s) => s.status === "verified");
export const publishedIndustries = () => industryConfigs.filter((i) => i.published);

export const stateBySlug = new Map(stateConfigs.map((s) => [s.slug, s]));
export const industryBySlug = new Map(industryConfigs.map((i) => [i.slug, i]));

// ─── Flat slug generation ───────────────────────────────────────────────────
// Mirrors the proven pattern in data/seoPages.ts: one flat array, one slug
// field, one page.tsx, one sitemap loop. Route: /compliance/[slug]
//
// State-only page:      washington-independent-contractor-laws
// State+industry page:  washington-caregiver-independent-contractor-laws
//
// IMPORTANT: coming-soon states still get a slug page (generic federal
// Economic Realities calculator + waitlist banner) so they aren't thin
// doorway pages — but they render with status === "coming-soon" and the
// page component must not surface state-specific claims for them.

export interface ComplianceSlugPage {
  slug: string;
  kind: "state" | "state-industry";
  state: StateConfig;
  industry?: IndustryConfig;
}

export const complianceSlugPages: ComplianceSlugPage[] = [
  // state-only pages (hub-ish, rank for "[state] independent contractor law")
  // Parent path already says "independent-contractor-laws" — don't repeat it
  // in the slug itself, keeps URLs short: /compliance/washington
  ...liveStates().map((state) => ({
    slug: state.slug,
    kind: "state" as const,
    state,
  })),
  // state x industry cross pages (long-tail) — only for verified states;
  // industry-specific claims need a verified state test to hang off of.
  // e.g. /compliance/washington-caregiver
  ...verifiedStates().flatMap((state) =>
    publishedIndustries().map((industry) => ({
      slug: `${state.slug}-${industry.slug}`,
      kind: "state-industry" as const,
      state,
      industry,
    }))
  ),
];

export const complianceSlugBySlug = new Map(complianceSlugPages.map((p) => [p.slug, p]));
export const allComplianceSlugs = complianceSlugPages.map((p) => p.slug);

/** State-only slugs, used to build the hub page's state list without
 * duplicating every state-industry combo in the primary nav. */
export const stateOnlySlugPages = () => complianceSlugPages.filter((p) => p.kind === "state");
