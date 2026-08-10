"use client";

import { useState } from "react";
import Link from "next/link";

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
}

export function EmailCaptureModal({
  isOpen,
  onClose,
  source = "hero_lead_magnet",
}: EmailCaptureModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, source }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to subscribe.");
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("An error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-xl w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
          aria-label="Close modal"
        >
          ×
        </button>

        {!isSubmitted ? (
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold mb-4">
              <span>📋</span> Free Downloadable Lead Magnet
            </div>
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">
              Get the Free Payment Protection Checklist
            </h3>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Instantly unlock our comprehensive 20-point checklist &amp; compliance guide to verify 1099 status, mandate prompt payment terms, and prevent client ghosting.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Your Name <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-primary-lavender/50 focus:border-primary-lavender"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-primary-lavender/50 focus:border-primary-lavender"
                />
              </div>

              {errorMsg && (
                <p className="text-xs text-red-600 font-medium">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-primary-lavender text-white font-bold text-sm shadow-md hover:bg-primary-lavender-dark transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Unlocking Checklist..." : "Unlock Payment Checklist →"}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-2xl mx-auto">
              ✓
            </div>
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">
              Checklist Unlocked!
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your free Payment Protection Checklist is ready. Access the interactive IRS classification audit and contract checklist now:
            </p>
            <Link
              href="/tools/irs-20-point-checklist"
              onClick={onClose}
              className="inline-flex items-center justify-center w-full py-3.5 px-6 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-md hover:bg-emerald-700 transition-all"
            >
              Open Free IRS &amp; Payment Checklist →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export function EmailCaptureSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "bottom_lead_magnet" }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to subscribe.");
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("An error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-6 my-12">
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="bg-primary-lavender/20 text-primary-lavender text-xs font-bold px-3 py-1 rounded-full border border-primary-lavender/30 uppercase tracking-widest inline-block mb-3">
            Free Freelance Compliance Lead Magnet
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            Get the Free Freelancer Payment Protection Checklist
          </h2>
          <p className="text-sm md:text-base text-slate-300 mt-2 max-w-xl mx-auto">
            Never sign an unsafe contract or lose money to overdue invoices. Access our free 20-point checklist &amp; statutory late fee guide.
          </p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="mt-8 max-w-lg mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 text-sm rounded-xl text-gray-900 bg-white border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-primary-lavender"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="py-3 px-6 rounded-xl bg-primary-lavender text-white font-bold text-sm shadow-md hover:bg-primary-lavender-dark transition-colors whitespace-nowrap disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Get Free Checklist →"}
              </button>
            </form>
          ) : (
            <div className="mt-6 bg-white/10 border border-white/20 rounded-2xl p-6 text-center">
              <p className="text-emerald-400 font-bold text-lg mb-2">✓ Access Unlocked!</p>
              <p className="text-xs text-slate-200 mb-4">
                Thank you! Click below to open the interactive IRS classification &amp; payment protection checklist:
              </p>
              <Link
                href="/tools/irs-20-point-checklist"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
              >
                Open Free Checklist Tool →
              </Link>
            </div>
          )}

          {errorMsg && (
            <p className="text-xs text-red-400 mt-2 font-medium">{errorMsg}</p>
          )}
        </div>
      </div>
    </section>
  );
}
