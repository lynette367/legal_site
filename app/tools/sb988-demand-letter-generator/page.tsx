import type { Metadata } from "next";
import Link from "next/link";
import DemandLetterGenerator from "@/components/tools/DemandLetterGenerator";

export const metadata: Metadata = {
  title: "Free SB 988 Demand Letter Generator | California Freelance Late Payment",
  description:
    "Generate a formal California SB 988 payment demand letter in minutes. Cite the 30-day payment rule and double damages, and get a ready-to-send letter for $4.99.",
  alternates: {
    canonical: "https://www.pancothink.com/tools/sb988-demand-letter-generator",
  },
};

export default function DemandLetterGeneratorPage() {
  return (
    <main className="bg-bg-main min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold text-text-primary mb-3">
          SB 988 Demand Letter Generator
        </h1>
        <p className="text-text-lavender max-w-xl mx-auto">
          If a California client hasn&apos;t paid within 30 days, SB 988 gives you the right to
          demand payment — and pursue double damages if they refuse. Answer a few questions and
          get a formal letter ready to send, for $4.99.
        </p>
      </div>
      <DemandLetterGenerator />
      <p className="max-w-3xl mx-auto text-xs text-text-lavender mt-6 text-center">
        This tool generates a draft letter for informational purposes and is not a substitute for
        advice from a licensed attorney.
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
            href="/tools/sb988-contract-generator"
            className="shrink-0 inline-flex items-center gap-2 bg-primary-lavender hover:bg-primary-lavender-dark text-white font-bold text-sm px-6 py-3 rounded-xl transition-all whitespace-nowrap"
          >
            📝 Generate Contract →
          </Link>
        </div>
      </div>
    </main>
  );
}
