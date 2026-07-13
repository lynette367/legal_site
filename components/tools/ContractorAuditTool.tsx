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
      headline: 'AB5 and SB 988 apply only to California work relationships.',
      explanation:
        "This audit checks California's ABC Test (AB5) and the Freelance Worker Protection Act (SB 988). Since this contractor is based outside California, these specific rules likely don't apply — but check your own state's worker classification and prompt-payment laws, since more states are adopting similar freelancer protections.",
      primaryCta: { label: 'Generate a General Freelance Contract', href: '/tools/sb988-contract-generator' },
      secondaryCta: { label: 'Browse All Contract Templates', href: '/freelance-contract' },
    };
  }

  const localNote =
    location === 'san-francisco' || location === 'los-angeles' || location === 'san-diego'
      ? `${
          location === 'san-francisco' ? 'San Francisco' : location === 'los-angeles' ? 'Los Angeles' : 'San Diego'
        } layers its own local wage enforcement office on top of state SB 988 penalties, so late-payment complaints in this city tend to move faster and get scrutinized more closely.`
      : undefined;

  if (industry === 'licensed-professional') {
    return {
      riskLevel: 'Moderate',
      applicableTest: 'Borello Test (statutory exemption)',
      headline: 'This role likely falls under a Borello exemption, not the strict ABC Test.',
      explanation:
        'Licensed professionals such as real estate agents, insurance brokers, attorneys, accountants, and certain financial services roles are carved out of the ABC Test and instead evaluated under the older, multi-factor Borello standard. That gives you more flexibility on classification — but it does NOT exempt you from SB 988. Any written agreement worth $250 or more still requires a compliant contract with clear payment terms.',
      localNote,
      primaryCta: { label: 'Generate an SB 988 Compliant Contract', href: '/tools/sb988-contract-generator' },
      secondaryCta: { label: 'Run the IRS 20-Point Check Too', href: '/tools/irs-20-point-checklist-for-independent-contractors' },
    };
  }

  if (coreBusiness === 'yes') {
    return {
      riskLevel: 'High',
      applicableTest: 'ABC Test (AB5)',
      headline: 'High misclassification risk — this worker likely fails Prong B.',
      explanation:
        'Because this worker performs tasks core to your usual course of business, you\'ll struggle to satisfy Prong B of the ABC Test ("the worker performs work outside the usual course of the hiring entity\'s business"). Under AB5, failing even one prong means the worker is presumed an employee, not a contractor. Misclassification penalties range from $5,000 to $25,000 per willful violation, plus back pay and EDD liability. If you intend to continue this as a contractor relationship, get a compliant written agreement in place immediately and talk to an employment attorney about the classification itself.',
      localNote,
      primaryCta: { label: 'Generate an SB 988 Contract Now', href: '/tools/sb988-contract-generator' },
      secondaryCta: { label: 'Run the Full IRS Classification Check', href: '/tools/irs-20-point-checklist-for-independent-contractors' },
    };
  }

  if (coreBusiness === 'no') {
    return {
      riskLevel: 'Moderate',
      applicableTest: 'ABC Test (AB5)',
      headline: 'Likely passes Prong B — but Prongs A and C still need to hold up.',
      explanation:
        'Work outside your usual course of business clears Prong B, which is where most misclassification cases fail. You still need to confirm Prong A (the worker is free from your behavioral control) and Prong C (the worker runs an independently established business — a business license, other clients, their own tools). Regardless of the outcome, SB 988 requires a written contract for any freelance engagement worth $250 or more, with clear rate, scope, and payment-date terms.',
      localNote,
      primaryCta: { label: 'Generate an SB 988 Compliant Contract', href: '/tools/sb988-contract-generator' },
      secondaryCta: { label: 'Review an Existing Agreement', href: '/tools/freelancer-contract-review' },
    };
  }

  return {
    riskLevel: 'Low',
    applicableTest: 'ABC Test (AB5)',
    headline: 'Answer both questions above to see your compliance risk.',
    explanation: '',
    primaryCta: { label: 'Generate a Contract', href: '/tools/sb988-contract-generator' },
    secondaryCta: { label: 'See Late Payment Penalties', href: '/tools/sb988-late-payment-calculator' },
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
          Free Compliance Audit →
        </button>
      </div>

      {showResult && result && (
        <div className="mt-8 border-t border-gray-100 pt-6 animate-in">
          <span className={`inline-block rounded-full border px-3 py-1 text-xs font-bold mb-3 ${RISK_STYLES[result.riskLevel]}`}>
            {result.riskLevel} Risk
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

          <p className="mt-4 text-xs text-text-primary/40">
            This tool provides general information only and is not a substitute for advice from a licensed
            California employment attorney.
          </p>
        </div>
      )}
    </div>
  );
}
