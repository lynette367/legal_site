'use client';

import React, { useState } from 'react';

interface FormData {
  projectAmount: string;
  daysLate: string;
}

const SB988PenaltyCalculator: React.FC = () => {
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
        <h2 className="text-2xl font-bold text-text-primary mb-6">Calculate Your Potential Penalties</h2>

        {/* Project Amount */}
        <div className="space-y-2">
          <label htmlFor="projectAmount" className="block text-sm font-medium text-text-primary">
            Project Amount ($)
          </label>
          <input
            type="number"
            id="projectAmount"
            name="projectAmount"
            value={formData.projectAmount}
            onChange={handleInputChange}
            placeholder="Enter project amount"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-lavender focus:border-primary-lavender"
            required
          />
        </div>

        {/* Days Late */}
        <div className="space-y-2">
          <label htmlFor="daysLate" className="block text-sm font-medium text-text-primary">
            Days Late
          </label>
          <input
            type="number"
            id="daysLate"
            name="daysLate"
            value={formData.daysLate}
            onChange={handleInputChange}
            placeholder="Enter number of days late"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-lavender focus:border-primary-lavender"
            required
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-primary-lavender text-white font-medium rounded-md hover:bg-primary-lavender/90 focus:outline-none focus:ring-2 focus:ring-primary-lavender focus:ring-offset-2"
          >
            Calculate Penalties
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
            <h3 className="text-xl font-bold text-text-primary mb-4">Calculation Results</h3>
            
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
                <span>Total Amount Owed:</span>
                <span className="text-primary-lavender">${calculation.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
              <p className="text-sm">
                <strong>Legal Note:</strong> This calculator provides an estimate based on SB 988 guidelines. 
                Actual penalties may vary based on specific circumstances. For accurate legal advice, consult with an attorney.
              </p>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold text-text-primary mb-2">Prevent Late Payments with Our Contract Generator</h4>
              <p className="text-text-primary/70 mb-4">
                Use our SB 988 Contract Generator to create legally compliant contracts that include clear payment terms and penalty clauses.
              </p>
              <a 
                href="/tools/sb988-contract-generator" 
                className="inline-block px-6 py-3 bg-primary-lavender text-white font-medium rounded-md hover:bg-primary-lavender/90 focus:outline-none focus:ring-2 focus:ring-primary-lavender focus:ring-offset-2"
              >
                Create a Contract
              </a>
            </div>
          </div>
        )}

        {/* Brand Association */}
        <div className="pt-4 border-t border-gray-100 text-center">
          <p className="text-xs font-bold text-text-primary/40 uppercase tracking-widest">
            Powered by PancoLegal - The only AI focused on CA Freelance Law.
          </p>
        </div>
      </form>
    </div>
  );
};

export default SB988PenaltyCalculator;