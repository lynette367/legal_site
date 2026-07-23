'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface FormData {
  projectAmount: string;
  daysLate: string;
}

interface PenaltyCalculatorProps {
  mode?: 'freelancer' | 'business';
  scenario?: string;
  onLinkToGenerator?: () => void;
}

const SB988PenaltyCalculator: React.FC<PenaltyCalculatorProps> = ({ mode = 'freelancer', scenario, onLinkToGenerator }) => {
  const [formData, setFormData] = useState<FormData>({
    projectAmount: '',
    daysLate: '',
  });

  const [calculation, setCalculation] = useState({
    originalAmount: 0,
    lateFee: 0,
    doubleDamages: 0,
    totalAmount: 0,
  });

  const [showResult, setShowResult] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.projectAmount && formData.daysLate) {
      const amount = parseFloat(formData.projectAmount);
      const days = parseInt(formData.daysLate);

      if (!isNaN(amount) && !isNaN(days)) {
        // Calculate penalties based on SB 988
        const lateFee = amount * 0.01 * days; // 1% per day as a simple calculation
        const doubleDamages = amount; // Double damages as per SB 988
        const totalAmount = amount + lateFee + doubleDamages;

        setCalculation({
          originalAmount: amount,
          lateFee: lateFee,
          doubleDamages: doubleDamages,
          totalAmount: totalAmount,
        });

        setShowResult(true);
      }
    }
  };

  const handleReset = () => {
    setFormData({
      projectAmount: '',
      daysLate: '',
    });
    setShowResult(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Context Banners */}
        {scenario === 'invoice-overdue-30' && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-md text-red-950 text-sm">
            <p className="font-bold mb-1">📢 Invoice Overdue Protection Mode</p>
            <p>Under CA SB 988, clients have a strict 30-day window to pay you. If they are late, you are legally entitled to double damages. Stop chasing them with nice emails—calculate the exact statutory penalty they owe you right now.</p>
          </div>
        )}
        {scenario === 'avoid-250-trap' && (
          <div className="p-4 bg-blue-50 border-l-4 border-blue-600 rounded-md text-blue-950 text-sm">
            <p className="font-bold mb-1">🛡️ Corporate Liability Simulator Active</p>
            <p>If you hire a freelancer for a project cumulative of $250 or more across 4 months, you must use a formal agreement. Run our liability simulator to see the catastrophic statutory fines your business faces if a freelancer takes you to court over late payments.</p>
          </div>
        )}

        <h2 className="text-2xl font-bold text-text-primary mb-6">
          {mode === 'business' ? 'Corporate Liability & Penalty Simulator' : 'Calculate Your Potential Penalties'}
        </h2>

        {/* Project Amount */}
        <div className="space-y-2">
          <label htmlFor="projectAmount" className="block text-sm font-medium text-text-primary">
            {mode === 'business' ? 'Cumulative Project Amount ($)' : 'Project Amount ($)'}
          </label>
          <input
            type="number"
            id="projectAmount"
            name="projectAmount"
            value={formData.projectAmount}
            onChange={handleInputChange}
            placeholder={mode === 'business' ? "Enter total freelance payments" : "Enter project amount"}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-lavender focus:border-primary-lavender"
            required
          />
        </div>

        {/* Days Late */}
        <div className="space-y-2">
          <label htmlFor="daysLate" className="block text-sm font-medium text-text-primary">
            {mode === 'business' ? 'Days Payment Overdue' : 'Days Late'}
          </label>
          <input
            type="number"
            id="daysLate"
            name="daysLate"
            value={formData.daysLate}
            onChange={handleInputChange}
            placeholder={mode === 'business' ? "Enter number of overdue days" : "Enter number of days late"}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-lavender focus:border-primary-lavender"
            required
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-primary-lavender text-white font-medium rounded-md hover:bg-primary-lavender/90 focus:outline-none focus:ring-2 focus:ring-primary-lavender focus:ring-offset-2"
          >
            {mode === 'business' ? 'Simulate Corporate Liability' : 'Calculate Penalties'}
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
        {showResult && (
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="text-xl font-bold text-text-primary mb-4">
              {mode === 'business' ? 'Corporate Liability Exposure' : 'Calculation Results'}
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-text-primary/70">Original Project Amount:</span>
                <span className="font-medium">${calculation.originalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-primary/70">Late Fee (1% per day):</span>
                <span className="font-medium">${calculation.lateFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-primary/70">Double Damages (SB 988):</span>
                <span className="font-medium">${calculation.doubleDamages.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between font-bold">
                <span>{mode === 'business' ? 'Total Corporate Exposure:' : 'Total Amount Owed:'}</span>
                <span className="text-primary-lavender">${calculation.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
              <p className="text-sm">
                <strong>Legal Note:</strong> {mode === 'business' 
                  ? 'Under CA SB 988, cumulative projects of $250+ across 4 months require a formal written contract. Non-compliance exposes your business to double damages, a statutory $1,000 fine for refusing a contract, plus plaintiff attorney fees.'
                  : 'This calculator provides an estimate based on SB 988 guidelines. Actual penalties may vary. Under CA SB 988, clients have a strict 30-day window to pay you.'}
              </p>
            </div>

            {mode === 'business' ? (
              <div className="mt-6 space-y-4">
                <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                  <p className="text-sm font-semibold">
                    🚨 WARNING FOR CLIENTS / BUSINESSES:
                  </p>
                  <p className="text-xs mt-1">
                    If a freelancer files a lawsuit, California courts mandate double damages. You cannot contract out of this requirement. Ensure your onboarding agreements are 100% compliant.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onLinkToGenerator}
                  className="w-full px-6 py-4 bg-primary-lavender text-white font-bold rounded-md text-center hover:bg-primary-lavender-dark transition-all focus:outline-none focus:ring-2 focus:ring-primary-lavender focus:ring-offset-2"
                >
                  🛡️ Generate A Compliant CA Business-to-Freelancer Contract Now
                </button>
              </div>
            ) : (
              <>
                <div className="mt-6">
                  <Link href="/guides/ca-contractor-small-claims" className="inline-block w-full px-6 py-4 bg-red-600 text-white font-bold rounded-md text-center hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                    🚨 What is your next legal step? Click here to view your 3-Step Small Claims Court Action Roadmap →
                  </Link>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold text-text-primary mb-2">Prevent Late Payments with Our Contract Generator</h4>
                  <p className="text-text-primary/70 mb-4">
                    Use our SB 988 Contract Generator to create legally compliant contracts that include clear payment terms and penalty clauses.
                  </p>
                  <Link
                    href="/contracts/generator"
                    className="inline-block px-6 py-3 bg-primary-lavender text-white font-medium rounded-md hover:bg-primary-lavender/90 focus:outline-none focus:ring-2 focus:ring-primary-lavender focus:ring-offset-2"
                  >
                    Create a Contract
                  </Link>
                </div>
              </>
            )}
          </div>
        )}

        {/* Brand Association */}
        <div className="pt-4 border-t border-gray-100 text-center">
          <p className="text-xs font-bold text-text-primary/40 uppercase tracking-widest">
            Powered by IndieLegal - The only AI focused on CA Freelance Law.
          </p>
        </div>
      </form>
    </div>
  );
};

export default SB988PenaltyCalculator;