// components/contracts/PenaltyGuideDeepContent.tsx
// Authoritative legal guide for California contractor late payment penalties (SB 988 & Civil Code 3289)

import Link from "next/link";

export default function PenaltyGuideDeepContent() {
  return (
    <section className="bg-white border-y border-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-14 space-y-16">

        {/* ── Module 1: California SB 988 Statutory Penalties ── */}
        <div>
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-lavender bg-primary-lavender/10 px-3 py-1 rounded-full">
              Statutory Penalties · SB 988
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-text-primary mt-3 tracking-tight">
              California SB 988 Penalties: Damages Up to Twice the Unpaid Amount
            </h2>
            <p className="text-base text-gray-600 mt-2 max-w-3xl leading-relaxed">
              Enacted under Senate Bill 988 and codified in the California Business and Professions
              Code (Sections 18100–18107), the Freelance Worker Protection Act establishes strict
              remedies against hiring parties that delay or withhold earned compensation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-2xl mb-3 block">📋</span>
                <h3 className="text-base font-bold text-text-primary mb-2">
                  The $250 Contract Threshold
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Under California Business and Professions Code Section 18103, a formal written
                  contract is mandatory whenever a single contract reaches $250, or cumulative
                  contracts with the same hiring party over the preceding 120 days reach $250.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200/60 text-xs font-semibold text-gray-500">
                Cal. Bus. &amp; Prof. Code § 18103
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-2xl mb-3 block">⏱️</span>
                <h3 className="text-base font-bold text-text-primary mb-2">
                  Strict 30-Day Payment Deadline
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Under Section 18102, payment is due on or before the contractually agreed date. When
                  no payment date is specified in the contract, payment is required within 30 days
                  after services are completed.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200/60 text-xs font-semibold text-gray-500">
                Cal. Bus. &amp; Prof. Code § 18102
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-2xl mb-3 block">⚖️</span>
                <h3 className="text-base font-bold text-text-primary mb-2">
                  Up to Twice the Unpaid Amount
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Under Section 18106(a)(2), a court may award statutory damages up to twice the
                  unpaid amount that remained outstanding at the payment deadline, alongside
                  mandatory reasonable attorney fees and litigation costs.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200/60 text-xs font-semibold text-gray-500">
                Cal. Bus. &amp; Prof. Code § 18106
              </div>
            </div>
          </div>

          <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-7 text-sm text-blue-950 leading-relaxed space-y-3">
            <h4 className="text-base font-bold text-blue-900 flex items-center gap-2">
              <span>📌</span> Additional Statutory Protections Under SB 988
            </h4>
            <ul className="list-disc list-inside space-y-2 text-blue-900/80">
              <li>
                <strong>$1,000 Refusal Penalty (Section 18106(a)(1)):</strong> If a freelance worker
                requested a written contract prior to commencing work and the hiring party refused,
                the court shall award an additional statutory penalty of $1,000.
              </li>
              <li>
                <strong>Prohibition Against Coercive Discounts (Section 18102):</strong> Once work has
                begun, a hiring party is legally prohibited from requiring a contractor to accept
                reduced payment or modify terms as a condition of receiving timely compensation.
              </li>
              <li>
                <strong>Statutory Anti-Waiver Rule (Section 18107):</strong> Any contractual clause
                attempting to waive SB 988 rights or exempt an employer from statutory liability is
                void as contrary to California public policy.
              </li>
            </ul>
          </div>
        </div>

        {/* ── Module 2: Statutory Interest on Unpaid Invoices ── */}
        <div>
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-lavender bg-primary-lavender/10 px-3 py-1 rounded-full">
              Legal Interest · Civil Code § 3289
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-text-primary mt-3 tracking-tight">
              Prejudgment Interest: California Civil Code § 3289(b) 10% Statutory Rate
            </h2>
            <p className="text-base text-gray-600 mt-2 max-w-3xl leading-relaxed">
              In addition to SB 988 statutory damages, unpaid independent contractors are entitled to
              prejudgment interest on breach of contract under California law.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="bg-white border border-gray-200 rounded-2xl p-7 space-y-4">
              <h3 className="text-lg font-bold text-text-primary">
                Legal Rules Governing Late Payment Interest
              </h3>
              <ul className="space-y-3 text-sm text-gray-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-primary-lavender font-bold">1.</span>
                  <span>
                    <strong>Statutory 10% Rate:</strong> Under California Civil Code Section 3289(b),
                    when no legal interest rate is specified in the contract, unpaid obligations bear
                    interest after breach at 10% per annum simple interest.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-lavender font-bold">2.</span>
                  <span>
                    <strong>Accrual Start Date:</strong> Statutory interest begins accruing on the
                    date of breach — specifically, the day after the agreed payment date, or the 31st
                    day following service delivery when no date was specified.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-lavender font-bold">3.</span>
                  <span>
                    <strong>No Unilateral Compounding:</strong> Under California Civil Code Section
                    1916-2, statutory interest is calculated as simple interest; compound interest
                    requires express mutual written consent in the underlying agreement.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-900 rounded-2xl p-7 text-white space-y-5">
              <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Daily Statutory Interest Formula
                </p>
                <span className="text-xs font-mono text-emerald-400 font-semibold">Civ. Code § 3289(b)</span>
              </div>
              <div className="bg-gray-800/80 rounded-xl p-4 font-mono text-xs leading-relaxed text-gray-200 space-y-2">
                <p className="text-primary-lavender font-bold">
                  Daily Interest = (Unpaid Principal × 10%) ÷ 365
                </p>
                <p className="text-gray-400">
                  Total Exposure = Unpaid Principal + Statutory Damages (up to 2×) + (Daily Interest × Days Overdue) + Legal Costs
                </p>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                For example, on an overdue $5,000 invoice delayed by 90 days past the statutory
                deadline, statutory simple interest totals approximately $123.29, on top of
                potential statutory damages up to twice the unpaid amount.
              </p>
              <Link
                href="/tools/late-payment-calculator"
                className="inline-flex items-center justify-center w-full bg-primary-lavender hover:bg-primary-lavender-dark text-white font-bold text-xs py-3 rounded-xl transition-all"
              >
                Launch California Late Payment Calculator →
              </Link>
            </div>
          </div>
        </div>

        {/* ── Module 3: Three-Step Recovery Process ── */}
        <div>
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-lavender bg-primary-lavender/10 px-3 py-1 rounded-full">
              Action Plan · Step-by-Step
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-text-primary mt-3 tracking-tight">
              Three-Step Recovery Process: From Formal Demand to Court Judgment
            </h2>
            <p className="text-base text-gray-600 mt-2 max-w-3xl leading-relaxed">
              When an invoice surpasses the 30-day statutory threshold without payment, contractors
              can follow this systematic three-step recovery protocol under California law.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 font-black flex items-center justify-center text-sm mb-4">
                  01
                </div>
                <h3 className="text-base font-bold text-text-primary mb-2">
                  Send Formal 10-Day SB 988 Demand Letter
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  Serve a formal written demand citing California Business and Professions Code
                  Section 18102, itemizing the principal balance, accrued 10% statutory interest, and
                  formal notice of potential exposure up to twice the unpaid amount if unpaid within
                  10 calendar days.
                </p>
              </div>
              <Link
                href="/tools/ca-demand-letter-template"
                className="inline-flex items-center text-xs font-bold text-primary-lavender hover:underline pt-3 border-t border-gray-100"
              >
                Generate California Demand Letter →
              </Link>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-black flex items-center justify-center text-sm mb-4">
                  02
                </div>
                <h3 className="text-base font-bold text-text-primary mb-2">
                  File Administrative Notice with DLSE
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  Under Section 18106(b), the California Labor Commissioner’s Office (Division of
                  Labor Standards Enforcement / DLSE) and public prosecutors possess statutory
                  authority to investigate hiring party non-compliance and initiate civil enforcement
                  actions against repeat violators.
                </p>
              </div>
              <div className="text-xs font-semibold text-gray-400 pt-3 border-t border-gray-100">
                Cal. Bus. &amp; Prof. Code § 18106(b)
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-black flex items-center justify-center text-sm mb-4">
                  03
                </div>
                <h3 className="text-base font-bold text-text-primary mb-2">
                  California Small Claims Court ($12,500 Limit)
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  Under California Code of Civil Procedure Section 116.221, sole proprietors and
                  natural persons may claim up to $12,500 in Small Claims Court ($6,250 for
                  corporations/LLCs). Under Section 116.530, attorneys are strictly prohibited from
                  representing parties at the initial trial hearing.
                </p>
              </div>
              <Link
                href="/guides/ca-contractor-small-claims"
                className="inline-flex items-center text-xs font-bold text-primary-lavender hover:underline pt-3 border-t border-gray-100"
              >
                Read Small Claims Court Guide →
              </Link>
            </div>
          </div>
        </div>

        {/* ── Module 4: Contextual Legal Hub Navigation ── */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-text-primary">
                California 1099 Payment Compliance &amp; Contracts Hub
              </h3>
              <p className="text-sm text-gray-600 max-w-2xl leading-relaxed">
                Protect your engagements before disputes occur. Ensure your agreements include
                statutory 30-day payment schedules, itemized deliverables, and enforceable SB 988
                clauses.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold">
                <Link
                  href="/contracts/ca-1099-contractor-30-day-payment-rule"
                  className="text-primary-lavender hover:underline"
                >
                  → California 30-Day Payment Rule Guide
                </Link>
                <Link
                  href="/contracts/california-independent-contractor-agreement-template"
                  className="text-primary-lavender hover:underline"
                >
                  → SB 988 Compliant Contractor Agreement
                </Link>
                <Link
                  href="/tools/ca-contractor-laws"
                  className="text-primary-lavender hover:underline"
                >
                  → California Contractor Laws Compliance Checker
                </Link>
              </div>
            </div>
            <Link
              href="/contracts/generator"
              className="shrink-0 bg-primary-lavender hover:bg-primary-lavender-dark text-white font-bold text-xs px-6 py-3.5 rounded-xl transition-all shadow-sm whitespace-nowrap text-center"
            >
              Generate Compliant Agreement →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
