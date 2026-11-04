// app/tools/late-payment-calculator/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import LatePaymentCalculator from '@/components/tools/LatePaymentCalculator';

export const metadata: Metadata = {
  title: 'Freelance Late Payment Interest Calculator',
  description: 'Calculate commercial late payment interest, overdue fees, and grace period terms on freelance invoices across US states. Calculate your total claim today.',
  alternates: {
    canonical: 'https://indielegalterms.com/tools/late-payment-calculator',
  },
  openGraph: {
    title: 'Freelance Late Payment Interest Calculator',
    description: 'Calculate commercial late payment interest, overdue fees, and grace period terms on freelance invoices across US states. Calculate your total claim today.',
    url: 'https://indielegalterms.com/tools/late-payment-calculator',
  },
};

export default function UniversalLatePaymentCalculatorPage() {
  const currentYear = "2026";

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Independent Contractor Late Payment Calculator',
    url: 'https://indielegalterms.com/tools/late-payment-calculator',
    applicationCategory: 'LegalApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Calculate standard commercial late payment interest, grace periods, and overdue invoice fees for freelance contracts across US states.',
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">

        {/* 跨链提示横幅：加州客户专项指引 */}
        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs md:text-sm text-amber-950 flex items-center justify-between shadow-xs">
          <span className="font-medium text-amber-900">
            Working with a California client?
          </span>
          <Link
            href="/tools/ca-late-payment-calculator"
            className="inline-flex items-center text-amber-800 hover:text-amber-950 font-bold ml-2 transition-colors"
          >
            SB 988 mandates 30-day deadlines & 2x statutory damages →
          </Link>
        </div>

        {/* 1. Hero / H1 */}
        <header className="mb-6 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Independent Contractor Late Payment Calculator
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Calculate standard commercial late payment interest and overdue fees for freelance contracts nationwide.
          </p>
        </header>

        {/* 2. 核心计算器交互组件 */}
        <main className="mb-10">
          <LatePaymentCalculator />
        </main>

        {/* 3. 底部 SEO 层 + 通用 Net 30/60 账期知识区 */}
        <footer className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-slate-200 text-slate-600">

          {/* 左侧：通用 Net 30 / Net 60 商业计息说明 */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
              Commercial Late Payment Terms & Standard Practices
            </h2>
            <p className="text-xs leading-relaxed text-slate-500">
              In standard independent contractor agreements across the United States, commercial invoice terms usually specify <strong className="text-slate-900 font-semibold">Net 30</strong> or <strong className="text-slate-900 font-semibold">Net 60</strong> payment schedules. Standard commercial interest rates range between 1.0% and 1.5% per month (12% to 18% APR) on past-due balances.
            </p>
            <p className="text-xs leading-relaxed text-slate-500">
              To legally enforce late fee interest on client invoices, contract terms should explicitly state the grace period, monthly interest rate, and right to recover collection costs. Ensure your contract includes clear late payment provisions before starting client engagements.
            </p>
            <p className="text-xs leading-relaxed text-slate-500">
              Operating in California? State statutory law supersedes generic commercial grace periods under the{' '}
              <Link href="/contracts/ca-1099-contractor-30-day-payment-rule" className="text-indigo-600 font-semibold underline hover:no-underline">
                California 30-day contractor payment rule
              </Link>.
            </p>
            <p className="text-xs leading-relaxed text-slate-500">
              Need a fully compliant, enforceable agreement for your freelance work? Generate a custom agreement with our{' '}
              <Link href="/contracts/generator" className="text-indigo-600 font-semibold underline hover:no-underline">
                Independent Contractor Agreement Generator
              </Link>.
            </p>
          </div>

          {/* 右侧：合同生成与催款下一步 */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-xl p-5 text-white shadow-md flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono text-indigo-300 font-bold uppercase tracking-widest mb-1">
                Contract Protection
              </div>
              <h3 className="text-xs font-bold text-white tracking-tight">
                Protect Your Future Invoices <br />With Enforceable Terms
              </h3>
              <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">
                Add standard Net 30 late fee clauses and explicit payment milestone deadlines directly into your contracts.
              </p>
            </div>

            <div className="mt-4 pt-2 border-t border-slate-700/60">
              <Link
                href="/contracts/generator"
                className="inline-flex items-center text-xs font-bold text-indigo-300 hover:text-indigo-200 transition group"
              >
                Generate Contractor Agreement
                <span className="ml-1 transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>

        </footer>

        {/* 底部版权与免责 */}
        <div className="mt-8 text-center text-[10px] text-slate-400">
          IndieLegal Calculator Engine v2.1.0 • Updated for {currentYear} Commercial Compliance. <br />
          Disclaimer: Calculations are reference estimates for informational purposes and do not constitute formal legal counsel.
        </div>

      </div>
    </div>
  );
}