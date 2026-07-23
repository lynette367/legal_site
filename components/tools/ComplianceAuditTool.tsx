'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { StateConfig, IndustryConfig } from '@/data/stateComplianceData';

interface Props {
  state: StateConfig;
  industry?: IndustryConfig;
}

interface Answers {
  hasScheduleControl: '' | 'yes' | 'no';
  providesSupplies: '' | 'yes' | 'no';
  isCoreBusiness: '' | 'yes' | 'no';
}

const DEFAULT_WEIGHTS = { hasScheduleControl: 0.6, providesSupplies: 0.5, isCoreBusiness: 0.7 };

/**
 * ABC-style scoring: the real-world test presumes employee status unless
 * ALL prongs are satisfied, so a single "yes" on a control/core-business
 * signal should push risk to High almost immediately — this is a near-binary
 * presumption, not a gradual balancing test.
 */
function computeAbcRisk(answers: Answers, industry?: IndustryConfig): 'Low' | 'Moderate' | 'High' {
  const weights = industry?.quizWeights ?? DEFAULT_WEIGHTS;
  const failsCoreBusinessProng = answers.isCoreBusiness === 'yes';
  const failsControlProng = answers.hasScheduleControl === 'yes';
  if (failsCoreBusinessProng || failsControlProng) return 'High';
  if (answers.providesSupplies === 'yes' && weights.providesSupplies >= 0.6) return 'Moderate';
  return 'Low';
}

/**
 * Economic realities / common-law scoring: multi-factor balancing test,
 * no single answer is decisive — mirrors the federal FLSA / IRS common-law
 * approach used as the default for states without a codified ABC test.
 */
function computeEconomicRealitiesRisk(answers: Answers, industry?: IndustryConfig): 'Low' | 'Moderate' | 'High' {
  const weights = industry?.quizWeights ?? DEFAULT_WEIGHTS;
  let score = 0;
  if (answers.hasScheduleControl === 'yes') score += weights.hasScheduleControl;
  if (answers.providesSupplies === 'yes') score += weights.providesSupplies;
  if (answers.isCoreBusiness === 'yes') score += weights.isCoreBusiness;
  if (score >= 1.4) return 'High';
  if (score >= 0.7) return 'Moderate';
  return 'Low';
}

function computeRisk(
  answers: Answers,
  testType: StateConfig['testType'],
  industry?: IndustryConfig
): 'Low' | 'Moderate' | 'High' {
  return testType === 'ABC'
    ? computeAbcRisk(answers, industry)
    : computeEconomicRealitiesRisk(answers, industry);
}

const RISK_STYLES: Record<'Low' | 'Moderate' | 'High', string> = {
  Low: 'bg-green-50 text-green-700 border-green-200',
  Moderate: 'bg-amber-50 text-amber-700 border-amber-200',
  High: 'bg-red-50 text-red-700 border-red-200',
};

export default function ComplianceAuditTool({ state, industry }: Props) {
  const [answers, setAnswers] = useState<Answers>({
    hasScheduleControl: '',
    providesSupplies: '',
    isCoreBusiness: '',
  });
  const [showResult, setShowResult] = useState(false);

  const canSubmit = answers.hasScheduleControl !== '' && answers.providesSupplies !== '' && answers.isCoreBusiness !== '';
  const risk = canSubmit ? computeRisk(answers, state.testType, industry) : null;

  const suppliesPrompt = industry?.slug === 'caregiver'
    ? '(e.g., medical supplies, gloves, wheelchairs)'
    : industry?.slug === 'tech-consulting'
      ? '(e.g., a company-issued laptop or software licenses)'
      : '(tools, materials, or equipment for the job)';

  const setAnswer = (key: keyof Answers, val: 'yes' | 'no') => {
    setAnswers((prev) => ({ ...prev, [key]: val }));
    setShowResult(false);
  };

  const YesNoRow = ({ label, sub, field }: { label: string; sub?: string; field: keyof Answers }) => (
    <div>
      <span className="block text-sm font-bold text-text-primary mb-1">{label}</span>
      {sub && <span className="block text-xs text-text-primary/50 mb-2">{sub}</span>}
      <div className="flex gap-3">
        {(['yes', 'no'] as const).map((val) => (
          <button
            key={val}
            type="button"
            onClick={() => setAnswer(field, val)}
            className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-bold transition-colors ${
              answers[field] === val
                ? 'border-primary-lavender bg-primary-lavender text-white'
                : 'border-gray-200 bg-white text-text-primary hover:border-primary-lavender'
            }`}
          >
            {val === 'yes' ? 'Yes' : 'No'}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-soft p-6 md:p-8 max-w-2xl mx-auto">
      <div className="space-y-6">
        <YesNoRow
          label="Do you set this worker's specific schedule or working hours?"
          field="hasScheduleControl"
        />
        <YesNoRow
          label="Do you provide the equipment or supplies they use for the job?"
          sub={suppliesPrompt}
          field="providesSupplies"
        />
        <YesNoRow
          label="Is this work part of your company's core, everyday business?"
          field="isCoreBusiness"
        />

        <button
          type="button"
          disabled={!canSubmit}
          onClick={() => setShowResult(true)}
          className="w-full rounded-xl bg-primary-lavender text-white font-bold px-6 py-3 shadow-soft transition-colors hover:bg-primary-lavender-dark disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Check My {state.stateName} Risk Level →
        </button>
      </div>

      {showResult && risk && (
        <div className="mt-8 border-t border-gray-100 pt-6 animate-in">
          <span className={`inline-block rounded-full border px-3 py-1 text-xs font-bold mb-3 ${RISK_STYLES[risk]}`}>
            {risk} Risk
          </span>
          <h3 className="text-lg font-black text-text-primary mb-2 leading-snug">
            {risk === 'High'
              ? `This working relationship shows strong signs of employer control in ${state.stateName}.`
              : risk === 'Moderate'
                ? `Some factors point toward employer control — worth a closer look.`
                : `Fewer control signals present, but classification tests weigh the whole relationship.`}
          </h3>
          <p className="text-xs font-semibold text-text-primary/50 uppercase tracking-wide mb-3">
            {state.stateName} · {state.agencyName}
          </p>
          <p className="text-sm leading-relaxed text-text-primary/70">{state.classificationTestNote}</p>
          {industry && (
            <p className="text-sm leading-relaxed text-text-lavender mt-3 italic">{industry.industryAlert}</p>
          )}

          {/* Safe-harbor methodology disclaimer — required whenever the testType
              claim doesn't cover every legal context for this state. */}
          <div className="mt-5 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 mb-1">
              ⚖️ Legal Disclaimer &amp; Methodology
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">{state.methodologyDisclaimer}</p>
          </div>

          {state.status === 'coming-soon' && (
            <div className="mt-5 bg-primary-lavender/5 border border-primary-lavender/20 rounded-xl px-5 py-4">
              <p className="text-sm font-bold text-text-primary mb-1">
                {state.stateName}-specific results are coming soon.
              </p>
              <p className="text-xs text-text-primary/60 mb-3">
                The score above uses the general federal standard while we finish verifying {state.stateName}&apos;s
                specific rules. Leave your email and we&apos;ll notify you the moment the {state.stateName}-specific
                version — plus a free audit report — is live.
              </p>
              <form className="flex flex-col sm:flex-row gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-lavender"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-primary-lavender text-white font-bold text-sm px-4 py-2 hover:bg-primary-lavender-dark transition-colors"
                >
                  Notify Me
                </button>
              </form>
            </div>
          )}

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contracts/generator"
              className="flex-1 text-center rounded-xl bg-primary-lavender text-white font-bold px-5 py-3 shadow-soft transition-colors hover:bg-primary-lavender-dark text-sm"
            >
              Generate a Compliant Contract
            </Link>
            <Link
              href="/tools/irs-20-point-checklist"
              className="flex-1 text-center rounded-xl border border-primary-lavender/30 text-primary-lavender font-bold px-5 py-3 transition-colors hover:bg-primary-lavender/5 text-sm"
            >
              Run the Federal IRS Check
            </Link>
          </div>

          <p className="mt-4 text-xs text-text-primary/40">
            This tool provides general, directional information only. It is not the state&apos;s official test and is not
            a substitute for advice from a licensed employment attorney in {state.stateName}.
          </p>
        </div>
      )}
    </div>
  );
}
