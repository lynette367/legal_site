"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PayPalButton } from "./PayPalButton";

export function PricingContent() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handlePayPalSuccess = () => {
    setStatus("Payment successful!");
    setTimeout(() => {
      router.push(`/pricing/success?contracts=1`);
      setIsModalOpen(false);
    }, 1500);
  };

  const handlePayPalError = (error: Error) => {
    setStatus(`Payment failed: ${error.message || 'Unknown error'}`);
  };

  return (
    <>
      <section className="rounded-3xl border border-border-lavender bg-bg-card p-8 shadow-soft">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-text-primary">
            CA Freelancer Contract Generation
          </h2>
          <p className="text-text-primary/70 mt-2 text-lg">
            Generate professional contracts tailored for California freelancers
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="rounded-2xl border-2 border-primary-lavender bg-white p-6 shadow-lg">
            <div className="text-center">
              <p className="text-sm font-semibold text-text-lavender uppercase tracking-wide">
                Single Contract
              </p>
              <div className="mt-4 flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold text-text-primary">$4.99</span>
                <span className="text-lg text-text-primary/60">/ contract</span>
              </div>
              <ul className="mt-6 space-y-3 text-left">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span className="text-sm text-text-primary/80">AI-powered contract generation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span className="text-sm text-text-primary/80">California freelancer specific</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span className="text-sm text-text-primary/80">Professional legal clauses</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span className="text-sm text-text-primary/80">Instant delivery</span>
                </li>
              </ul>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-6 w-full rounded-full bg-primary-lavender px-4 py-3 text-base font-semibold text-white transition hover:bg-primary-lavender-dark"
              >
                Purchase Now
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-text-primary/60">
            All other AI features are free to use
          </p>
        </div>

        <div className="mt-6 rounded-xl border border-border-lavender/50 bg-white/50 p-4">
          <p className="text-center text-sm text-text-primary/70">
            <span className="font-semibold text-text-lavender">Secure Payment</span> powered by PayPal
          </p>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-3xl border border-border-lavender bg-bg-card p-6 shadow-soft">
            <div className="text-center">
              <p className="text-sm font-semibold text-text-lavender">Purchase Contract</p>
              <h2 className="mt-2 text-2xl font-semibold text-text-primary">
                CA Freelancer Contract
              </h2>
              <div className="mt-3 flex items-baseline justify-center gap-1">
                <p className="text-3xl font-bold text-text-lavender">$4.99</p>
                <p className="text-sm text-text-primary/60">/ 1 contract</p>
              </div>
              <p className="mt-2 text-xs text-text-primary/60">
                After payment, you will have 1 contract generation credit
              </p>
            </div>

            <div className="mt-6">
              <PayPalButton
                planId="single"
                onSuccess={handlePayPalSuccess}
                onError={handlePayPalError}
              />
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full rounded-full border border-border-lavender px-4 py-2 text-sm font-semibold text-text-primary"
            >
              Cancel
            </button>
            {status && (
              <p className={`mt-2 text-sm text-center ${
                status.includes("successful") ? "text-green-600" : "text-red-600"
              }`}>
                {status}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}