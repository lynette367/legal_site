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
    setStatus("支付成功！");
    setTimeout(() => {
      router.push(`/pricing/success?plan=${selectedPlan?.id}&credits=${data.credits?.remainingCredits || selectedPlan?.credits}`);
      setIsModalOpen(false);
    }, 1000);
  };

  const handlePayPalError = (error: Error) => {
    setStatus(`支付失败: ${error.message || '未知错误'}`);
  };

  const handleTraditionalPay = () => {
    if (!selectedPlan) return;
    setStatus("调用支付 API（占位）...");
    setTimeout(() => {
      router.push(`/pricing/success?plan=${selectedPlan.id}&credits=${selectedPlan.credits}`);
      setIsModalOpen(false);
    }, 600);
  };

  return (
    <>
      <section className="rounded-3xl border border-border-lavender bg-bg-card p-8 shadow-soft">
        {/* 点数说明 */}
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-primary-lavender/10 to-primary-lavender/5 p-4 text-center">
          <p className="text-sm font-semibold text-text-lavender">
            💡 {creditsNote}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-text-lavender">点数扣费说明</p>
            <p className="mt-2 text-xs text-text-primary/60">
              不同功能按复杂度扣除 1-3 点
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
                      -{item.cost} 点
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-text-primary/70">{item.detail}</p>
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-xl bg-primary-lavender/5 border border-primary-lavender/20 p-3">
              <p className="text-xs font-semibold text-text-lavender mb-1">💡 点数优势</p>
              <p className="text-xs text-text-primary/70">
                购买点数后，可在所有功能间自由使用，无需为不同功能单独付费
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-text-lavender">点数套餐</p>
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
                  {/* 推荐标签 */}
                  {plan.recommended && (
                    <div className="absolute -top-3 left-4 rounded-full bg-primary-lavender px-3 py-1 text-xs font-bold text-white shadow-sm">
                      ⭐ 最推荐
                    </div>
                  )}
                  
                  <div className="flex items-baseline justify-between">
                    <div>
                      <p className="text-lg font-semibold text-text-primary">{plan.name}</p>
                      <p className="text-xs uppercase text-text-lavender">可用点数 {plan.credits}</p>
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
                    立即购买
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 rounded-2xl border border-border-lavender/80 bg-white/90 p-5">
          <p className="text-sm font-semibold text-text-lavender">支付方式</p>
          <p className="mt-2 text-sm text-text-primary/70">
            支持 PayPal 官方支付（已集成）+ 微信/支付宝 H5 支付（UI 占位）
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <span className="rounded-full bg-blue-500/20 px-4 py-1 text-sm text-blue-600 font-semibold">
              PayPal（已集成）
            </span>
            {paymentChannels.map((method) => (
              <span key={method.value} className="rounded-full bg-primary-lavender/20 px-4 py-1 text-sm text-text-lavender">
                {method.label}（占位）
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 支付弹窗 */}
      {isModalOpen && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-3xl border border-border-lavender bg-bg-card p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-text-lavender">购买点数</p>
              {selectedPlan.recommended && (
                <span className="rounded-full bg-primary-lavender px-2 py-0.5 text-xs font-bold text-white">
                  ⭐ 最推荐
                </span>
              )}
            </div>
            <h2 className="mt-2 text-2xl font-semibold text-text-primary">{selectedPlan.name}</h2>
            <p className="text-sm text-text-primary/70">
              {selectedPlan.description}
            </p>
            <div className="mt-3 flex items-baseline gap-2">
              <p className="text-3xl font-bold text-text-lavender">{selectedPlan.price}</p>
              <p className="text-sm text-text-primary/60">/ {selectedPlan.credits} 点</p>
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
                <span className="text-sm text-text-primary font-semibold">PayPal 支付（真实集成）</span>
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
                  <span className="text-sm text-text-primary">{channel.label}（占位）</span>
                </label>
              ))}
            </div>
            
            {paymentMethod === "paypal" ? (
              <>
                <p className="mt-3 text-xs text-text-primary/70">
                  使用 PayPal 官方支付，支持信用卡和 PayPal 账户
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
                  取消
                </button>
              </>
            ) : (
              <>
                <p className="mt-3 text-xs text-text-primary/70">
                  仅展示支付流程占位，确认后跳转支付成功页并增加点数。
                </p>
                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 rounded-full border border-border-lavender px-4 py-2 text-sm font-semibold text-text-primary"
                  >
                    取消
                  </button>
                  <button
                    onClick={handleTraditionalPay}
                    className="flex-1 rounded-full bg-primary-lavender px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-lavender-dark"
                  >
                    去支付
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
