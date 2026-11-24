// lib/contractorScreening.ts
// Pure, framework-free screening logic for the California ABC / Borello checker
// on /tools/ca-contractor-laws. This is a PRELIMINARY EDUCATIONAL SCREENING aid.
// It never outputs a legal classification conclusion and never determines the
// final applicability of the ABC Test, the Borello test, or SB 988.
//
// Kept free of JSX/enums so it can be unit-tested with `node --test`.

export type Industry =
  | 'tech'
  | 'creative'
  | 'delivery'
  | 'construction'
  | 'healthcare'
  | 'licensed-professional'
  | 'other';

export type CoreBusiness = 'yes' | 'no';

/** Where the contractor lives / keeps their business. NOT the place of performance. */
export type ContractorLocation =
  | 'san-francisco'
  | 'los-angeles'
  | 'san-diego'
  | 'sacramento'
  | 'other-ca'
  | 'outside-ca';

/** Where the work is actually performed. */
export type WorkLocation = 'in-ca' | 'outside-ca' | 'mixed' | 'unknown';

/** Where the hiring party is located (relevant to BPC § 18101(b)). */
export type HiringPartyLocation = 'in-ca' | 'outside-ca' | 'unknown';

export interface ScreeningInput {
  industry: Industry;
  coreBusiness: CoreBusiness;
  contractorLocation: ContractorLocation;
  workLocation: WorkLocation;
  hiringPartyLocation: HiringPartyLocation;
}

/** Visual tone only — never a legal risk score. */
export type ScreeningTone = 'elevated' | 'lower' | 'unknown';

export interface ScreeningResult {
  /** Descriptive preliminary label, e.g. "Prong B Indicator: Elevated". */
  screeningLabel: string;
  tone: ScreeningTone;
  /** Jurisdiction status for the classification question. */
  jurisdictionStatus: string;
  jurisdictionNote: string;
  /** Starting framework to verify — not a conclusion about which test applies. */
  frameworkToVerify: string;
  headline: string;
  explanation: string;
  /** Industry-specific statutory exception to check (never auto-applied). */
  statutoryExceptionNote: string;
  /** Only verified, city-specific local ordinance notes. */
  localNote?: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export const JURISDICTION_REQUIRES_VERIFICATION = 'Jurisdiction requires verification';
export const SB988_POTENTIALLY_COVERED = 'Potentially covered — verify statutory definitions';
export const SB988_HIRING_PARTY_UNCERTAIN =
  'Coverage uncertain — verify the § 18101(b) hiring-party definition';

// ─── Jurisdiction ────────────────────────────────────────────────────────────

function screenJurisdiction(input: ScreeningInput): {
  status: string;
  note: string;
  californiaFrameworkMayApply: boolean;
} {
  const residenceOutside = input.contractorLocation === 'outside-ca';

  if (input.workLocation === 'in-ca') {
    return {
      status: 'Work performed in California — California framework is the starting point to verify',
      note: residenceOutside
        ? "The contractor's residence or business location outside California does not by itself remove California law for work actually performed in California (see, e.g., Sullivan v. Oracle Corp. (2011) 51 Cal.4th 1191). Choice-of-law and statutory-scope questions still require verification."
        : 'Because the work is performed in California, California worker-classification rules (Labor Code §§ 2775–2787) are the starting point to verify, subject to statutory exceptions.',
      californiaFrameworkMayApply: true,
    };
  }

  if (input.workLocation === 'outside-ca') {
    return {
      status: JURISDICTION_REQUIRES_VERIFICATION,
      note: 'The work is performed outside California. Whether any California classification rule reaches this relationship depends on statutory scope and choice-of-law principles that this tool does not evaluate. Check the law of the state where the work is performed, and federal rules.',
      californiaFrameworkMayApply: false,
    };
  }

  // mixed or unknown
  return {
    status: JURISDICTION_REQUIRES_VERIFICATION,
    note:
      input.workLocation === 'mixed'
        ? 'The work is performed partly inside and partly outside California. California law may apply to some or all of the work depending on where and how much work is performed; this requires verification. The Prong B indicator below assumes California law applies.'
        : 'The place of performance is unknown. Jurisdiction depends primarily on where the work is actually performed, not on where the contractor lives. The Prong B indicator below assumes California law applies.',
    californiaFrameworkMayApply: true,
  };
}

// ─── Industry-specific statutory exceptions (never auto-applied) ─────────────

export function statutoryExceptionNote(industry: Industry): string {
  const gatePrefix =
    'Potential statutory exception — further verification required. Industry match is not statutory qualification. Under Labor Code § 2785(d), a statutory exception applies only if all conditions of the relevant Labor Code section (§§ 2776–2784) are satisfied; otherwise, the ABC Test (§ 2775) generally applies. ';

  switch (industry) {
    case 'creative':
      return (
        gatePrefix +
        'Verify Labor Code § 2778 (professional services): (1) the service falls within a category actually enumerated in § 2778(b)(2); (2) all six general conditions in § 2778(a) are met; and (3) any occupation-specific conditions are met (e.g., § 2778(b)(2)(I) for still photographers, photojournalists, videographers, and photo editors, including its motion-picture exclusion; § 2778(b)(2)(J) for freelance writers, translators, editors, copy editors, illustrators, and newspaper cartoonists). Matching an occupation name does not satisfy § 2778.'
      );
    case 'construction':
      return (
        gatePrefix +
        'Verify Labor Code § 2781 (construction-subcontractor exception): applies only to contractor–subcontractor relationships in the construction industry and only if every condition in § 2781 is met (including a written subcontract, required Contractors State License Board license, and an independently established business). Working in construction does not by itself trigger § 2781.'
      );
    case 'healthcare':
      return (
        gatePrefix +
        'Verify Labor Code § 2783(b): limited to the licensed medical occupations listed in the statute (physicians and surgeons, dentists, podiatrists, psychologists, and veterinarians) performing professional or medical services within the scope of their California license, subject to all statutory conditions. Other healthcare roles are not covered by § 2783(b).'
      );
    case 'licensed-professional':
      return (
        gatePrefix +
        'Verify Labor Code § 2783 (specific designated occupations — separate from § 2778 professional services): check the exact listed occupation, license, service relationship, and all statutory conditions. § 2783 is not a blanket exemption for all licensed occupations, and some occupations grouped in this option (for example, real estate licensees) are addressed by separate provisions. Note on AB 1514 (Stats. 2025, ch. 305), effective 2026-01-01: AB 1514 amended § 2778 (professional services) to extend the licensed-manicurist exception for 2026-01-01 through 2028-12-31 (inoperative 2029-01-01) subject to manicurist-specific conditions, and separately amended § 2783 (specific occupations) to extend the commercial-fisher exception through 2030-12-31 (inoperative 2031-01-01).'
      );
    case 'delivery':
      return (
        gatePrefix +
        'Verify business-to-business contracting (§ 2776) or referral-agency relationships (§ 2777), each with strict conditions. App-based rideshare and delivery drivers may instead be governed by Business and Professions Code §§ 7448–7467 (Proposition 22).'
      );
    case 'tech':
    case 'other':
    default:
      return (
        gatePrefix +
        'Verify business-to-business contracting (§ 2776) or referral-agency relationships (§ 2777), each with strict conditions. Satisfying Prong B alone does not make a worker an independent contractor.'
      );
  }
}

// ─── Verified local notes only ───────────────────────────────────────────────

function localNoteFor(input: ScreeningInput): string | undefined {
  // City of Los Angeles Freelance Worker Protections Ordinance (administered by
  // the Office of Wage Standards) turns on where the work is physically performed
  // within City boundaries — NOT on contractor residence or business address.
  // Because this tool does not collect city-level place of performance, never
  // assert the ordinance applies; show a verification notice whenever work may
  // occur in California. SB 988 (§ 18106) is state law and remains separate.
  if (input.workLocation === 'outside-ca') {
    return undefined;
  }
  return 'Local Ordinance Verification (City of Los Angeles): This tool does not collect city-level place of performance and cannot determine whether a city ordinance applies. The Los Angeles Freelance Worker Protections Ordinance (administered by the Office of Wage Standards) applies based on whether work is physically performed within the geographic boundaries of the City of Los Angeles—not the contractor\'s residence or business address—along with its $600 threshold, contract dates, and scope rules. Verify actual work location and current ordinance requirements with the Office of Wage Standards.';
}

// ─── Main screening ──────────────────────────────────────────────────────────

export function computeResult(input: ScreeningInput): ScreeningResult {
  const jurisdiction = screenJurisdiction(input);
  const exceptionNote = statutoryExceptionNote(input.industry);
  const localNote = localNoteFor(input);

  if (!jurisdiction.californiaFrameworkMayApply) {
    return {
      screeningLabel: 'Outside Tool Scope — Jurisdiction Requires Verification',
      tone: 'unknown',
      jurisdictionStatus: jurisdiction.status,
      jurisdictionNote: jurisdiction.note,
      frameworkToVerify: 'Law of the state where the work is performed (not evaluated by this tool)',
      headline: 'This tool does not evaluate classification for work performed outside California.',
      explanation:
        'No Prong B indicator is shown because California classification rules may not govern this work. SB 988 is screened separately below because it turns on the hiring party and the engagement, not on where the contractor lives.',
      statutoryExceptionNote: exceptionNote,
      localNote,
      primaryCta: { label: 'Generate a General Freelance Contract', href: '/contracts/generator' },
      secondaryCta: { label: 'Independent Contractor Laws by State', href: '/compliance' },
    };
  }

  const frameworkToVerify =
    input.industry === 'licensed-professional'
      ? 'Potential statutory exception (§ 2783) — further verification required under Lab. Code § 2785(d); otherwise ABC Test generally applies (Lab. Code § 2775)'
      : input.industry === 'creative'
        ? 'Potential statutory exception (§ 2778) — further verification required under Lab. Code § 2785(d); otherwise ABC Test generally applies (Lab. Code § 2775)'
        : input.industry === 'construction'
          ? 'Potential statutory exception (§ 2781) — further verification required under Lab. Code § 2785(d); otherwise ABC Test generally applies (Lab. Code § 2775)'
          : input.industry === 'healthcare'
            ? 'Potential statutory exception (§ 2783(b)) — further verification required under Lab. Code § 2785(d); otherwise ABC Test generally applies (Lab. Code § 2775)'
            : 'Potential statutory exception (e.g., § 2776, § 2777) — further verification required under Lab. Code § 2785(d); otherwise ABC Test generally applies (Lab. Code § 2775)';

  if (input.coreBusiness === 'yes') {
    return {
      screeningLabel: 'Prong B Indicator: Elevated',
      tone: 'elevated',
      jurisdictionStatus: jurisdiction.status,
      jurisdictionNote: jurisdiction.note,
      frameworkToVerify,
      headline:
        'Work within the usual course of the hiring entity\'s business may make Prong B difficult to satisfy if the ABC Test applies.',
      explanation:
        'This is a single-factor indicator, not an overall classification result. If the ABC Test applies (Lab. Code § 2775(b)(1)), the hiring entity must establish all three conditions — A, B, and C — and work within its usual course of business may indicate a Prong B problem. Whether the ABC Test applies at all, and how Prongs A and C come out, depends on facts this tool does not collect. If a statutory exception applies, the Borello multifactor test may govern instead.',
      statutoryExceptionNote: exceptionNote,
      localNote,
      primaryCta: { label: 'Draft a Written Contract', href: '/contracts/generator' },
      secondaryCta: { label: 'Review Federal IRS Factors', href: '/tools/irs-20-point-checklist' },
    };
  }

  return {
    screeningLabel: 'Prong B Indicator: Lower',
    tone: 'lower',
    jurisdictionStatus: jurisdiction.status,
    jurisdictionNote: jurisdiction.note,
    frameworkToVerify,
    headline:
      'Work outside the usual course of the hiring entity\'s business may point in a favorable direction for Prong B — Prongs A and C still must be verified.',
    explanation:
      'This is a single-factor indicator, not an overall classification result. If the ABC Test applies, the hiring entity must still establish Prong A (freedom from control and direction, under the contract and in fact) and Prong C (the worker is customarily engaged in an independently established trade, occupation, or business of the same nature). A favorable Prong B indicator does not make the worker an independent contractor.',
    statutoryExceptionNote: exceptionNote,
    localNote,
    primaryCta: { label: 'Draft a Written Contract', href: '/contracts/generator' },
    secondaryCta: { label: 'Review an Existing Agreement', href: '/tools/freelancer-contract-review' },
  };
}

// ─── SB 988 (separate statute) ───────────────────────────────────────────────

export interface Sb988Screening {
  status: string;
  summary: string;
  checklist: string[];
  paymentRule: string;
  remedies: string;
}

export const SB988_CHECKLIST: string[] = [
  'The freelance worker is an individual or an organization composed of no more than one person (BPC § 18101(a)).',
  'The worker is hired or retained as a bona fide independent contractor (BPC § 18101(a)).',
  'The worker provides professional services as defined in Labor Code § 2778(b)(2) (BPC § 18101(c)).',
  'Compensation is at least $250 under a single contract, or when aggregated with all contracts with the same hiring party during the immediately preceding 120 days (BPC § 18101(a)).',
  'The hiring party meets the BPC § 18101(b) definition (a person or organization in California) and is not excluded (the United States government, the State of California or any subdivision, a foreign government, or a person retaining services for the personal benefit of the person, their family, or their homestead).',
];

export function getSb988Note(input: {
  hiringPartyLocation: HiringPartyLocation;
  industry: Industry;
}): Sb988Screening {
  const paymentRule =
    'Payment timing (BPC § 18102): pay on or before the date specified in the contract; only if the contract does not specify a date is payment due no later than 30 days after the services are completed.';
  const remedies =
    'Remedies (BPC § 18106, state law): an aggrieved freelance worker or a public prosecutor may bring a civil action. A prevailing plaintiff is entitled to reasonable attorney\'s fees and costs. § 18106(b)(1) provides an additional $1,000 only where the worker requested a written contract before starting work and the hiring party refused in violation of § 18103. § 18106(b)(2) provides damages of up to twice the amount that remained unpaid for qualifying late-payment violations — this is not an automatic doubling. Civil Code § 3289(b) contractual interest is a separate rule with its own conditions and is not an SB 988 penalty.';

  const base =
    'SB 988 (BPC §§ 18100–18107) is a payment-protection law. It is a separate legal question from ABC/Borello worker classification and does not decide employee vs. contractor status. The contractor\'s own location does not by itself determine whether SB 988 applies.';

  if (input.hiringPartyLocation === 'outside-ca') {
    return {
      status: SB988_HIRING_PARTY_UNCERTAIN,
      summary: `${base} BPC § 18101(b) defines a hiring party by reference to a person or organization in California. A hiring party located outside California may fall outside that definition, but presence or operations in California can complicate this — verify before relying on either conclusion.`,
      checklist: SB988_CHECKLIST,
      paymentRule,
      remedies,
    };
  }

  const servicesHint =
    input.industry === 'creative'
      ? ' Creative work may fall within § 2778(b)(2) professional services, but only the categories actually enumerated there count.'
      : ' Not every type of work is a § 2778(b)(2) professional service; verify the specific service.';

  return {
    status: SB988_POTENTIALLY_COVERED,
    summary: `${base} This tool does not collect enough information to confirm each statutory element.${servicesHint}`,
    checklist: SB988_CHECKLIST,
    paymentRule,
    remedies,
  };
}
