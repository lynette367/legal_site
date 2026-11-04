import type { Metadata } from "next";
import Link from "next/link";
import DemandLetterGenerator from "@/components/tools/DemandLetterGenerator";

export const metadata: Metadata = {
  title: "Free Independent Contractor Demand Letter Template — Past Due Invoice",
  description:
    "Create a professional past-due invoice demand letter for freelance work. Give your client formal notice before taking further action. Free, no account required.",
  alternates: {
    canonical: "https://indielegalterms.com/tools/demand-letter-generator",
  },
  openGraph: {
    title: "Free Independent Contractor Demand Letter Template — Past Due Invoice",
    description:
      "Create a professional past-due invoice demand letter for freelance work. Give your client formal notice before taking further action. Free, no account required.",
    url: "https://indielegalterms.com/tools/demand-letter-generator",
  },
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Write a Past-Due Invoice Demand Letter for Freelancers",
  "description": "Step-by-step process for generating and serving an enforceable commercial demand letter for unpaid independent contractor invoices nationwide.",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Establish Contractual Payment Terms",
      "text": "Document the agreed Net 30 or Net 60 payment terms, invoice date, and project completion proof."
    },
    {
      "@type": "HowToStep",
      "name": "Draft Formal Notice of Breach",
      "text": "State the exact outstanding balance, applicable late payment fees, and payment deadline."
    },
    {
      "@type": "HowToStep",
      "name": "Deliver via Tracked Method",
      "text": "Send the formal demand letter with delivery confirmation before escalating to collections or small claims litigation."
    }
  ]
};

export default function DemandLetterGeneratorPage() {
  return (
    <main className="bg-bg-main min-h-screen py-12 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <div className="max-w-3xl mx-auto mb-8">

        {/* 跨链提示横幅：加州客户专项指引 */}
        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs md:text-sm text-amber-950 flex items-center justify-between shadow-xs">
          <span className="font-medium text-amber-900">
            Working with a California client?
          </span>
          <Link
            href="/tools/ca-demand-letter-template"
            className="inline-flex items-center text-amber-800 hover:text-amber-950 font-bold ml-2 transition-colors"
          >
            Get SB 988 statutory protections and double damages →
          </Link>
        </div>

        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-text-primary mb-3">
            Freelance Demand Letter Template
          </h1>
          <p className="text-text-lavender max-w-xl mx-auto">
            Generate a professional past-due invoice demand letter for freelance and independent contractor work across all US states. Give your client formal written notice before taking collection or legal action.
          </p>
        </div>
      </div>

      <DemandLetterGenerator />

      <p className="max-w-3xl mx-auto text-xs text-text-lavender mt-6 text-center leading-relaxed">
        This tool generates a draft letter for informational purposes and is not a substitute for
        advice from a licensed attorney. Review our compliance guide on{' '}
        <Link
          href="/contracts/california-freelance-contract-requirements-2026"
          className="text-primary-lavender hover:underline font-semibold"
        >
          California freelance contract requirements
        </Link>{' '}
        to protect future engagements.
      </p>

      {/* ── Cross-link: Contract Generator ── */}
      <div className="max-w-3xl mx-auto mt-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-primary-lavender/5 border border-primary-lavender/20 rounded-2xl px-7 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary-lavender mb-1">
              Prevent past-due invoices next time
            </p>
            <p className="text-sm text-text-primary font-semibold leading-snug">
              Draft an enforceable independent contractor agreement before your next project — lock in payment terms and late interest fees upfront.
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
