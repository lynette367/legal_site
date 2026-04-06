import Link from "next/link";
import LegalAIModule from "@/components/modules/LegalAIModule";

export const metadata = {
  title: "Free AI Compliance Tools for California Small Business | Panco",
  description: "Instant AI tools for BOI reporting, AI copyright, and CCPA compliance. Built for California creators and small business owners.",
  alternates: {
    canonical: 'https://pancothink.com',
  },
  openGraph: {
    title: "Free AI Compliance Tools for California",
    description: "Simplify your business compliance in 3 clicks.",
    url: 'https://pancothink.com',
    siteName: 'Panco',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "California AI Compliance Helper",
    images: ['/og-image.png'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

const modules = [
  { name: "CCPA Compliance Checker", href: "/tools/ccpa-checker", desc: "Instant breach risk analysis & legal notification generator" },
  { name: "Instant Answers", href: "/legal-qa", desc: "Instantly classify issues and surface risk points" },
  { name: "Risk Detector", href: "/explain", desc: "Clause meaning plus risk alerts" },
  { name: "AI Dispute Plan", href: "/dispute", desc: "Action path, evidence checklist, and risks" },
  { name: "Smart Drafting", href: "/documents", desc: "Complaint/defense/complaint letter drafts" },
  { name: "Contract Generator", href: "/contracts", desc: "Lease/labor/partnership/NDA templates" },
];

export default function HomePage() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="mx-auto max-w-4xl pt-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary-lavender/10 px-4 py-1.5 text-sm font-semibold text-text-lavender mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-lavender opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-lavender"></span>
          </span>
          California Small Business Support
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-text-primary sm:text-6xl mb-6">
          Simplify Small Business <br />
          <span className="text-primary-lavender">Compliance with AI</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-text-primary/70 leading-relaxed mb-10">
          Instant compliance tools for California entrepreneurs. From AI copyright filings to CCPA data breach letters—no legal background required.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="https:boi.pancothink.com"
            className="rounded-xl bg-primary-lavender px-8 py-4 text-lg font-bold text-white shadow-lg shadow-primary-lavender/25 transition hover:bg-primary-lavender-dark hover:-translate-y-0.5"
          >
            Start 2025 BOI Filing
          </Link>
          <Link
            href="/tools/ccpa-checker"
            className="rounded-xl border border-primary-lavender/30 bg-primary-lavender/5 px-8 py-4 text-lg font-bold text-primary-lavender transition hover:bg-primary-lavender/10 hover:-translate-y-0.5"
          >
            CCPA Breach Tool
          </Link>
          <Link
            href="/legal-qa"
            className="rounded-xl border border-border-lavender bg-white px-8 py-4 text-lg font-semibold text-text-primary transition hover:border-primary-lavender hover:bg-bg-card"
          >
            Try Free AI Legal Assistant
          </Link>
        </div>
      </section>

      {/* Main Module - Section 2 */}
      <section className="relative">
        <div className="absolute inset-0 bg-primary-lavender/5 -skew-y-3 rounded-[3rem] -z-10 transform scale-105"></div>
        <LegalAIModule />
      </section>

      {/* Advanced Modules - Section 3 */}
      <section className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-text-primary">Comprehensive Support</h2>
          <p className="text-sm text-text-primary/60 mt-1">Advanced AI toolkits for every legal dimension</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col p-5 rounded-2xl border border-border-lavender/40 bg-white/50 grayscale hover:grayscale-0 transition-all duration-300 hover:border-primary-lavender/40 hover:bg-white hover:shadow-soft group"
            >
              <h3 className="text-sm font-bold text-text-primary group-hover:text-primary-lavender">{item.name}</h3>
              <p className="mt-1 text-xs text-text-primary/60 line-clamp-2">{item.desc}</p>
              <div className="mt-4 flex items-center text-[10px] font-bold text-text-lavender opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
                Explore Tool <span className="ml-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

