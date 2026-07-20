// app/independent-contractor-laws/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { complianceSlugPages } from '@/data/stateComplianceData';

export const metadata: Metadata = {
  title: 'Independent Contractor Laws by State | PancoLegal',
  description:
    'Free 1099 vs W-2 worker classification compliance tools by state and industry. Check non-compete rules, misclassification risk, and audit exposure.',
  alternates: { canonical: 'https://www.pancothink.com/independent-contractor-laws' },
};

export default function ComplianceHubPage() {
  return (
    <div className="min-h-screen bg-bg-main">
      <section className="max-w-4xl mx-auto pt-14 pb-10 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-text-primary tracking-tight leading-tight mb-4">
          Independent Contractor Laws by State
        </h1>
        <p className="text-lg text-text-primary/70 max-w-2xl mx-auto leading-relaxed">
          Free worker classification and non-compete compliance tools, organized by state and industry.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-6 mb-12">
        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-indigo-900 font-semibold">
            Hiring in California? Use our dedicated ABC/Borello Test tool instead.
          </p>
          <Link
            href="/tools/california-independent-contractor-laws"
            className="shrink-0 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-5 py-3 rounded-xl transition-all whitespace-nowrap"
          >
            California Compliance Tool →
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {complianceSlugPages.map(({ slug, state, industry, kind }) => (
            <Link
              key={slug}
              href={`/independent-contractor-laws/${slug}`}
              className="bg-white border border-gray-200 rounded-xl px-5 py-4 hover:border-primary-lavender hover:shadow-soft transition-all"
            >
              <p className="font-bold text-text-primary text-sm">
                {industry ? `${state.stateName} · ${industry.industryName}` : state.stateName}
              </p>
              <p className="text-xs text-text-primary/50 mt-1">
                {kind === 'state' ? 'State overview' : 'Industry-specific'}
              </p>
            </Link>
          ))}
        </div>
        {complianceSlugPages.length === 0 && (
          <p className="text-sm text-text-primary/50 text-center">
            No states published yet — flip `published: true` in stateComplianceData.ts once verified.
          </p>
        )}
      </section>
    </div>
  );
}
