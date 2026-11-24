'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  computeResult,
  getSb988Note,
  type ContractorLocation,
  type CoreBusiness,
  type HiringPartyLocation,
  type Industry,
  type ScreeningTone,
  type WorkLocation,
} from '../../lib/contractorScreening';

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

const CONTRACTOR_LOCATION_OPTIONS: { value: ContractorLocation; label: string }[] = [
  { value: 'san-francisco', label: 'San Francisco, CA' },
  { value: 'los-angeles', label: 'Los Angeles, CA' },
  { value: 'san-diego', label: 'San Diego, CA' },
  { value: 'sacramento', label: 'Sacramento, CA' },
  { value: 'other-ca', label: 'Other California city' },
  { value: 'outside-ca', label: 'Outside California' },
];

const WORK_LOCATION_OPTIONS: { value: WorkLocation; label: string }[] = [
  { value: 'in-ca', label: 'In California' },
  { value: 'outside-ca', label: 'Entirely outside California' },
  { value: 'mixed', label: 'Partly in and partly outside California' },
  { value: 'unknown', label: 'Not sure' },
];

const HIRING_PARTY_OPTIONS: { value: HiringPartyLocation; label: string }[] = [
  { value: 'in-ca', label: 'In California' },
  { value: 'outside-ca', label: 'Outside California' },
  { value: 'unknown', label: 'Not sure' },
];

const TONE_STYLES: Record<ScreeningTone, string> = {
  elevated: 'bg-amber-50 text-amber-800 border-amber-200',
  lower: 'bg-sky-50 text-sky-800 border-sky-200',
  unknown: 'bg-gray-50 text-gray-700 border-gray-200',
};

const SELECT_CLASS =
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-lavender';

export default function ContractorAuditTool() {
  const [industry, setIndustry] = useState<Industry | ''>('');
  const [coreBusiness, setCoreBusiness] = useState<CoreBusiness | ''>('');
  const [contractorLocation, setContractorLocation] = useState<ContractorLocation | ''>('');
  const [workLocation, setWorkLocation] = useState<WorkLocation | ''>('');
  const [hiringPartyLocation, setHiringPartyLocation] = useState<HiringPartyLocation | ''>('');
  const [showResult, setShowResult] = useState(false);

  const canSubmit =
    industry !== '' &&
    coreBusiness !== '' &&
    contractorLocation !== '' &&
    workLocation !== '' &&
    hiringPartyLocation !== '';

  const result = canSubmit
    ? computeResult({
        industry: industry as Industry,
        coreBusiness: coreBusiness as CoreBusiness,
        contractorLocation: contractorLocation as ContractorLocation,
        workLocation: workLocation as WorkLocation,
        hiringPartyLocation: hiringPartyLocation as HiringPartyLocation,
      })
    : null;

  const sb988 = canSubmit
    ? getSb988Note({
        industry: industry as Industry,
        hiringPartyLocation: hiringPartyLocation as HiringPartyLocation,
      })
    : null;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-soft p-6 md:p-8 max-w-2xl mx-auto">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-text-primary mb-2">Worker&apos;s Industry</label>
          <select
            className={SELECT_CLASS}
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
            Is this work within the usual course of the hiring entity&apos;s business? (Prong B)
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
          <label className="block text-sm font-bold text-text-primary mb-2">
            Contractor&apos;s Residence / Business Location
          </label>
          <select
            className={SELECT_CLASS}
            value={contractorLocation}
            onChange={(e) => {
              setContractorLocation(e.target.value as ContractorLocation);
              setShowResult(false);
            }}
          >
            <option value="" disabled>
              Select a location…
            </option>
            {CONTRACTOR_LOCATION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-text-primary mb-2">
            Where Is the Work Actually Performed?
          </label>
          <select
            className={SELECT_CLASS}
            value={workLocation}
            onChange={(e) => {
              setWorkLocation(e.target.value as WorkLocation);
              setShowResult(false);
            }}
          >
            <option value="" disabled>
              Select place of performance…
            </option>
            {WORK_LOCATION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-text-primary mb-2">
            Where Is the Hiring Party Located?
          </label>
          <select
            className={SELECT_CLASS}
            value={hiringPartyLocation}
            onChange={(e) => {
              setHiringPartyLocation(e.target.value as HiringPartyLocation);
              setShowResult(false);
            }}
          >
            <option value="" disabled>
              Select hiring party location…
            </option>
            {HIRING_PARTY_OPTIONS.map((opt) => (
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
          information only. It does not determine legal worker classification status, decide whether the
          ABC Test or the Borello test ultimately applies, evaluate every statutory exception under
          California Labor Code §§ 2776–2787, or constitute a legal opinion.
        </p>
      </div>

      {showResult && result && sb988 && (
        <div className="mt-8 border-t border-gray-100 pt-6 animate-in">
          <span
            className={`inline-block rounded-full border px-3 py-1 text-xs font-bold mb-3 ${TONE_STYLES[result.tone]}`}
          >
            {result.screeningLabel} (Preliminary Screening)
          </span>
          <h3 className="text-lg font-black text-text-primary mb-2 leading-snug">{result.headline}</h3>
          <p className="text-xs font-semibold text-text-primary/50 uppercase tracking-wide mb-1">
            Jurisdiction: {result.jurisdictionStatus}
          </p>
          <p className="text-xs font-semibold text-text-primary/50 uppercase tracking-wide mb-3">
            Framework to verify: {result.frameworkToVerify}
          </p>
          <p className="text-sm leading-relaxed text-text-primary/70">{result.explanation}</p>
          <p className="text-sm leading-relaxed text-text-primary/70 mt-3">{result.jurisdictionNote}</p>

          <div className="mt-3 rounded-xl bg-white border border-gray-200 p-3.5 text-xs leading-relaxed text-text-primary/75">
            <strong className="text-text-primary">Statutory exception to verify (not applied automatically):</strong>{' '}
            {result.statutoryExceptionNote}
          </div>

          <div className="mt-3 rounded-xl bg-slate-50 border border-slate-200 p-3.5 text-xs leading-relaxed text-text-primary/75 space-y-2">
            <p>
              <strong className="text-text-primary">SB 988 Payment Protections (Separate Statute):</strong>{' '}
              <span className="font-semibold">{sb988.status}.</span> {sb988.summary}
            </p>
            <ul className="list-disc list-inside space-y-1">
              {sb988.checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>{sb988.paymentRule}</p>
            <p>{sb988.remedies}</p>
          </div>

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
            only. It is not a legal classification conclusion, does not determine legal status or
            trigger statutory penalties, and is not a substitute for advice from a licensed California
            employment attorney.
          </p>
        </div>
      )}
    </div>
  );
}
