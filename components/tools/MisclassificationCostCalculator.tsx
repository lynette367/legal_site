'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface CalculatorInputs {
  annualAmount: string;
  includeBenefits: boolean;
  benefitsPct: string;
}

interface CostBreakdown {
  cost1099: number;
  fica: number;
  sui: number;
  ett: number;
  futa: number;
  benefits: number;
  w2TaxOnlyCost: number;
  w2FullCost: number;
  apparentSavings: number;
  backTaxExposure: number;
  penaltyLow: number;
  penaltyHigh: number;
  exposureLow: number;
  exposureHigh: number;
}

// ─── 2026 California employer-side payroll tax constants ──────────────────
// Sources verified July 2026: EDD Schedule F+ (new-employer SUI), CA ETT,
// federal FUTA net rate. SUI/ETT/FUTA all apply only to the first $7,000
// of wages per employee, per year — that wage base is capped regardless
// of how high the input amount goes.
const CA_WAGE_BASE_CAP = 7000;
const SUI_NEW_EMPLOYER_RATE = 0.034; // new employers, first 2-3 years
const ETT_RATE = 0.001;
const FUTA_NET_RATE = 0.006; // after standard state credit
const FICA_EMPLOYER_RATE = 0.0765; // Social Security + Medicare, employer share
const MISCLASSIFICATION_PENALTY_LOW = 5000; // Labor Code § 226.8, per willful violation
const MISCLASSIFICATION_PENALTY_HIGH = 25000;

function computeCosts(inputs: CalculatorInputs): CostBreakdown | null {
  const amount = parseFloat(inputs.annualAmount);
  if (isNaN(amount) || amount <= 0) return null;

  const wageBase = Math.min(amount, CA_WAGE_BASE_CAP);
  const sui = wageBase * SUI_NEW_EMPLOYER_RATE;
  const ett = wageBase * ETT_RATE;
  const futa = wageBase * FUTA_NET_RATE;
  const fica = amount * FICA_EMPLOYER_RATE;
  const benefitsPctNum = parseFloat(inputs.benefitsPct) || 0;
  const benefits = inputs.includeBenefits ? amount * (benefitsPctNum / 100) : 0;

  const cost1099 = amount;
  const w2TaxOnlyCost = amount + fica + sui + ett + futa;
  const w2FullCost = w2TaxOnlyCost + benefits;
  const apparentSavings = w2FullCost - cost1099;

  // If this "1099" relationship is later reclassified as W-2, the unpaid
  // employer-side payroll taxes become a back-tax liability owed to EDD/IRS
  // on top of the statutory penalty — this is illustrative, not a formal
  // audit calculation, and does not include overtime/meal-break back pay,
  // which can be significantly larger and is not estimated here.
  const backTaxExposure = fica + sui + ett + futa;
  const exposureLow = MISCLASSIFICATION_PENALTY_LOW + backTaxExposure;
  const exposureHigh = MISCLASSIFICATION_PENALTY_HIGH + backTaxExposure;

  return {
    cost1099,
    fica,
    sui,
    ett,
    futa,
    benefits,
    w2TaxOnlyCost,
    w2FullCost,
    apparentSavings,
    backTaxExposure,
    penaltyLow: MISCLASSIFICATION_PENALTY_LOW,
    penaltyHigh: MISCLASSIFICATION_PENALTY_HIGH,
    exposureLow,
    exposureHigh,
  };
}

const fmt = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

interface MisclassificationCostCalculatorProps {
  /** Anchor id to scroll back up to the ABC/Borello audit tool above this
   * component. Defaults to the page's #top anchor used elsewhere on this
   * page. */
  auditAnchorId?: string;
}

const MisclassificationCostCalculator: React.FC<MisclassificationCostCalculatorProps> = ({
  auditAnchorId = '#top',
}) => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    annualAmount: '',
    includeBenefits: false,
    benefitsPct: '25',
  });
  const [result, setResult] = useState<CostBreakdown | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setInputs((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const computed = computeCosts(inputs);
    if (computed) {
      setResult(computed);
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setInputs({ annualAmount: '', includeBenefits: false, benefitsPct: '25' });
    setShowResult(false);
    setResult(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            1099 vs. W-2 True Cost Calculator
          </h2>
          <p className="text-sm text-text-primary/60 leading-relaxed">
            See what this worker actually costs as a 1099 contractor vs. a W-2 employee in
            California — and what a misclassification finding could cost if the ABC test result
            above says otherwise.
          </p>
        </div>

        {/* Annual amount */}
        <div className="space-y-2">
          <label htmlFor="annualAmount" className="block text-sm font-medium text-text-primary">
            Annual Payment Amount ($)
          </label>
          <input
            type="number"
            id="annualAmount"
            name="annualAmount"
            value={inputs.annualAmount}
            onChange={handleChange}
            placeholder="e.g. 80000"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-lavender focus:border-primary-lavender"
            required
          />
          <p className="text-xs text-text-primary/50">
            What you&apos;d pay this worker over a year, either as a 1099 contract total or a W-2
            base salary.
          </p>
        </div>

        {/* Benefits load toggle */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
            <input
              type="checkbox"
              name="includeBenefits"
              checked={inputs.includeBenefits}
              onChange={handleChange}
              className="rounded border-gray-300 text-primary-lavender focus:ring-primary-lavender"
            />
            Include estimated benefits load (health insurance, PTO, retirement match)
          </label>
          {inputs.includeBenefits && (
            <div className="flex items-center gap-2 pl-6">
              <input
                type="number"
                name="benefitsPct"
                value={inputs.benefitsPct}
                onChange={handleChange}
                className="w-20 px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-lavender focus:border-primary-lavender"
              />
              <span className="text-xs text-text-primary/50">
                % of base pay (20-30% is a common range for small employers)
              </span>
            </div>
          )}
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-primary-lavender text-white font-medium rounded-md hover:bg-primary-lavender/90 focus:outline-none focus:ring-2 focus:ring-primary-lavender focus:ring-offset-2"
          >
            Compare Costs
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-3 border border-gray-300 text-text-primary font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            Reset
          </button>
        </div>

        {/* Results */}
        {showResult && result && (
          <div className="mt-8 border-t border-gray-200 pt-6 space-y-6">
            <h3 className="text-xl font-bold text-text-primary">Cost Comparison</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* 1099 compliant */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-green-700 mb-2">
                  1099 (properly classified)
                </p>
                <p className="text-2xl font-black text-green-800 mb-1">{fmt(result.cost1099)}</p>
                <p className="text-xs text-green-700/70">
                  No employer payroll taxes or benefits owed on a legitimately independent
                  contractor.
                </p>
              </div>

              {/* W-2 */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-blue-700 mb-2">
                  W-2 employee
                </p>
                <p className="text-2xl font-black text-blue-800 mb-1">
                  {fmt(inputs.includeBenefits ? result.w2FullCost : result.w2TaxOnlyCost)}
                </p>
                <p className="text-xs text-blue-700/70">
                  Base pay + FICA {fmt(result.fica)} + CA SUI/ETT/FUTA {fmt(result.sui + result.ett + result.futa)}
                  {inputs.includeBenefits ? ` + benefits ${fmt(result.benefits)}` : ''}.
                </p>
              </div>

              {/* Misclassification exposure */}
              <div className="bg-red-50 border border-red-300 rounded-xl p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-red-700 mb-2">
                  If 1099 is later reclassified
                </p>
                <p className="text-2xl font-black text-red-800 mb-1">
                  {fmt(result.exposureLow)} – {fmt(result.exposureHigh)}
                </p>
                <p className="text-xs text-red-700/70">
                  On top of the {fmt(result.cost1099)} already paid: {fmt(result.penaltyLow)}–
                  {fmt(result.penaltyHigh)} statutory penalty (Labor Code § 226.8) + ~{fmt(result.backTaxExposure)}{' '}
                  in unpaid employer payroll taxes owed retroactively.
                </p>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800">
              <p className="text-sm">
                The apparent 1099 savings here is <strong>{fmt(result.apparentSavings)}/year</strong>.
                If this worker fails the ABC test above, that savings can flip into a five-figure
                liability — often more than the W-2 cost would have been in the first place.
              </p>
            </div>

            <div className="p-4 bg-gray-50 border border-gray-200 rounded-md text-xs text-text-primary/60 leading-relaxed">
              <strong>Methodology note:</strong> Figures use 2026 California new-employer rates
              (SUI 3.4%, ETT 0.1% — both capped at the first $7,000 of wages — plus federal FUTA
              net 0.6% and FICA employer share 7.65%). The misclassification exposure range does
              not include overtime, meal/rest break premiums, or multi-year lookback liability,
              which can substantially increase real-world exposure. This is an illustrative
              estimate for planning purposes only, not legal, tax, or accounting advice — confirm
              your actual SUI rate and full exposure with a CPA or employment attorney.
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={auditAnchorId}
                className="flex-1 text-center px-6 py-3 border border-primary-lavender text-primary-lavender font-bold rounded-md hover:bg-primary-lavender/5 transition-colors"
              >
                ↑ Re-check the ABC Test Result Above
              </a>
              <Link
                href="/tools/sb988-contract-generator"
                className="flex-1 text-center px-6 py-3 bg-primary-lavender text-white font-bold rounded-md hover:bg-primary-lavender-dark transition-colors"
              >
                Generate a Compliant Contract →
              </Link>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-gray-100 text-center">
          <p className="text-xs font-bold text-text-primary/40 uppercase tracking-widest">
            Powered by PancoLegal - The only AI focused on CA Freelance Law.
          </p>
        </div>
      </form>
    </div>
  );
};

export default MisclassificationCostCalculator;
