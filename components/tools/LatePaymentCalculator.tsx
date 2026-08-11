'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface FormData {
  projectAmount: string;
  daysLate: string;
  monthlyRate: string;
}

export default function LatePaymentCalculator() {
  const [formData, setFormData] = useState<FormData>({
    projectAmount: '',
    daysLate: '',
    monthlyRate: '1.5', // Default standard commercial rate 1.5% per month
  });

  const [calculation, setCalculation] = useState({
    originalAmount: 0,
    lateInterest: 0,
    totalAmount: 0,
    effectiveDailyRate: 0,
  });

  const [showResult, setShowResult] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.projectAmount && formData.daysLate) {
      const amount = parseFloat(formData.projectAmount);
      const days = parseInt(formData.daysLate);
      const rate = parseFloat(formData.monthlyRate) || 1.5;

      if (!isNaN(amount) && !isNaN(days) && amount > 0 && days >= 0) {
        // Standard commercial late fee formula: (Amount * (Monthly Rate / 100) / 30) * Days
        const dailyRate = (rate / 100) / 30;
        const lateInterest = amount * dailyRate * days;
        const totalAmount = amount + lateInterest;

        setCalculation({
          originalAmount: amount,
          lateInterest: lateInterest,
          totalAmount: totalAmount,
          effectiveDailyRate: dailyRate * 100,
        });

        setShowResult(true);
      }
    }
  };

  const handleReset = () => {
    setFormData({
      projectAmount: '',
      daysLate: '',
      monthlyRate: '1.5',
    });
    setShowResult(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Step 1: Invoice Amount */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-1.5">
              Overdue Invoice Amount ($)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold">$</span>
              <input
                type="number"
                name="projectAmount"
                value={formData.projectAmount}
                onChange={handleInputChange}
                placeholder="e.g. 3500"
                min="1"
                step="any"
                required
                className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 bg-white font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Step 2: Days Overdue */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-1.5">
              Days Overdue
            </label>
            <input
              type="number"
              name="daysLate"
              value={formData.daysLate}
              onChange={handleInputChange}
              placeholder="e.g. 45"
              min="1"
              required
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 bg-white font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Step 3: Commercial Interest Rate */}
        <div>
          <label className="block text-sm font-bold text-slate-800 mb-1.5">
            Commercial Interest Rate (% per month)
          </label>
          <select
            name="monthlyRate"
            value={formData.monthlyRate}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 bg-white font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="1.5">1.5% per month (Standard Commercial Rate / 18% APR)</option>
            <option value="1.0">1.0% per month (Conservative Rate / 12% APR)</option>
            <option value="2.0">2.0% per month (Aggressive Commercial Rate / 24% APR)</option>
          </select>
          <p className="mt-1.5 text-xs text-slate-500">
            Standard business custom uses 1.5% per month (or 18% APR) on past-due invoices.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-md hover:shadow-lg text-sm"
          >
            Calculate Overdue Interest
          </button>
          {showResult && (
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-3 border border-slate-300 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium transition"
            >
              Reset
            </button>
          )}
        </div>
      </form>

      {/* Compliance Boundary Disclaimer Notice (CRITICAL REQUIREMENT) */}
      <div className="mt-4 p-3 bg-slate-100 rounded-lg border border-slate-200 text-xs text-slate-600">
        <p className="font-semibold text-slate-700">📌 Compliance Notice:</p>
        <p>This calculation uses a standard commercial late-payment interest rate (1.5%/mo) as a contract reference value.</p>
      </div>

      {/* Calculation Results Display */}
      {showResult && (
        <div className="mt-8 pt-6 border-t border-slate-200 animate-fadeIn">
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-xl p-6 shadow-xl">
            <div className="text-xs font-mono text-indigo-300 uppercase tracking-widest mb-1">
              Estimated Overdue Fee Breakdown
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
              <div className="bg-white/10 rounded-lg p-3">
                <span className="text-[11px] text-slate-300 block">Original Invoice</span>
                <span className="text-lg font-bold text-white">
                  ${calculation.originalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="bg-white/10 rounded-lg p-3">
                <span className="text-[11px] text-indigo-200 block">Late Interest ({formData.monthlyRate}%/mo)</span>
                <span className="text-lg font-bold text-indigo-300">
                  +${calculation.lateInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="bg-indigo-600/60 rounded-lg p-3 border border-indigo-400/30">
                <span className="text-[11px] text-white/80 block">Total Due Demand Amount</span>
                <span className="text-xl font-black text-white">
                  ${calculation.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="text-xs text-slate-300 pt-2 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <span>
                Daily Interest Rate: ~{calculation.effectiveDailyRate.toFixed(4)}% per day on overdue balance.
              </span>
              <Link
                href="/contracts/generator"
                className="inline-flex items-center text-xs font-bold text-indigo-300 hover:text-white transition"
              >
                Draft Contract with Late Fee Provision →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
