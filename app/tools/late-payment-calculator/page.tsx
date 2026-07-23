// app/tools/late-payment-calculator/page.tsx
import Link from 'next/link';
import SB988PenaltyCalculator from '@/components/tools/SB988PenaltyCalculator'; //

export const metadata = {
  title: 'California SB 988 Late Payment & Double Damages Calculator (2026)', //
  description: 'Calculate your statutory 2x double damages and attorney fees under the California Freelance Worker Protection Act (SB 988). Free compliance enforcement tool.', //[cite: 7]
  alternates: {
    canonical: 'https://indielegalterms.com/tools/late-payment-calculator', //[cite: 7]
  },
};

interface PageProps {
  searchParams: {
    scenario?: string;
    mode?: string;
  };
}

export default function SB988LatePaymentCalculatorPage({ searchParams }: PageProps) {
  const currentYear = "2026";
  const scenario = searchParams?.scenario;
  const mode = searchParams?.mode === 'business' || scenario === 'avoid-250-trap' ? 'business' : 'freelancer';

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">

        {/* 1. 顶部：极简 H1（告诉不耐烦的用户：你来对地方了，直接算） */}
        <header className="mb-6 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            California SB 988 Statutory Penalty Calculator
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Instantly evaluate your total legal recovery under CA Civil Code for freelance non-payment.
          </p>
        </header>

        {/* 2. 核心交互区：依然顶在首屏，不耽误不耐烦的消费者一秒钟 */}
        <main className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-10">
          <SB988PenaltyCalculator mode={mode} scenario={scenario} />
        </main>

        {/* 3. 🚨 底部：SEO 加厚层 + 完美内链（Google 蜘蛛的肥肉，算完账用户的救生圈） */}
        <footer className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-slate-200 text-slate-600">

          {/* 左侧：法条硬文本（彻底干掉 Thin Content） */}
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

          {/* 右侧：高转化下一步引导块（完美内链缝合） */}
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

            {/* 指向新静态页面的高亮内链 */}
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