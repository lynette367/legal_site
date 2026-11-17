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
  localNote?: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

function computeResult(industry: Industry, coreBusiness: CoreBusiness, location: Location): Result {
  if (location === 'outside-ca') {
    return {
      riskLevel: 'Low',
      applicableTest: 'Not applicable (California-specific)',
      headline: 'California Labor Code § 2775 and SB 988 focus on California work relationships.',
      explanation:
        "This preliminary educational screening tool reviews California's ABC Test / Borello framework (Labor Code §§ 2775–2778) and separate written-contract requirements under the Freelance Worker Protection Act (SB 988). For engagements performed outside California, check the applicable state and federal classification and payment rules.",
      primaryCta: { label: 'Generate a General Freelance Contract', href: '/contracts/generator' },
      secondaryCta: { label: 'Browse All Contract Templates', href: '/contracts' },
    };
  }

  const localNote =
    location === 'san-francisco' || location === 'los-angeles' || location === 'san-diego'
      ? `${
          location === 'san-francisco' ? 'San Francisco' : location === 'los-angeles' ? 'Los Angeles' : 'San Diego'
        } also maintains local labor standards enforcement, and under state law (Cal. Bus. & Prof. Code § 18106), a public prosecutor or an aggrieved freelance worker may bring a civil action to enforce SB 988 payment protections.`
      : undefined;

  if (industry === 'licensed-professional') {
    return {
      riskLevel: 'Moderate',
      applicableTest: 'Potential Borello Multifactor Test (if statutory exemption criteria are met)',
      headline: 'Certain licensed professionals may be evaluated under Borello if statutory conditions are met.',
      explanation:
        'Certain licensed occupations enumerated in California Labor Code § 2783 (such as qualifying licensed insurance agents, physicians, attorneys, accountants, real estate licensees, or securities broker-dealers) may be governed by the multifactor Borello test rather than the ABC Test when statutory criteria are satisfied. Separately, if the individual is retained as a bona fide independent contractor meeting the definition of a "freelance worker" under Cal. Bus. & Prof. Code § 18101 (an individual or one-person organization providing professional services for at least $250 in a single contract or aggregated over 120 days), SB 988 requires a written contract with specified payment terms.',
      localNote,
      primaryCta: { label: 'Generate an SB 988 Written Contract', href: '/contracts/generator' },
      secondaryCta: { label: 'Review Federal IRS Factors', href: '/tools/irs-20-point-checklist' },
    };
  }

  if (coreBusiness === 'yes') {
    return {
      riskLevel: 'High',
      applicableTest: 'ABC Test (Cal. Lab. Code § 2775) — unless a statutory exception applies',
      headline: 'Elevated classification risk under Prong B of the ABC Test.',
      explanation:
        'When the ABC Test applies and no statutory exception (such as a qualifying B2B arrangement under § 2776 or professional services exception under § 2778) is satisfied, performing work within the hiring entity\'s usual course of business raises significant risk under Prong B ("the person performs work that is outside the usual course of the hiring entity\'s business"). Under Labor Code § 2775, all three prongs (A, B, and C) must be established unless an exception directs the analysis to the multifactor Borello test. Under Labor Code § 226.8 (effective Jan. 1, 2026), if the LWDA or a court determines that an employer engaged in willful misclassification, civil penalties are $5,000–$15,000 per violation, or $10,000–$25,000 per violation for a pattern or practice. Consult a California employment attorney to evaluate whether a statutory exception applies before treating the role as an independent contractor.',
      localNote,
      primaryCta: { label: 'Draft an SB 988 Written Contract', href: '/contracts/generator' },
      secondaryCta: { label: 'Review Federal IRS Factors', href: '/tools/irs-20-point-checklist' },
    };
  }

  if (coreBusiness === 'no') {
    return {
      riskLevel: 'Moderate',
      applicableTest: 'ABC Test (Cal. Lab. Code § 2775) or applicable statutory exception',
      headline: 'Work outside the usual course of business aligns with Prong B, but Prongs A and C must also be met.',
      explanation:
        'Under the ABC Test, performing work outside the hiring entity\'s usual course of business addresses Prong B, but the hiring entity must still establish Prong A (freedom from control and direction both under the contract and in fact) and Prong C (the worker is customarily engaged in an independently established trade, occupation, or business of the same nature). Separately, for a bona fide independent contractor who qualifies as a "freelance worker" under SB 988 (Cal. Bus. & Prof. Code § 18101 — an individual or single-person entity providing professional services for $250 or more in a single contract or aggregated over the prior 120 days with a covered hiring party), a written contract specifying itemized services, rates, and payment dates is required.',
      localNote,
      primaryCta: { label: 'Generate an SB 988 Written Contract', href: '/contracts/generator' },
      secondaryCta: { label: 'Review an Existing Agreement', href: '/tools/freelancer-contract-review' },
    };
  }

  return {
    riskLevel: 'Low',
    applicableTest: 'ABC Test (Cal. Lab. Code § 2775)',
    headline: 'Answer the questions above to review preliminary classification factors.',
    explanation: '',
    primaryCta: { label: 'Generate a Contract', href: '/contracts/generator' },
    secondaryCta: { label: 'See Late Payment Penalties', href: '/tools/late-payment-calculator' },
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
