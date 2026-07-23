// app/compliance/[slug]/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ComplianceAuditTool from '@/components/tools/ComplianceAuditTool';
import {
  allComplianceSlugs,
  complianceSlugBySlug,
} from '@/data/stateComplianceData';

export function generateStaticParams() {
  return allComplianceSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const entry = complianceSlugBySlug.get(params.slug);
  if (!entry) return {};
  const { state, industry } = entry;
  const title = industry
    ? `${state.stateName} ${industry.industryName} 1099 Compliance Tool`
    : `${state.stateName} Independent Contractor & Employee Compliance Tool`;
  const desc = industry
    ? `Free 1099 vs W-2 risk check for ${industry.industryName.toLowerCase()} employers in ${state.stateName}.`
    : `Audit your 1099 compliance risk in ${state.stateName}. Free, instant, no sign-up required.`;
  const url = `https://indielegalterms.com/compliance/${params.slug}`;

  return {
    title: `${title} | IndieLegal`,
    description: desc,
    alternates: { canonical: url },
    openGraph: { title, description: desc, url, type: 'website' },
  };
}

export default function CompliancePage({ params }: { params: { slug: string } }) {
  const entry = complianceSlugBySlug.get(params.slug);
  if (!entry) notFound();
  const { state, industry, kind } = entry;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: state.localFaq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div id="top" className="min-h-screen bg-bg-main">
      {state.localFaq.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

      {/* Hero */}
      <section className="max-w-4xl mx-auto pt-14 pb-6 px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary-lavender/10 px-4 py-1.5 text-sm font-semibold text-text-lavender mb-6 border border-primary-lavender/20">
          {state.stateName} · Risk level: {state.riskLevel}
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-text-primary tracking-tight leading-tight mb-4">
          {industry ? `${state.stateName} ${industry.industryName}` : state.stateName}
          <br />
          <span className="text-2xl md:text-3xl font-bold text-text-primary/60">
            Independent Contractor &amp; 1099 Compliance Tool
          </span>
        </h1>
        <p className="text-lg text-text-primary/70 max-w-2xl mx-auto mb-10 leading-relaxed">
          Check your worker classification risk in {state.stateName} in under 2 minutes. Free, no sign-up required.
        </p>
      </section>

      {/* Tool */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <ComplianceAuditTool state={state} industry={industry} />
      </section>

      {/* Non-compete section — only render if verified */}
      {state.nonCompete.status !== 'unverified' && (
        <section className="max-w-4xl mx-auto px-6 mb-16">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 text-sm text-text-primary/70 leading-relaxed">
            <h2 className="text-2xl font-black text-text-primary mb-3 tracking-tight">
              Non-Compete Rules for Independent Contractors in {state.stateName}
            </h2>
            <p>{state.nonCompete.summary}</p>
            {state.nonCompete.citation && (
              <p className="mt-3 text-xs text-text-primary/40">
                Citation: {state.nonCompete.citation} · Last verified {state.nonCompete.lastVerified}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Industry alert */}
      {industry && (
        <section className="max-w-4xl mx-auto px-6 mb-16">
          <div className="bg-orange-50 border border-orange-200 rounded-2xl px-6 py-5 text-sm text-orange-900">
            {industry.industryAlert}
          </div>
        </section>
      )}

      {/* FAQ */}
      {state.localFaq.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 mb-24">
          <h2 className="text-2xl font-black text-text-primary mb-6 tracking-tight">
            Common questions about {state.stateName} worker classification
          </h2>
          <div className="space-y-3">
            {state.localFaq.map(({ q, a }) => (
              <details key={q} className="group bg-white border border-gray-200 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none select-none hover:bg-gray-50 transition-colors">
                  <span className="font-semibold text-sm text-text-primary leading-snug">{q}</span>
                  <span className="shrink-0 text-primary-lavender text-lg leading-none group-open:rotate-45 transition-transform duration-200">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5 pt-1">
                  <p className="text-sm text-text-primary/65 leading-relaxed">{a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Cross-links */}
      <section className="max-w-4xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/compliance"
            className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary-lavender hover:shadow-soft transition-all"
          >
            <p className="font-bold text-text-primary text-sm mb-1">Browse all states →</p>
            <p className="text-xs text-text-primary/60">See classification rules for every published state.</p>
          </Link>
          {kind === 'state-industry' && (
            <Link
              href={`/compliance/${state.slug}`}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary-lavender hover:shadow-soft transition-all"
            >
              <p className="font-bold text-text-primary text-sm mb-1">All {state.stateName} rules →</p>
              <p className="text-xs text-text-primary/60">Full state-level compliance overview.</p>
            </Link>
          )}
          {state.slug !== 'california' && (
            <Link
              href="/tools/ca-contractor-laws"
              className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary-lavender hover:shadow-soft transition-all"
            >
              <p className="font-bold text-text-primary text-sm mb-1">California rules (ABC Test) →</p>
              <p className="text-xs text-text-primary/60">The strictest state test in the country.</p>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
