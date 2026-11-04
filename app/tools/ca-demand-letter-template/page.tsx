import type { Metadata } from "next";
import Link from "next/link";
import DemandLetterGenerator from "@/components/tools/DemandLetterGenerator";

export const metadata: Metadata = {
  title: "CA SB 988 Freelance Demand Letter Template",
  description:
    "Draft a formal California SB 988 demand letter for unpaid freelance invoices. Enforce 30-day statutory payment and double damages with our free tool.",
  alternates: {
    canonical: "https://indielegalterms.com/tools/ca-demand-letter-template",
  },
  openGraph: {
    title: "CA SB 988 Freelance Demand Letter Template",
    description:
      "Draft a formal California SB 988 demand letter for unpaid freelance invoices. Enforce 30-day statutory payment and double damages with our free tool.",
    url: "https://indielegalterms.com/tools/ca-demand-letter-template",
  },
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Send a California SB 988 Demand Letter for Unpaid Freelance Invoices",
  "description": "Step-by-step guide to drafting and serving a formal California SB 988 payment demand letter to collect past-due freelance compensation and statutory damages.",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Verify 30-Day Payment Deadline",
      "text": "Confirm that your invoice is at least 31 days overdue under California Business and Professions Code § 18102 or past the agreed contractual payment date."
    },
    {
      "@type": "HowToStep",
      "name": "Calculate Principal and Statutory Penalties",
      "text": "Itemize the unpaid invoice principal, 10% statutory interest under Civil Code § 3289(b), and statutory damages up to twice the unpaid amount under Business and Professions Code § 18106."
    },
    {
      "@type": "HowToStep",
      "name": "Serve the 10-Day Formal Demand",
      "text": "Serve the demand letter via certified mail or tracked electronic delivery providing the client a 10-day cure period before filing in Small Claims Court."
    }
  ]
};

export default function CADemandLetterTemplatePage() {
  return (
    <main className="bg-bg-main min-h-screen py-12 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <div className="max-w-3xl mx-auto mb-8">

        {/* 跨链提示横幅：引导非加州用户跳转到通用版模板 */}
        <div className="mb-6 bg-indigo-50/80 border border-indigo-100 rounded-xl px-4 py-3 text-xs md:text-sm text-indigo-950 flex items-center justify-between shadow-xs">
          <span className="font-medium text-slate-700">
            Not a California client?
          </span>
          <Link
            href="/tools/demand-letter-generator"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-bold ml-2 transition-colors"
          >
            Use our universal demand letter template →
          </Link>
        </div>

        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-text-primary mb-3">
            SB 988 Demand Letter Template
          </h1>
          <p className="text-text-lavender max-w-xl mx-auto">
            If a California client hasn&apos;t paid within 30 days, SB 988 gives you the right to
            demand payment — and pursue double damages if they refuse. Answer a few questions and
            get a formal letter ready to send, for $4.99.
          </p>
        </div>
      </div>

      <DemandLetterGenerator />

      <p className="max-w-3xl mx-auto text-xs text-text-lavender mt-6 text-center leading-relaxed">
        This tool generates a draft letter for informational purposes and is not a substitute for
        advice from a licensed attorney. Review our step-by-step guidance on{' '}
        <Link
          href="/contracts/client-refuses-to-pay-freelance-invoice-california"
          className="text-primary-lavender hover:underline font-semibold"
        >
          what to do when a client refuses to pay
        </Link>{' '}
        under California SB 988.
      </p>

      {/* ── Cross-link: Contract Generator ── */}
      <div className="max-w-3xl mx-auto mt-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-primary-lavender/5 border border-primary-lavender/20 rounded-2xl px-7 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary-lavender mb-1">
              Prevent this next time
            </p>
            <p className="text-sm text-text-primary font-semibold leading-snug">
              Use a California SB 988-compliant contract before the next project — lock in payment terms and double-damage protections upfront.
            </p>
          </div>
          <Link
            href="/contracts/generator"
            className="shrink-0 inline-flex items-center gap-2 bg-primary-lavender hover:bg-primary-lavender-dark text-white font-bold text-sm px-6 py-3 rounded-xl transition-all whitespace-nowrap"
          >
            📝 Generate Contract →
          </Link>
        </div>
      </div>
    </main>
  );
}
