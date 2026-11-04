// app/tools/ca-late-payment-calculator/page.tsx
import Link from 'next/link';
import SB988PenaltyCalculator from '@/components/tools/SB988PenaltyCalculator';

export const metadata = {
  title: 'California SB 988 Late Payment Calculator',
  description: 'Calculate statutory double damages and legal fee recovery under the California Freelance Worker Protection Act (SB 988). Run your free damage estimate now.',
  alternates: {
    canonical: 'https://indielegalterms.com/tools/ca-late-payment-calculator',
  },
  openGraph: {
    title: 'California SB 988 Late Payment Calculator',
    description: 'Calculate statutory double damages and legal fee recovery under the California Freelance Worker Protection Act (SB 988). Run your free damage estimate now.',
    url: 'https://indielegalterms.com/tools/ca-late-payment-calculator',
  },
};

interface PageProps {
  searchParams: {
    scenario?: string;
    mode?: string;
  };
}

export default function CALatePaymentCalculatorPage({ searchParams }: PageProps) {
  const currentYear = "2026";
  const scenario = searchParams?.scenario;
  const mode = searchParams?.mode === 'business' || scenario === 'avoid-250-trap' ? 'business' : 'freelancer';

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'California SB 988 Statutory Penalty Calculator',
    url: 'https://indielegalterms.com/tools/ca-late-payment-calculator',
    applicationCategory: 'LegalApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Calculate statutory double damages and attorney fee recovery under the California Freelance Worker Protection Act (SB 988).',
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">

        {/* 跨链提示横幅：引导非加州用户跳转到全美通用计算器 */}
        <div className="mb-6 bg-indigo-50/80 border border-indigo-100 rounded-xl px-4 py-3 text-xs md:text-sm text-indigo-950 flex items-center justify-between shadow-xs">
          <span className="font-medium text-slate-700">
            Not working with a California client?
          </span>
          <Link
            href="/tools/late-payment-calculator"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-bold ml-2 transition-colors"
          >
            Use our all-states late payment calculator →
          </Link>
        </div>

        {/* 1. 顶部：极简 H1 */}
        <header className="mb-6 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            California SB 988 Statutory Penalty Calculator
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Instantly evaluate your total legal recovery under CA Civil Code for freelance non-payment.
          </p>
        </header>

        {/* 2. 核心交互区 */}
        <main className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-10">
          <SB988PenaltyCalculator mode={mode} scenario={scenario} />
        </main>

        {/* 3. 底部：SEO 加厚层 + 完美内链 */}
        <footer className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-slate-200 text-slate-600">

          {/* 左侧：法条硬文本 */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
              Statutory Basis Under CA SB 988
            </h2>
            <p className="text-xs leading-relaxed text-slate-500">
              Pursuant to California&apos;s Freelance Worker Protection Act (effective January 1, 2025, and fully operational in {currentYear}), any client who fails to pay a freelance worker within 30 days of the contract deadline is subject to mandatory civil penalties.
            </p>
            <p className="text-xs leading-relaxed text-slate-500">
              If the contract value totals $250 or more over a 12-month period, judges are legally required to award <strong className="text-slate-900 font-semibold">double damages (2x the unpaid invoice amount)</strong>, plus reasonable attorney fees and court costs, provided a written contract was established.
            </p>
            <p className="text-xs leading-relaxed text-slate-500">
              For a comprehensive breakdown of statutory interest rates, Labor Commissioner filing rules, and court claim strategies, consult our{' '}
              <Link href="/contracts/penalty-for-not-paying-independent-contractor-ca" className="text-indigo-600 hover:text-indigo-800 underline font-medium">
                California contractor late payment penalties guide
              </Link>.
            </p>
            {mode === 'business' && (
              <p className="text-xs leading-relaxed text-slate-500">
                If you&apos;re the hiring business running this number, it&apos;s worth confirming the underlying relationship is even a valid 1099 engagement in the first place — a misclassified worker carries exposure well beyond a single late invoice. Run our free{' '}
                <Link href="/tools/irs-20-point-checklist" className="text-slate-900 font-semibold underline hover:no-underline">
                  IRS 20-Point Worker Classification Auditor
                </Link>{' '}
                to check.
              </p>
            )}
          </div>

          {/* 右侧：高转化下一步引导块 */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-5 text-white shadow-md flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-widest mb-1">
                Next Legal Step
              </div>
              <h3 className="text-xs font-bold text-white tracking-tight">
                Calculated your damages? <br />Here is how you extract it.
              </h3>
              <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">
                Do not just email your client. You must issue a 10-day statutory notice before filing a lawsuit.
              </p>
            </div>

            {/* 指向静态页面的内链 */}
            <div className="mt-4 pt-2 border-t border-slate-700/60">
              <Link
                href="/guides/ca-contractor-small-claims"
                className="inline-flex items-center text-xs font-bold text-red-400 hover:text-red-300 transition group"
              >
                Get Small Claims Roadmap
                <span className="ml-1 transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>

        </footer>

        {/* 底部版权与合规免责 */}
        <div className="mt-8 text-center text-[10px] text-slate-400">
          IndieLegal Calculator Engine v2.1.0 • Updated for {currentYear} Courthouse Compliance. <br />
          Disclaimer: Calculations are estimates for informational purposes and do not constitute formal legal counsel.
        </div>

      </div>
    </div>
  );
}
