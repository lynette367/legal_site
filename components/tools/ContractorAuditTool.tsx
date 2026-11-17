'use client';

import { useState } from 'react';
import Link from 'next/link';

type Industry =
  | 'tech'
  | 'creative'
  | 'delivery'
  | 'construction'
  | 'healthcare'
  | 'licensed-professional'
  | 'other';

type CoreBusiness = 'yes' | 'no' | '';

type Location =
  | 'san-francisco'
  | 'los-angeles'
  | 'san-diego'
  | 'sacramento'
  | 'other-ca'
  | 'outside-ca'
  | '';

const INDUSTRY_OPTIONS: { value: Industry; label: string }[] = [
  { value: 'tech', label: 'Technology / Software' },
  { value: 'creative', label: 'Creative / Marketing / Design' },
  { value: 'delivery', label: 'Delivery / Transportation / Gig Work' },
  { value: 'construction', label: 'Construction / Skilled Trades' },
  { value: 'healthcare', label: 'Healthcare / Medical' },
  {
    value: 'licensed-professional',
    label: 'Licensed Professional (Real Estate, Insurance, Law, Accounting, Financial Services)',
  },
  { value: 'other', label: 'Other' },
];

const LOCATION_OPTIONS: { value: Location; label: string }[] = [
  { value: 'san-francisco', label: 'San Francisco, CA' },
  { value: 'los-angeles', label: 'Los Angeles, CA' },
  { value: 'san-diego', label: 'San Diego, CA' },
  { value: 'sacramento', label: 'Sacramento, CA' },
  { value: 'other-ca', label: 'Other California city' },
  { value: 'outside-ca', label: 'Outside California' },
];

interface Result {
  riskLevel: 'Low' | 'Moderate' | 'High';
  applicableTest: string;
  headline: string;
  explanation: string;
  sb988Note?: string;
  localNote?: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

function getSb988Note(industry: Industry): string {
  const isLikelyProfessionalService =
    industry === 'creative' || industry === 'licensed-professional';
  if (isLikelyProfessionalService) {
    return 'Separate from worker classification, if the individual is retained as a bona fide independent contractor meeting the definition of a "freelance worker" under SB 988 (Cal. Bus. & Prof. Code § 18101 — an individual or one-person entity providing § 2778(b)(2) professional services for $250+ in one contract or aggregated over the prior 120 days with a covered hiring party), a written contract and timely payment rules under §§ 18102–18103 apply.';
  }
  return 'Separate from worker classification, SB 988 (Cal. Bus. & Prof. Code §§ 18100–18107) is a payment-protection law—not a classification test—that applies only when a bona fide independent contractor meets the § 18101 definition of a "freelance worker" providing § 2778(b)(2) professional services for $250+ (single or 120-day aggregated with the same covered hiring party).';
}

function computeResult(industry: Industry, coreBusiness: CoreBusiness, location: Location): Result {
  if (location === 'outside-ca') {
    return {
      riskLevel: 'Low',
      applicableTest: 'Not applicable (Outside California)',
      headline: 'California Labor Code § 2775 and SB 988 focus on California work relationships.',
      explanation:
        'This preliminary educational screening tool reviews California worker-classification standards (Labor Code §§ 2775–2787) and separate SB 988 payment protections. For work performed outside California, check the applicable state and federal classification and payment rules.',
      primaryCta: { label: 'Generate a General Freelance Contract', href: '/contracts/generator' },
      secondaryCta: { label: 'Browse All Contract Templates', href: '/contracts' },
    };
  }

  const localNote =
    location === 'san-francisco' || location === 'los-angeles' || location === 'san-diego'
      ? `${
          location === 'san-francisco' ? 'San Francisco' : location === 'los-angeles' ? 'Los Angeles' : 'San Diego'
        } also maintains local labor standards enforcement; under Cal. Bus. & Prof. Code § 18106, an aggrieved freelance worker or a public prosecutor may bring a civil action to enforce SB 988.`
      : undefined;

  const sb988Note = getSb988Note(industry);

  if (industry === 'licensed-professional') {
    return {
      riskLevel: 'Moderate',
      applicableTest: 'Potential Borello Multifactor Test via Labor Code § 2783 (if statutory criteria are met); otherwise ABC Test (§ 2775)',
      headline:
        coreBusiness === 'yes'
          ? 'Core-business role: check whether Labor Code § 2783 statutory exemption criteria are strictly satisfied.'
          : 'Non-core role: check whether Labor Code § 2783 or the ABC Test governs.',
      explanation:
        coreBusiness === 'yes'
          ? 'Certain licensed professions enumerated in Cal. Lab. Code § 2783 (such as qualifying licensed insurance agents, real estate licensees, attorneys, accountants, architects, engineers, or securities broker-dealers) may be evaluated under the multifactor Borello test if all statutory criteria are met. However, if the role or arrangement does not satisfy § 2783, the ABC Test (§ 2775) applies—and performing core-business work creates elevated risk under Prong B.'
          : 'Certain licensed professions enumerated in Cal. Lab. Code § 2783 may be evaluated under the multifactor Borello test when statutory criteria are met. If § 2783 does not apply, the ABC Test (§ 2775) governs, requiring the hiring entity to establish all three prongs (A, B, and C).',
      sb988Note,
      localNote,
      primaryCta: { label: 'Draft a Written Contract', href: '/contracts/generator' },
      secondaryCta: { label: 'Review Federal IRS Factors', href: '/tools/irs-20-point-checklist' },
    };
  }

  if (industry === 'creative') {
    return {
      riskLevel: coreBusiness === 'yes' ? 'High' : 'Moderate',
      applicableTest: 'ABC Test (§ 2775), unless all Cal. Lab. Code § 2778 professional-services conditions are met',
      headline:
        coreBusiness === 'yes'
          ? 'Elevated Prong B risk unless the engagement satisfies every Labor Code § 2778 condition.'
          : 'Creative/marketing role: review ABC Test Prongs A & C and whether § 2778 applies.',
      explanation:
        coreBusiness === 'yes'
          ? 'Performing work within the hiring entity\'s usual course of business raises significant risk under Prong B of the ABC Test (§ 2775). Creative, marketing, design, photography, and writing roles do NOT automatically qualify for the Borello test: § 2778 applies only if the service is enumerated in § 2778(b)(2), satisfies all 6 general conditions in § 2778(a), and meets any occupation-specific requirements (such as § 2778(b)(2)(I) or (J)). If § 2778 is not fully satisfied, failing Prong B results in employee status under § 2775.'
          : 'Work outside the usual course of business aligns with Prong B, but the hiring entity must still satisfy Prong A (freedom from control) and Prong C (independently established business) under § 2775—unless the engagement falls within an enumerated § 2778(b)(2) category and meets all 6 § 2778(a) conditions plus any occupation-specific rules, in which case the Borello multifactor test applies.',
      sb988Note,
      localNote,
      primaryCta: { label: 'Draft an SB 988 Written Contract', href: '/contracts/generator' },
      secondaryCta: { label: 'Review Federal IRS Factors', href: '/tools/irs-20-point-checklist' },
    };
  }

  if (industry === 'construction' || industry === 'healthcare') {
    const statuteRef =
      industry === 'construction'
        ? 'construction subcontractor rules under Cal. Lab. Code § 2781'
        : 'enumerated licensed medical professions under Cal. Lab. Code § 2783 (e.g., physicians, surgeons, dentists, podiatrists, psychologists, veterinarians)';
    return {
      riskLevel: coreBusiness === 'yes' ? 'High' : 'Moderate',
      applicableTest: `ABC Test (§ 2775), unless a statutory exception applies (${industry === 'construction' ? '§ 2781' : '§ 2783'})`,
      headline:
        coreBusiness === 'yes'
          ? 'Elevated Prong B risk unless a specific statutory exception is satisfied.'
          : 'Non-core role: verify Prongs A & C or whether a statutory exception applies.',
      explanation:
        coreBusiness === 'yes'
          ? `Performing core-business work creates significant risk under Prong B of the ABC Test (§ 2775). Check with California employment counsel whether ${statuteRef} or a B2B exception (§ 2776) applies; if no statutory exception is fully satisfied, all three ABC prongs must be met.`
          : `Work outside the usual course of business aligns with Prong B, but Prong A (control) and Prong C (independent business) must still be established under § 2775 unless ${statuteRef} directs the analysis to the Borello multifactor test.`,
      sb988Note,
      localNote,
      primaryCta: { label: 'Draft a Written Contract', href: '/contracts/generator' },
      secondaryCta: { label: 'Review Federal IRS Factors', href: '/tools/irs-20-point-checklist' },
    };
  }

  if (coreBusiness === 'yes') {
    return {
      riskLevel: 'High',
      applicableTest: 'ABC Test (Cal. Lab. Code § 2775) — unless a statutory exception (e.g., § 2776 B2B) applies',
      headline: 'Elevated classification risk under Prong B of the ABC Test.',
      explanation:
        'When the ABC Test applies and no statutory exception (such as a qualifying B2B arrangement under § 2776 or referral agency under § 2777) is satisfied, performing work within the hiring entity\'s usual course of business raises significant risk under Prong B ("the person performs work that is outside the usual course of the hiring entity\'s business"). Under Labor Code § 2775, all three prongs (A, B, and C) must be established. Under Labor Code § 226.8 (effective Jan. 1, 2026), if the LWDA or a court determines that an employer engaged in willful misclassification, civil penalties are $5,000–$15,000 per violation (§ 226.8(b)), or $10,000–$25,000 per violation for a pattern or practice (§ 226.8(c)). Consult a California employment attorney before treating the role as an independent contractor.',
      sb988Note,
      localNote,
      primaryCta: { label: 'Draft a Written Contract', href: '/contracts/generator' },
      secondaryCta: { label: 'Review Federal IRS Factors', href: '/tools/irs-20-point-checklist' },
    };
  }

  return {
    riskLevel: 'Moderate',
    applicableTest: 'ABC Test (Cal. Lab. Code § 2775) or applicable statutory exception',
    headline: 'Work outside the usual course of business aligns with Prong B, but Prongs A and C must also be met.',
    explanation:
      'Under the ABC Test, performing work outside the hiring entity\'s usual course of business addresses Prong B, but the hiring entity must still establish Prong A (freedom from control and direction both under the contract and in fact) and Prong C (the worker is customarily engaged in an independently established trade, occupation, or business of the same nature), unless a statutory exception directs the analysis to the Borello multifactor test.',
    sb988Note,
    localNote,
    primaryCta: { label: 'Draft a Written Contract', href: '/contracts/generator' },
    secondaryCta: { label: 'Review an Existing Agreement', href: '/tools/freelancer-contract-review' },
  };
}

const RISK_STYLES: Record<Result['riskLevel'], string> = {
  Low: 'bg-green-50 text-green-700 border-green-200',
  Moderate: 'bg-amber-50 text-amber-700 border-amber-200',
  High: 'bg-red-50 text-red-700 border-red-200',
};

export default function ContractorAuditTool() {
  const [industry, setIndustry] = useState<Industry | ''>('');
  const [coreBusiness, setCoreBusiness] = useState<CoreBusiness>('');
  const [location, setLocation] = useState<Location>('');
  const [showResult, setShowResult] = useState(false);

  const canSubmit = industry !== '' && coreBusiness !== '' && location !== '';
  const result = canSubmit ? computeResult(industry as Industry, coreBusiness, location) : null;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-soft p-6 md:p-8 max-w-2xl mx-auto">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-text-primary mb-2">Worker&apos;s Industry</label>
          <select
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-lavender"
            value={industry}
            onChange={(e) => {
              setIndustry(e.target.value as Industry);
              setShowResult(false);
            }}
          >
            <option value="" disabled>
              Select an industry…
            </option>
            {INDUSTRY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <span className="block text-sm font-bold text-text-primary mb-2">
            Does this worker perform tasks core to your primary business?
          </span>
          <div className="flex gap-3">
            {(['yes', 'no'] as const).map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => {
                  setCoreBusiness(val);
                  setShowResult(false);
                }}
                className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-bold transition-colors ${
                  coreBusiness === val
                    ? 'border-primary-lavender bg-primary-lavender text-white'
                    : 'border-gray-200 bg-white text-text-primary hover:border-primary-lavender'
                }`}
              >
                {val === 'yes' ? 'Yes' : 'No'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-text-primary mb-2">Contractor&apos;s Location</label>
          <select
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-lavender"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value as Location);
              setShowResult(false);
            }}
          >
            <option value="" disabled>
              Select a location…
            </option>
            {LOCATION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          disabled={!canSubmit}
          onClick={() => setShowResult(true)}
          className="w-full rounded-xl bg-primary-lavender text-white font-bold px-6 py-3 shadow-soft transition-colors hover:bg-primary-lavender-dark disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Review Classification Factors →
        </button>

        <p className="text-xs text-text-primary/50 leading-relaxed">
          <strong>Preliminary Educational Screening:</strong> This checker provides general educational
          information only. It does not determine legal worker classification status, evaluate every
          statutory exception under California Labor Code §§ 2776–2784, or constitute a legal opinion.
        </p>
      </div>

      {showResult && result && (
        <div className="mt-8 border-t border-gray-100 pt-6 animate-in">
          <span className={`inline-block rounded-full border px-3 py-1 text-xs font-bold mb-3 ${RISK_STYLES[result.riskLevel]}`}>
            {result.riskLevel} Risk (Preliminary Screening)
          </span>
          <h3 className="text-lg font-black text-text-primary mb-2 leading-snug">{result.headline}</h3>
          <p className="text-xs font-semibold text-text-primary/50 uppercase tracking-wide mb-3">
            Applicable standard: {result.applicableTest}
          </p>
          <p className="text-sm leading-relaxed text-text-primary/70">{result.explanation}</p>
          {result.sb988Note && (
            <div className="mt-3 rounded-xl bg-slate-50 border border-slate-200 p-3.5 text-xs leading-relaxed text-text-primary/75">
              <strong className="text-text-primary">SB 988 Payment Protections (Separate Statute):</strong>{' '}
              {result.sb988Note}
            </div>
          )}
          {result.localNote && (
            <p className="text-sm leading-relaxed text-text-lavender mt-3 italic">{result.localNote}</p>
          )}

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href={result.primaryCta.href}
              className="flex-1 text-center rounded-xl bg-primary-lavender text-white font-bold px-5 py-3 shadow-soft transition-colors hover:bg-primary-lavender-dark text-sm"
            >
              {result.primaryCta.label}
            </Link>
            <Link
              href={result.secondaryCta.href}
              className="flex-1 text-center rounded-xl border border-primary-lavender/30 text-primary-lavender font-bold px-5 py-3 transition-colors hover:bg-primary-lavender/5 text-sm"
            >
              {result.secondaryCta.label}
            </Link>
          </div>

          <p className="mt-4 text-xs text-text-primary/50 leading-relaxed">
            <strong>Disclaimer:</strong> This preliminary screening output is for educational purposes
            only, does not determine legal status or trigger statutory penalties, and is not a
            substitute for advice from a licensed California employment attorney.
          </p>
        </div>
      )}
    </div>
  );
}
