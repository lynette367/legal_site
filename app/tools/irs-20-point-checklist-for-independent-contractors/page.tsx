import { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import IRS20PointAuditor from "./IRS20PointAuditor";

export const metadata: Metadata = {
  title: "Free IRS 20-Point Worker Classification Auditor (1099 vs W-2) | PancoLegal",
  description:
    "Self-check your 1099 independent contractor relationship against the IRS's behavioral control, financial control, and relationship factors in 3 minutes. Free, instant risk score — no account required.",
  alternates: {
    canonical: "https://www.pancothink.com/tools/irs-20-point-checklist-for-independent-contractors",
  },
  openGraph: {
    title: "Free IRS 20-Point Worker Classification Auditor (1099 vs W-2)",
    description:
      "Self-check your 1099 independent contractor relationship against IRS common-law rules in 3 minutes. Free, instant risk score.",
    url: "https://www.pancothink.com/tools/irs-20-point-checklist-for-independent-contractors",
    type: "website",
  },
};

// ─── Static content ─────────────────────────────────────────────────────────

const RISK_FACTS = [
  {
    icon: "⚖️",
    label: "Back taxes & penalties",
    desc: "A reclassified worker can trigger liability for unpaid FICA, FUTA, and income tax withholding — plus IRS penalties and interest going back years.",
  },
  {
    icon: "🧾",
    label: "No single deciding factor",
    desc: "The IRS doesn't use a rigid checklist score. It weighs the whole relationship across behavioral control, financial control, and how permanent the relationship is.",
  },
  {
    icon: "📌",
    label: "State law can be stricter",
    desc: "California's ABC test (used for wage-and-hour purposes) is generally tougher to satisfy than the IRS common-law test — passing this audit doesn't guarantee ABC-test compliance.",
  },
];

const EMPLOYER_LINKS = [
  { href: "/freelance-contract/california-freelance-contract-requirements-2026", label: "California Freelance Contract Requirements 2026", tag: "Compliance" },
  { href: "/freelance-contract/california-freelance-worker-protection-act-checklist-employers", label: "SB 988 Employer Compliance Checklist", tag: "Compliance" },
  { href: "/freelance-contract/penalty-for-not-paying-independent-contractor-ca", label: "CA Contractor Late Payment Penalties", tag: "Risk" },
  { href: "/freelance-contract/ca-1099-contractor-30-day-payment-rule", label: "CA 1099 Contractor 30-Day Payment Rule", tag: "Compliance" },
  { href: "/freelance-contract/do-i-need-written-contract-california-freelancers", label: "Do I Need a Written Contract for CA Freelancers?", tag: "FAQ" },
];

const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "What is the IRS 20-point checklist for independent contractors?",
    a: "The IRS 20-point checklist (also known as the IRS 20 factor test) is a guideline used by the Internal Revenue Service to determine whether a worker should be classified as an independent contractor (1099) or an employee (W-2). It evaluates behavioral control, financial control, and the type of relationship between the business and the worker.",
  },
  {
    q: "Where can I download an IRS 20-point checklist PDF or template?",
    a: "While you can find static, outdated PDFs from various university sites, legal compliance changes rapidly. Our Free Interactive Worker Classification Tool above replaces dead PDF checklists. It automatically audits your risk level in 3 minutes and allows you to export a comprehensive evaluation report instantly.",
  },
  {
    q: "Independent Contractor vs. Employee: What is the main difference?",
    a: "The core difference lies in \"Control.\" If you control how, when, and where the work is done, the IRS considers them a W-2 employee (or \"1099 employee\" as some mistakenly call it). If the worker has the autonomy to set their own hours, use their own tools, and work for other clients, they are an independent contractor.",
  },
  {
    q: "What is a W-9 form and when do I need it?",
    a: "A W-9 form (Request for Taxpayer Identification Number and Certification) is used to gather tax details from an independent worker. You must collect a signed W-9 before they start working, ensuring you have the necessary information to file Form 1099 at tax year-end if you pay them more than $600.",
  },
  {
    q: "What is the $75 rule in the IRS?",
    a: "Under IRS guidelines, business owners do not need to keep physical receipts for business travel, entertainment, or transportation expenses if the total cost is under $75 (except for lodging). However, you must still log the date, place, and business purpose of the expense. Note that this rule does not apply to contractor service fees.",
  },
  {
    q: "Are there new independent contractor rules or laws I should know about?",
    a: "Yes. The regulatory landscape for 1099 classification is stricter than ever, driven by the Department of Labor (DOL) independent contractor final rule and various state-level mandates (such as California's strict AB5 and the Freelance Worker Protection Act). Relying on an old contract can expose your business to massive misclassification penalties.",
  },
  {
    q: "How can I protect my business from IRS 1099 auditing?",
    a: "A self-test is only the first step. The ultimate protection is a legally sound contract that mirrors these 20 factors. You can use Pancothink’s AI Contract Generator to instantly create dynamic, fully-compliant 1099 agreements tailored to latest state laws, ensuring your business stays 100% audit-proof.",
  }
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function IRS20PointChecklistPage() {
  return (
    <div className="min-h-screen bg-bg-main" id="top">
      {/* ── Hero ── */}
      <section className="max-w-4xl mx-auto pt-14 pb-8 px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary-lavender/10 px-4 py-1.5 text-sm font-semibold text-text-lavender mb-6 border border-primary-lavender/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-lavender opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-lavender"></span>
          </span>
          IRS Worker Classification · Behavioral, Financial &amp; Relationship Control
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-text-primary tracking-tight leading-tight mb-4">
          Free IRS 20-Point
          <br />
          <span className="text-2xl md:text-3xl font-bold text-text-primary/60">
            Worker Classification Auditor
          </span>
        </h1>

        <p className="text-lg text-text-primary/70 max-w-2xl mx-auto mb-10 leading-relaxed">
          A 3-minute self-check to catch 1099 independent contractor misclassification risk before the IRS does.
          Answer 20 plain-English questions and get an instant risk score across the three categories the IRS
          actually uses.
        </p>
      </section>

      {/* ── Quiz widget ── */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <IRS20PointAuditor />
      </section>

      {/* ── Why this matters ── */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-lavender bg-primary-lavender/10 px-3 py-1 rounded-full">
            Why it matters
          </span>
          <h2 className="text-2xl font-black text-text-primary mt-3 tracking-tight">
            Misclassification is a real audit trigger — not a formality
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {RISK_FACTS.map(({ icon, label, desc }) => (
            <div key={label} className="bg-white border border-gray-200 rounded-xl p-5">
              <span className="text-2xl">{icon}</span>
              <p className="font-bold text-text-primary text-sm mt-3 mb-1">{label}</p>
              <p className="text-xs text-text-primary/60 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Prose authority block — SEO content */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 text-sm text-text-primary/70 leading-relaxed space-y-4">
          <p>
            The IRS no longer publishes a literal &quot;20-factor&quot; scoring form — that list has been folded into
            three broader categories under its common-law employment test: behavioral control (does the business
            direct how the work is done), financial control (who bears the economic risk and controls the business
            side of the job), and the type of relationship (how permanent, exclusive, and central the work is to the
            business). No single answer is decisive; the IRS weighs the relationship as a whole.
          </p>
          <p>
            Businesses that misclassify workers can face liability for unpaid employment taxes, penalties, and
            interest — and in California, a separate and generally stricter{" "}
            <Link
              href="/tools/california-independent-contractor-laws"
              className="text-primary-lavender hover:underline font-semibold"
            >
              &quot;ABC test&quot;
            </Link>{" "}
            governs wage-and-hour classification on top of the federal common-law test. If your assessment above
            came back medium or high risk, the fastest fix is usually tightening the written agreement and reducing
            day-to-day behavioral control, not abandoning the contractor relationship entirely.
          </p>
          <p>
            For a formal determination, either party to the relationship can file{" "}
            <span className="font-semibold text-text-primary">IRS Form SS-8</span> (Determination of Worker Status)
            to request an official ruling. This tool is designed as a fast, private self-check to flag risk before
            it becomes a formal dispute — it is not a substitute for that process or for advice from a CPA or
            employment attorney.
          </p>
        </div>
      </section>

      {/* ── Internal links: employer compliance cluster ── */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary-lavender bg-primary-lavender/10 px-3 py-1 rounded-full">
              For employers
            </span>
            <h2 className="text-2xl font-black text-text-primary mt-3 tracking-tight">
              California SB 988 compliance guides
            </h2>
            <p className="text-sm text-text-primary/60 mt-1 max-w-xl">
              Classification risk and payment compliance go hand in hand — once you&apos;ve assessed the risk above,
              close the gap with a compliant written agreement.
            </p>
          </div>
          <Link
            href="/freelance-contract"
            className="shrink-0 inline-flex items-center gap-1.5 text-sm font-bold text-primary-lavender border border-primary-lavender/30 rounded-xl px-5 py-2.5 hover:bg-primary-lavender/5 transition-colors"
          >
            Browse all 100+ guides →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EMPLOYER_LINKS.map(({ href, label, tag }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center justify-between gap-3 bg-white border border-gray-200 rounded-xl px-5 py-4 hover:border-primary-lavender hover:shadow-soft transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-gray-300 shrink-0">›</span>
                <span className="text-sm font-medium text-text-primary group-hover:text-primary-lavender transition-colors leading-snug">
                  {label}
                </span>
              </div>
              <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide text-primary-lavender bg-primary-lavender/10 px-2 py-0.5 rounded">
                {tag}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-4xl mx-auto px-6 mb-24">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-lavender bg-primary-lavender/10 px-3 py-1 rounded-full">
            FAQ
          </span>
          <h2 className="text-2xl font-black text-text-primary mt-3 tracking-tight">
            Common questions about worker classification
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map(({ q, a }) => (
            <details key={q} className="group bg-white border border-gray-200 rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none select-none hover:bg-gray-50 transition-colors">
                <span className="font-semibold text-sm text-text-primary leading-snug">{q}</span>
                <span className="shrink-0 text-primary-lavender text-lg leading-none group-open:rotate-45 transition-transform duration-200">
                  +
                </span>
              </summary>
              <div className="px-6 pb-5 pt-1">
                <p className="text-sm text-text-primary/65 leading-relaxed">{a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="max-w-4xl mx-auto px-6 mb-24">
        <div className="bg-primary-lavender/5 border border-primary-lavender/20 rounded-3xl px-8 py-10 text-center">
          <h2 className="text-2xl font-black text-text-primary mb-3">Already know your risk level?</h2>
          <p className="text-sm text-text-primary/60 mb-6 max-w-md mx-auto leading-relaxed">
            Whatever your score, a clear written agreement is the single fastest way to reduce classification risk
            and stay SB 988 compliant.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#top"
              className="inline-flex items-center justify-center gap-2 bg-primary-lavender text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-lavender-dark transition-colors text-sm"
            >
              Retake the Assessment ↑
            </a>
            <Link
              href="/tools/sb988-contract-generator"
              className="inline-flex items-center justify-center gap-2 bg-white border border-primary-lavender/30 text-primary-lavender font-bold px-6 py-3 rounded-xl hover:bg-primary-lavender/5 transition-colors text-sm"
            >
              Generate a Compliant Contract →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
