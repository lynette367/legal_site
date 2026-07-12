"use client";
// app/tools/irs-20-point-checklist-for-independent-contractors/IRS20PointAuditor.tsx
// Free, credit-free lead-gen quiz. Pure client state — no API calls, no backend route.
// Converts at the result screen into the SB 988 contract generator funnel.

import { useState } from "react";
import Link from "next/link";

type Category = "behavioral" | "financial" | "relationship";
type Answer = "yes" | "no";
type Screen = "intro" | "quiz" | "result";

interface Question {
  id: number;
  category: Category;
  irsFactor: string; // short label referencing the classic IRS factor
  question: string; // plain-English translation
  yesLabel: string;
  noLabel: string;
  riskyAnswer: Answer; // which answer pushes the worker toward "employee"
  riskyNote: string; // shown in the "red flags" list if this answer was picked
}

const CATEGORY_META: Record<
  Category,
  { label: string; icon: string; description: string }
> = {
  behavioral: {
    label: "Behavioral Control",
    icon: "🧭",
    description: "Do you control how, when, and where the work gets done?",
  },
  financial: {
    label: "Financial Control",
    icon: "💵",
    description: "Who carries the financial risk and controls the business side of the job?",
  },
  relationship: {
    label: "Type of Relationship",
    icon: "🤝",
    description: "How permanent, exclusive, and central is this worker to your business?",
  },
};

const QUESTIONS: Question[] = [
  // ── Behavioral Control (7) ──────────────────────────────────────────────
  {
    id: 1,
    category: "behavioral",
    irsFactor: "Instructions",
    question: "Do you tell them exactly when, where, or how to do the work — not just what the final result should look like?",
    yesLabel: "Yes, we set the specifics",
    noLabel: "No, they decide how/when/where",
    riskyAnswer: "yes",
    riskyNote: "You give detailed instructions on how the work is done, not just the outcome.",
  },
  {
    id: 2,
    category: "behavioral",
    irsFactor: "Training",
    question: "Have you trained them on your specific procedures, methods, or internal systems?",
    yesLabel: "Yes, we trained them",
    noLabel: "No, they already knew how",
    riskyAnswer: "yes",
    riskyNote: "You provided training on your specific methods — contractors are hired for expertise they already have.",
  },
  {
    id: 3,
    category: "behavioral",
    irsFactor: "Set hours & location",
    question: "Do you require fixed daily hours or a specific work location, such as your office?",
    yesLabel: "Yes, fixed hours/location",
    noLabel: "No, flexible hours & location",
    riskyAnswer: "yes",
    riskyNote: "You require fixed hours or a fixed work location.",
  },
  {
    id: 4,
    category: "behavioral",
    irsFactor: "Personal service",
    question: "Must they personally perform the work, with no right to send a substitute or subcontract it?",
    yesLabel: "Yes, must be them personally",
    noLabel: "No, they can send someone else",
    riskyAnswer: "yes",
    riskyNote: "The worker can't delegate or subcontract the work to someone else.",
  },
  {
    id: 5,
    category: "behavioral",
    irsFactor: "Sequence of work",
    question: "Do you dictate the order or sequence in which tasks must be completed?",
    yesLabel: "Yes, we set the sequence",
    noLabel: "No, they set their own order",
    riskyAnswer: "yes",
    riskyNote: "You dictate the sequence in which tasks are performed.",
  },
  {
    id: 6,
    category: "behavioral",
    irsFactor: "Progress reports",
    question: "Do you require regular check-ins, status calls, or written progress reports?",
    yesLabel: "Yes, regular check-ins required",
    noLabel: "No, just the final deliverable",
    riskyAnswer: "yes",
    riskyNote: "You require regular progress reports or check-ins, not just a final deliverable.",
  },
  {
    id: 7,
    category: "behavioral",
    irsFactor: "Exclusivity",
    question: "Do you require them to work full-time for you, or restrict them from taking other clients during the engagement?",
    yesLabel: "Yes, exclusive to us",
    noLabel: "No, they work with others too",
    riskyAnswer: "yes",
    riskyNote: "You restrict them from working with other clients while engaged with you.",
  },

  // ── Financial Control (7) ────────────────────────────────────────────────
  {
    id: 8,
    category: "financial",
    irsFactor: "Reimbursed expenses",
    question: "Do you reimburse their business or travel expenses?",
    yesLabel: "Yes, we reimburse expenses",
    noLabel: "No, they cover their own costs",
    riskyAnswer: "yes",
    riskyNote: "You reimburse their business expenses, shifting financial risk away from them.",
  },
  {
    id: 9,
    category: "financial",
    irsFactor: "Tools & equipment",
    question: "Do you supply the tools, equipment, or software they use to do the work?",
    yesLabel: "Yes, we provide the tools",
    noLabel: "No, they use their own",
    riskyAnswer: "yes",
    riskyNote: "You supply the tools or equipment used to do the work.",
  },
  {
    id: 10,
    category: "financial",
    irsFactor: "Method of payment",
    question: "Do you pay a regular wage (hourly, weekly, or monthly), rather than a flat fee per project or milestone?",
    yesLabel: "Yes, regular wage",
    noLabel: "No, flat project fee",
    riskyAnswer: "yes",
    riskyNote: "You pay a regular wage instead of a flat, per-project fee.",
  },
  {
    id: 11,
    category: "financial",
    irsFactor: "Investment in own business",
    question: "Has the worker made a real investment in their own equipment, software, or workspace?",
    yesLabel: "Yes, they've invested in their own gear",
    noLabel: "No, they only use what we give them",
    riskyAnswer: "no",
    riskyNote: "The worker has no meaningful investment of their own in tools or facilities.",
  },
  {
    id: 12,
    category: "financial",
    irsFactor: "Opportunity for profit/loss",
    question: "Can the worker earn a real profit — or take a real loss — depending on how efficiently they manage the job?",
    yesLabel: "Yes, real profit/loss risk",
    noLabel: "No, they're paid regardless",
    riskyAnswer: "no",
    riskyNote: "The worker has no real opportunity for profit or loss — they're paid the same regardless of efficiency.",
  },
  {
    id: 13,
    category: "financial",
    irsFactor: "Services to the public",
    question: "Does the worker actively market or offer their services to other clients or the general public?",
    yesLabel: "Yes, they market to others",
    noLabel: "No, we're their only client",
    riskyAnswer: "no",
    riskyNote: "The worker doesn't offer their services to anyone else in the marketplace.",
  },
  {
    id: 14,
    category: "financial",
    irsFactor: "Control over invoicing",
    question: "Do you control the billing schedule (you tell them when/how to invoice), rather than them setting their own terms?",
    yesLabel: "Yes, we control invoicing",
    noLabel: "No, they set their own terms",
    riskyAnswer: "yes",
    riskyNote: "You control the invoicing schedule instead of the worker setting their own terms.",
  },

  // ── Type of Relationship (6) ─────────────────────────────────────────────
  {
    id: 15,
    category: "relationship",
    irsFactor: "Employee benefits",
    question: "Do you provide employee-type benefits like health insurance, paid time off, or a retirement plan?",
    yesLabel: "Yes, they get benefits",
    noLabel: "No benefits provided",
    riskyAnswer: "yes",
    riskyNote: "You provide employee-type benefits such as insurance or paid time off.",
  },
  {
    id: 16,
    category: "relationship",
    irsFactor: "Permanency",
    question: "Is the relationship open-ended and ongoing, without a defined end date tied to a specific project?",
    yesLabel: "Yes, open-ended",
    noLabel: "No, tied to one project",
    riskyAnswer: "yes",
    riskyNote: "The relationship is open-ended rather than tied to a defined project or term.",
  },
  {
    id: 17,
    category: "relationship",
    irsFactor: "Core business activity",
    question: "Is the work they do a key, ongoing part of your regular business operations?",
    yesLabel: "Yes, core to our business",
    noLabel: "No, a specialized one-off need",
    riskyAnswer: "yes",
    riskyNote: "The work is a core, ongoing part of your regular business — not a specialized side project.",
  },
  {
    id: 18,
    category: "relationship",
    irsFactor: "Written IC agreement",
    question: "Do you have a signed written agreement that explicitly states this is an independent contractor relationship?",
    yesLabel: "Yes, we have one signed",
    noLabel: "No written agreement",
    riskyAnswer: "no",
    riskyNote: "There's no signed written agreement establishing the independent contractor relationship.",
  },
  {
    id: 19,
    category: "relationship",
    irsFactor: "At-will termination",
    question: "Can you end the relationship at any time, for any reason, without breaching a contract?",
    yesLabel: "Yes, end it anytime",
    noLabel: "No, only per contract terms",
    riskyAnswer: "yes",
    riskyNote: "You can terminate at any time for any reason — like an at-will employer, not a contract counterparty.",
  },
  {
    id: 20,
    category: "relationship",
    irsFactor: "Worker's right to quit",
    question: "Can the worker walk away at any time without any contractual or financial penalty — just like an employee resigning?",
    yesLabel: "Yes, no penalty to leave",
    noLabel: "No, contractual notice/penalty applies",
    riskyAnswer: "yes",
    riskyNote: "The worker can walk away at any time without contractual consequence, like a resigning employee.",
  },
];

const CATEGORY_MAX = QUESTIONS.reduce<Record<Category, number>>(
  (acc, q) => {
    acc[q.category] += 1;
    return acc;
  },
  { behavioral: 0, financial: 0, relationship: 0 }
);

function riskBand(pct: number) {
  if (pct <= 33) {
    return {
      label: "Low Risk",
      headline: "Your worker profile looks like a genuine independent contractor.",
      color: "emerald",
      textClass: "text-emerald-700",
      bgClass: "bg-emerald-50 border-emerald-200",
      barClass: "bg-emerald-500",
    };
  }
  if (pct <= 66) {
    return {
      label: "Medium Risk",
      headline: "Mixed signals — several factors lean toward employee-like control.",
      color: "amber",
      textClass: "text-amber-700",
      bgClass: "bg-amber-50 border-amber-200",
      barClass: "bg-amber-500",
    };
  }
  return {
    label: "High Risk",
    headline: "High Risk: Your worker looks like a W-2 Employee to the IRS.",
    color: "red",
    textClass: "text-red-700",
    bgClass: "bg-red-50 border-red-200",
    barClass: "bg-red-500",
  };
}

export default function IRS20PointAuditor() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});

  const totalQuestions = QUESTIONS.length;
  const currentQuestion = QUESTIONS[step];

  function startQuiz() {
    setAnswers({});
    setStep(0);
    setScreen("quiz");
  }

  function selectAnswer(value: Answer) {
    const next = { ...answers, [currentQuestion.id]: value };
    setAnswers(next);
    if (step < totalQuestions - 1) {
      setStep((s) => s + 1);
    } else {
      setScreen("result");
    }
  }

  function goBack() {
    if (step > 0) setStep((s) => s - 1);
  }

  function retake() {
    setAnswers({});
    setStep(0);
    setScreen("intro");
  }

  // ── Scoring ────────────────────────────────────────────────────────────
  const categoryRisk: Record<Category, number> = { behavioral: 0, financial: 0, relationship: 0 };
  const redFlags: string[] = [];
  QUESTIONS.forEach((q) => {
    const a = answers[q.id];
    if (a && a === q.riskyAnswer) {
      categoryRisk[q.category] += 1;
      redFlags.push(q.riskyNote);
    }
  });
  const totalRisk = categoryRisk.behavioral + categoryRisk.financial + categoryRisk.relationship;
  const totalPct = Math.round((totalRisk / totalQuestions) * 100);
  const band = riskBand(totalPct);
  const needleAngle = -90 + (totalPct / 100) * 180;

  // ═══════════════════════════════════════════════════════════════════════
  // INTRO SCREEN
  // ═══════════════════════════════════════════════════════════════════════
  if (screen === "intro") {
    return (
      <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-soft overflow-hidden">
        <div className="px-6 py-8 sm:px-10 sm:py-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-lavender/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-text-lavender mb-6 border border-primary-lavender/20">
            IRS Common-Law Test
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-text-primary mb-3 tracking-tight">
            20 questions. 3 categories. 3 minutes.
          </h2>
          <p className="text-sm text-text-primary/60 leading-relaxed mb-8 max-w-lg mx-auto">
            Answer honestly about how you actually manage this worker — not how the contract reads on paper.
            We&apos;ll score your answers against the same three categories the IRS uses to decide 1099 vs. W-2.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-left">
            {(Object.keys(CATEGORY_META) as Category[]).map((cat) => (
              <div key={cat} className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4">
                <div className="text-xl mb-1">{CATEGORY_META[cat].icon}</div>
                <p className="text-xs font-bold text-text-primary leading-snug">{CATEGORY_META[cat].label}</p>
                <p className="text-[11px] text-text-primary/50 mt-1 leading-snug">{CATEGORY_META[cat].description}</p>
              </div>
            ))}
          </div>

          <button
            onClick={startQuiz}
            className="inline-flex items-center gap-2 bg-primary-lavender hover:bg-primary-lavender-dark text-white font-bold text-base px-8 py-3.5 rounded-xl transition-all hover:-translate-y-0.5"
          >
            Start Free Assessment (3 Min) →
          </button>
          <p className="text-[11px] text-text-primary/40 mt-3">No account required · Nothing is saved or submitted anywhere</p>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════
  // QUIZ SCREEN — one question at a time
  // ═══════════════════════════════════════════════════════════════════════
  if (screen === "quiz") {
    const progressPct = Math.round((step / totalQuestions) * 100);
    const meta = CATEGORY_META[currentQuestion.category];

    return (
      <div className="max-w-2xl mx-auto">
        {/* Progress bar */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-text-primary/50">
            Question {step + 1} of {totalQuestions}
          </span>
          <span className="text-xs font-bold text-primary-lavender">{progressPct}%</span>
        </div>
        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-primary-lavender transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div key={currentQuestion.id} className="bg-white border border-gray-200 rounded-2xl shadow-soft overflow-hidden animate-in">
          <div className="flex items-center gap-2 px-6 pt-6">
            <span className="text-base">{meta.icon}</span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-text-lavender bg-primary-lavender/10 px-2.5 py-1 rounded-full">
              {meta.label}
            </span>
            <span className="text-[11px] text-text-primary/40 ml-auto">IRS factor: {currentQuestion.irsFactor}</span>
          </div>

          <div className="px-6 pt-4 pb-6">
            <p className="text-lg font-bold text-text-primary leading-snug">{currentQuestion.question}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-6 pb-6">
            <button
              onClick={() => selectAnswer("yes")}
              className="text-left border border-gray-200 hover:border-primary-lavender hover:bg-primary-lavender/5 rounded-xl px-5 py-4 transition-all group"
            >
              <span className="text-sm font-semibold text-text-primary group-hover:text-text-lavender">
                {currentQuestion.yesLabel}
              </span>
            </button>
            <button
              onClick={() => selectAnswer("no")}
              className="text-left border border-gray-200 hover:border-primary-lavender hover:bg-primary-lavender/5 rounded-xl px-5 py-4 transition-all group"
            >
              <span className="text-sm font-semibold text-text-primary group-hover:text-text-lavender">
                {currentQuestion.noLabel}
              </span>
            </button>
          </div>

          <div className="flex items-center justify-between px-6 pb-5">
            <button
              onClick={goBack}
              disabled={step === 0}
              className={`text-xs font-medium transition-colors ${
                step === 0 ? "text-gray-300 cursor-not-allowed" : "text-text-primary/50 hover:text-text-primary"
              }`}
            >
              ← Back
            </button>
            <span className="text-[11px] text-text-primary/30">Tap an option to continue</span>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════
  // RESULT SCREEN — risk gauge + category breakdown + CTA
  // ═══════════════════════════════════════════════════════════════════════
  return (
    <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-soft overflow-hidden animate-in">
      <div className={`h-1.5 w-full ${band.barClass}`} />

      {/* Gauge */}
      <div className="px-6 pt-8 pb-2 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-text-primary/40 mb-4">
          Misclassification Risk Score
        </p>
        <svg viewBox="0 0 200 115" className="w-64 sm:w-72 mx-auto">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          <path
            d="M10,100 A90,90 0 0,1 190,100"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="18"
            strokeLinecap="round"
          />
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="24"
            stroke="#1f2937"
            strokeWidth="4"
            strokeLinecap="round"
            transform={`rotate(${needleAngle} 100 100)`}
          />
          <circle cx="100" cy="100" r="8" fill="#1f2937" />
          <text x="10" y="113" fontSize="9" fontWeight="700" fill="#94a3b8">LOW</text>
          <text x="166" y="113" fontSize="9" fontWeight="700" fill="#94a3b8">HIGH</text>
        </svg>
        <p className={`text-3xl font-black mt-1 ${band.textClass}`}>{totalPct}%</p>
        <p className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border mt-2 ${band.bgClass} ${band.textClass}`}>
          {band.color === "red" ? "🚨" : band.color === "amber" ? "⚠️" : "✅"} {band.label}
        </p>
      </div>

      {/* Headline verdict */}
      <div className="px-6 pt-4 pb-6 text-center">
        <p className="text-base font-bold text-text-primary leading-snug max-w-md mx-auto">{band.headline}</p>
      </div>

      {/* Category breakdown */}
      <div className="px-6 pb-6 border-t border-gray-100 pt-6">
        <p className="text-xs font-bold uppercase tracking-wider text-text-primary/40 mb-4">Breakdown by Category</p>
        <div className="flex flex-col gap-4">
          {(Object.keys(CATEGORY_META) as Category[]).map((cat) => {
            const max = CATEGORY_MAX[cat];
            const score = categoryRisk[cat];
            const pct = Math.round((score / max) * 100);
            const catBand = riskBand(pct);
            return (
              <div key={cat}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-text-primary flex items-center gap-1.5">
                    <span>{CATEGORY_META[cat].icon}</span>
                    {CATEGORY_META[cat].label}
                  </span>
                  <span className="text-xs font-bold text-text-primary/50">{score}/{max} risk factors</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${catBand.barClass}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Red flags */}
      {redFlags.length > 0 && (
        <div className="px-6 pb-6 border-t border-gray-100 pt-6">
          <p className="text-xs font-bold uppercase tracking-wider text-text-primary/40 mb-3">
            What&apos;s driving your score
          </p>
          <div className="flex flex-col gap-2">
            {redFlags.slice(0, 6).map((note, i) => (
              <div key={i} className="flex gap-2 text-xs text-text-primary/70 leading-relaxed">
                <span className="shrink-0">🚩</span>
                <span>{note}</span>
              </div>
            ))}
            {redFlags.length > 6 && (
              <p className="text-[11px] text-text-primary/40 mt-1">+ {redFlags.length - 6} more factor(s) flagged</p>
            )}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="px-6 py-6 bg-gray-50 border-t border-gray-100 flex flex-col gap-3">
        <p className="text-xs text-text-primary/60 leading-relaxed">
          {band.color === "red"
            ? "A generic 1099 label doesn't protect you from an IRS reclassification claim. Lock in a compliant, written independent contractor agreement today."
            : "Even low-risk contractor relationships hold up better in an audit with a signed, SB 988-compliant written agreement in place."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/tools/sb988-contract-generator"
            className="inline-flex items-center justify-center gap-2 bg-primary-lavender hover:bg-primary-lavender-dark text-white font-bold text-sm px-6 py-3 rounded-xl transition-all whitespace-nowrap"
          >
            Generate a Compliant 1099 Contract →
          </Link>
          <Link
            href="/freelance-contract/california-freelance-worker-protection-act-checklist-employers"
            className="inline-flex items-center justify-center border border-gray-300 hover:border-primary-lavender text-text-primary/70 hover:text-text-lavender font-semibold text-sm px-5 py-3 rounded-xl transition-all whitespace-nowrap"
          >
            Full Employer Compliance Checklist
          </Link>
        </div>
        <button
          onClick={retake}
          className="text-xs text-text-primary/40 hover:text-text-primary/70 underline transition-colors mt-1 mx-auto"
        >
          Retake the assessment
        </button>
      </div>
    </div>
  );
}
