import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border-lavender/70 bg-white/70 text-sm text-text-primary">
      <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col leading-tight text-center md:text-left">
          <span className="text-base font-bold text-text-lavender uppercase tracking-tight">Panco</span>
          <span className="text-[9px] font-bold text-text-lavender/60 uppercase tracking-[0.2em] mt-0.5">CA FREELANCER LEGAL AI</span>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-text-primary/80">
          <Link href="/" className="hover:text-primary-lavender transition-colors">Home</Link>
          <Link href="/freelance-contract" className="hover:text-primary-lavender transition-colors">SB 988 Legal Guide Index</Link>
          <Link href="/tools/sb988-contract-generator" className="hover:text-primary-lavender transition-colors">Contract Generator</Link>
          <Link href="/tools/sb988-late-payment-calculator" className="hover:text-primary-lavender transition-colors">Penalty Calculator</Link>
          <Link href="/guides" className="hover:text-primary-lavender transition-colors">All Guides</Link>
          <Link href="/pricing" className="hover:text-primary-lavender transition-colors">Pricing</Link>
        </div>
      </div>
      <div className="border-t border-border-lavender/50 bg-bg-main/80 px-6 py-6 text-center text-xs text-text-primary/70">
        <p>© {new Date().getFullYear()} Panco Legal Assistant</p>
        <p className="mt-3 font-semibold text-text-primary max-w-2xl mx-auto">
          This site is an AI legal support tool and does not provide legal advice. Use your own judgment and consult a licensed attorney when needed.
        </p>
      </div>
    </footer>
  );
}
