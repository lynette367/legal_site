import type { Metadata } from "next";
import Link from "next/link";
import { plans, creditsNote } from "../data/plans";

export const metadata: Metadata = {
  title: "Panco Legal Assistant | AI Legal Q&A, Dispute Plans, Documents, Contracts",
  description: "Panco Legal Assistant provides legal Q&A, dispute analysis, litigation/defense/complaint drafts, contract creation, and clause explanations. Pay per use with no subscription, and data is cleared instantly.",
};

const modules = [
  { name: "AI Legal Q&A", href: "/legal-qa", desc: "Instantly classify issues and surface risk points", tag: "1 credit per call" },
  { name: "Clause Explanation", href: "/explain", desc: "Clause meaning plus risk alerts", tag: "1 credit per call" },
  { name: "AI Dispute Plan", href: "/dispute", desc: "Action path, evidence checklist, and risks", tag: "2 credits per call" },
  { name: "Legal Document Drafting", href: "/documents", desc: "Complaint/defense/complaint letter drafts", tag: "3 credits per call" },
  { name: "Contract Generator", href: "/contracts", desc: "Lease/labor/partnership/NDA templates", tag: "3 credits per call" },
];

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-border-lavender bg-bg-card p-12 text-center shadow-[0_4px_20px_rgba(126,196,164,0.2)]">
          <p className="text-2xl font-semibold text-text-primary md:text-3xl">
            Panco Legal Assistant
          </p>
          
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-text-primary">
            AI legal toolkit built for individuals and small businesses, covering legal Q&A, dispute analysis, document drafting, and contract generation.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="rounded-full bg-primary-lavender/25 px-4 py-2 text-sm font-medium text-text-lavender">
              AI Legal Q&A (on-demand)
            </span>
            <span className="rounded-full bg-primary-lavender/25 px-4 py-2 text-sm font-medium text-text-lavender">
              One-click legal drafting
            </span>
            <span className="rounded-full bg-primary-lavender/25 px-4 py-2 text-sm font-medium text-text-lavender">
              Pay per use, no subscription
            </span>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/legal-qa"
              className="rounded-xl bg-primary-lavender px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-primary-lavender-dark"
            >
              Start AI Legal Q&A
            </Link>
            <Link
              href="/pricing"
              className="rounded-xl border border-primary-lavender/40 bg-white px-6 py-3 text-base font-semibold text-text-lavender transition hover:border-primary-lavender"
            >
              View plans and pricing
            </Link>
          </div>

          <p className="mt-8 text-sm text-text-primary/60">
            Your data is processed immediately, cleared instantly, and never stored or used for model training.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-border-lavender bg-white/80 p-8 shadow-soft">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">Five Core Modules</h2>
          <p className="mt-2 text-text-primary/70">Each module includes examples. AI calls are available after payment.</p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {modules.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-border-lavender/70 bg-bg-card p-5 transition hover:-translate-y-1 hover:border-primary-lavender"
            >
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-text-primary">{item.name}</p>
                <span className="rounded-full bg-primary-lavender/20 px-3 py-1 text-xs font-semibold text-text-lavender">
                  {item.tag}
                </span>
              </div>
              <p className="mt-3 text-sm text-text-primary/70">{item.desc}</p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-text-lavender">
                Go to module →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-border-lavender bg-bg-card p-8 shadow-soft">
        <h2 className="text-2xl font-semibold text-text-primary">Credit Packages</h2>
        <p className="mt-2 text-sm text-text-primary/70">💡 {creditsNote}</p>
        
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`relative rounded-2xl border p-5 ${
                plan.recommended 
                  ? "border-primary-lavender ring-2 ring-primary-lavender bg-white" 
                  : "border-border-lavender/80 bg-white/80"
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-4 rounded-full bg-primary-lavender px-3 py-1 text-xs font-bold text-white">
                  ⭐ Best value
                </div>
              )}
              <div className="flex items-baseline justify-between">
                <p className="text-lg font-semibold text-text-primary">{plan.name}</p>
                <p className="text-xl font-bold text-text-lavender">{plan.price}</p>
              </div>
              <p className="text-xs text-text-lavender mt-1">{plan.credits} credits</p>
              <p className="text-sm text-text-primary/70 mt-2">{plan.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/pricing"
            className="inline-block rounded-full bg-primary-lavender px-8 py-3 text-sm font-semibold text-white transition hover:bg-primary-lavender-dark"
          >
            Purchase credits
          </Link>
        </div>

        <div className="mt-6 rounded-2xl border border-border-lavender/80 bg-white/80 p-5">
          <p className="text-sm font-semibold text-text-lavender">Payment methods</p>
          <p className="mt-2 text-sm text-text-primary/80">PayPal is integrated. More payment methods coming soon.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <span className="rounded-full bg-blue-500/20 px-4 py-1 text-sm text-blue-600 font-semibold">
              PayPal (live integration)
            </span>
            <span className="rounded-full bg-primary-lavender/10 px-4 py-1 text-sm text-text-lavender">
              More methods coming soon
            </span>
          </div>
        </div>
      </section>

    </div>
  );
}
