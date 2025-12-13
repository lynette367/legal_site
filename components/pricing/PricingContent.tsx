"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  paymentChannels,
  plans,
  singleUse,
  creditsNote,
  PaymentMethod,
} from "../../data/plans";
import { PayPalButton, PayPalCaptureSuccess } from "./PayPalButton";

export function PricingContent() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<(typeof plans)[number] | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("paypal");
  const [status, setStatus] = useState<string | null>(null);

  const openModal = (planId: string) => {
    const plan = plans.find((item) => item.id === planId) ?? null;
    setSelectedPlan(plan);
    setPaymentMethod("paypal");
    setStatus(null);
    setIsModalOpen(true);
  };

  const handlePayPalSuccess = (data: PayPalCaptureSuccess) => {
    setStatus("Payment successful!");
    setTimeout(() => {
      router.push(`/pricing/success?plan=${selectedPlan?.id}&credits=${data.credits?.remainingCredits || selectedPlan?.credits}`);
      setIsModalOpen(false);
    }, 1000);
  };

  const handlePayPalError = (error: Error) => {
    setStatus(`Payment failed: ${error.message || 'Unknown error'}`);
  };

  const handleTraditionalPay = () => {
    if (!selectedPlan) return;
    setStatus("Calling payment API (placeholder)...");
    setTimeout(() => {
      router.push(`/pricing/success?plan=${selectedPlan.id}&credits=${selectedPlan.credits}`);
      setIsModalOpen(false);
    }, 600);
  };

  return (
    <>
      <section className="rounded-3xl border border-border-lavender bg-bg-card p-8 shadow-soft">
        {/* Credit notes */}
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-primary-lavender/10 to-primary-lavender/5 p-4 text-center">
          <p className="text-sm font-semibold text-text-lavender">
            💡 {creditsNote}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-text-lavender">Credit deduction rules</p>
            <p className="mt-2 text-xs text-text-primary/60">
              Different features deduct 1-3 credits based on complexity
            </p>
            <ul className="mt-4 space-y-3">
              {singleUse.map((item) => (
                <li key={item.label} className="rounded-2xl border border-border-lavender/80 bg-white/90 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-base font-semibold text-text-primary">{item.label}</p>
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      item.cost === 1 
                        ? "bg-green-100 text-green-700" 
                        : item.cost === 2 
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-primary-lavender/20 text-text-lavender"
                    }`}>
                      -{item.cost} credits
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-text-primary/70">{item.detail}</p>
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-xl bg-primary-lavender/5 border border-primary-lavender/20 p-3">
              <p className="text-xs font-semibold text-text-lavender mb-1">💡 Credit advantages</p>
              <p className="text-xs text-text-primary/70">
                Credits move freely across all features with no separate payments per tool.
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-text-lavender">Credit bundles</p>
            <div className="mt-4 grid gap-4">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl border bg-white/90 p-5 transition-all ${
                    plan.recommended 
                      ? "border-primary-lavender ring-2 ring-primary-lavender shadow-lg" 
                      : "border-border-lavender/80"
                    }`}
                  >
                    {/* Recommendation tag */}
                    {plan.recommended && (
                      <div className="absolute -top-3 left-4 rounded-full bg-primary-lavender px-3 py-1 text-xs font-bold text-white shadow-sm">
                      ⭐ Best value
                      </div>
                    )}
                    
                    <div className="flex items-baseline justify-between">
                      <div>
                        <p className="text-lg font-semibold text-text-primary">{plan.name}</p>
                      <p className="text-xs uppercase text-text-lavender">Credits {plan.credits}</p>
                      </div>
                      <p className="text-2xl font-bold text-text-lavender">{plan.price}</p>
                    </div>
                    <p className="mt-2 text-sm text-text-primary/70">{plan.description}</p>
                    <button
                      onClick={() => openModal(plan.id)}
                      className={`mt-4 w-full rounded-full px-4 py-2 text-sm font-semibold text-white transition ${
                        plan.recommended
                          ? "bg-primary-lavender hover:bg-primary-lavender-dark"
                          : "bg-primary-lavender/80 hover:bg-primary-lavender"
                      }`}
                    >
                    Buy now
                    </button>
                  </div>
                ))}
              </div>
          </div>
        </div>
        <div className="mt-8 rounded-2xl border border-border-lavender/80 bg-white/90 p-5">
          <p className="text-sm font-semibold text-text-lavender">Payment methods</p>
          <p className="mt-2 text-sm text-text-primary/70">
            PayPal is integrated; WeChat/Alipay H5 options are shown as UI placeholders.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <span className="rounded-full bg-blue-500/20 px-4 py-1 text-sm text-blue-600 font-semibold">
              PayPal (integrated)
            </span>
            {paymentChannels.map((method) => (
              <span key={method.value} className="rounded-full bg-primary-lavender/20 px-4 py-1 text-sm text-text-lavender">
                {method.label} (placeholder)
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Payment modal */}
      {isModalOpen && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-3xl border border-border-lavender bg-bg-card p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-text-lavender">Purchase credits</p>
              {selectedPlan.recommended && (
                <span className="rounded-full bg-primary-lavender px-2 py-0.5 text-xs font-bold text-white">
                  ⭐ Best value
                </span>
              )}
            </div>
            <h2 className="mt-2 text-2xl font-semibold text-text-primary">{selectedPlan.name}</h2>
            <p className="text-sm text-text-primary/70">
              {selectedPlan.description}
            </p>
            <div className="mt-3 flex items-baseline gap-2">
              <p className="text-3xl font-bold text-text-lavender">{selectedPlan.price}</p>
              <p className="text-sm text-text-primary/60">/ {selectedPlan.credits} credits</p>
            </div>
            <p className="mt-2 text-xs text-text-primary/60">{creditsNote}</p>
            
            <div className="mt-4 space-y-2">
              <label className="flex items-center gap-2 rounded-xl border border-blue-500/70 bg-blue-50/80 p-3">
                <input
                  type="radio"
                  name="payment"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={() => setPaymentMethod("paypal")}
                  className="accent-blue-500"
                />
                <span className="text-sm text-text-primary font-semibold">PayPal payment (live integration)</span>
              </label>
              {paymentChannels.map((channel) => (
                <label key={channel.value} className="flex items-center gap-2 rounded-xl border border-border-lavender/70 bg-white/80 p-3 opacity-60">
                  <input
                    type="radio"
                    name="payment"
                    value={channel.value}
                    checked={paymentMethod === channel.value}
                    onChange={() => setPaymentMethod(channel.value)}
                    className="accent-primary-lavender"
                  />
                  <span className="text-sm text-text-primary">{channel.label} (placeholder)</span>
                </label>
              ))}
            </div>
            
            {paymentMethod === "paypal" ? (
              <>
                <p className="mt-3 text-xs text-text-primary/70">
                  Pay securely with PayPal using cards or a PayPal account.
                </p>
                <div className="mt-5">
                  <PayPalButton
                    planId={selectedPlan.id}
                    onSuccess={handlePayPalSuccess}
                    onError={handlePayPalError}
                  />
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mt-3 w-full rounded-full border border-border-lavender px-4 py-2 text-sm font-semibold text-text-primary"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <p className="mt-3 text-xs text-text-primary/70">
                  Placeholder payment flow only. After confirming, you will be redirected to the success page and credits will be added.
                </p>
                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 rounded-full border border-border-lavender px-4 py-2 text-sm font-semibold text-text-primary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleTraditionalPay}
                    className="flex-1 rounded-full bg-primary-lavender px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-lavender-dark"
                  >
                    Proceed to pay
                  </button>
                </div>
              </>
            )}
            {status && <p className="mt-2 text-sm text-text-lavender">{status}</p>}
          </div>
        </div>
      )}
    </>
  );
}
