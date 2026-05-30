// TypeScript


import SB988PenaltyCalculator from "@/components/tools/SB988PenaltyCalculator";
import CopyCard from "@/components/CopyCard";
import { professions } from "@/data/professions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

interface Props {
  params: { slug: string };
}

// 1. 动态生成符合谷歌强审核要求的元数据 (SEO Title, Description, Canonical)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const currentProfession = professions.find((p) => p.slug === params.slug);
  
  if (!currentProfession) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pancothink.com";
  const pageUrl = `${siteUrl}/guides/${params.slug}`;
  const title = currentProfession.seoTitle || `Free CA SB 988 Contract Template for ${currentProfession.name}`;
  const description = currentProfession.seoDesc || `Get a California SB 988 compliant contract template tailored for ${currentProfession.name}. Protect your rights with mandatory 30-day payment & 2x penalty clauses.`;

  return {
    title: title,
    description: description,
    alternates: {
      canonical: pageUrl,
    },
    keywords: currentProfession.keywords,
    openGraph: {
      title: title,
      description: description,
      url: pageUrl,
      type: "article",
    },
  };
}

export async function generateStaticParams() {
  return professions.map((p) => ({
    slug: p.slug,
  }));
}

export default function GuidePage({ params }: Props) {
  const currentProfession = professions.find((p) => p.slug === params.slug);
  const nextProfession = professions.find((p) => p.slug === currentProfession?.nextSlug);

  if (!currentProfession) {
    notFound();
  }

  // 2. 注入 JSON-LD Schema (FAQPage)，让谷歌搜索结果直接展示 FAQ 列表，截爆长尾流量
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Does California SB 988 apply to freelance ${currentProfession?.name.toLowerCase()}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. If your freelance project is valued at $250 or more within a 4-month period, California's Freelance Worker Protection Act (SB 988) mandates a written contract."
        }
      },
      {
        "@type": "Question",
        "name": "What happens if a client pays a freelancer late in California?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Under SB 988, clients must pay within 30 days of project completion unless specified otherwise. Violations can entitle the freelancer to statutory double damages plus attorney fees."
        }
      }
    ]
  };

  return (
    <>
      {/* 谷歌 Schema 注入 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        <main className="flex-1">
          {/* H1 标题 */}
          <h1 className="text-3xl font-bold mb-4">
            California SB 988 Compliance Guide & Contract Template for {currentProfession.name}
          </h1>
          
          {/* 🌟 1. 迎合谷歌 YMYL 审核的深度行业痛点段落 */}
          <h2 className="text-xl font-semibold mt-6 mb-3">Why {currentProfession.name} Need SB 988 Protection</h2>
          <p className="text-gray-700 leading-relaxed text-sm">
            As a freelance {currentProfession.name.toLowerCase()} operating in California, common financial risks include <span className="font-medium text-red-600">{currentProfession.painPoint}</span>. The California Freelance Worker Protection Act (SB 988) was explicitly designed to eliminate these hazards by enforcing strict contract terms whenever your compensation reaches or exceeds $250.
          </p>

          {/* 三大硬性指标卡片 */}
          <section className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
            <h3 className="font-semibold text-lg text-yellow-800">⚠️ Mandatory Protections Breakdown:</h3>
            <ul className="list-disc list-inside mt-2 text-yellow-700 space-y-2 text-sm">
              <li><strong>$250 Mandatory Threshold:</strong> You must have a written agreement before work begins.</li>
              <li><strong>30-Day Strict Paywall:</strong> If the contract is silent, your client has 30 days to clear your invoice.</li>
              <li><strong>2x Double Damages Statutory Penalty:</strong> Clients who fail to pay on time face explicit double damages in court.</li>
            </ul>
          </section>

          {/* 🌟 2. 完美的动态合同复制区域 */}
          <h2 className="text-xl font-semibold mt-8 mb-3">Copy-Paste Free {currentProfession.ctaTitle}</h2>
          <section className="border p-6 rounded-lg bg-white shadow-sm">
            <p className="text-gray-600 mb-4 text-sm">
              Review and copy this basic statutory text. It contains the strict boilerplate language required by the State of California specifically tailored for {currentProfession.name.toLowerCase()}.
            </p>
            
            <CopyCard contractSnippet={currentProfession.contractSnippet} />
            
            {/* 漏斗转化按钮（指向付费 AI 站） */}
            <div className="mt-4">
              <Link 
                className="inline-block bg-blue-600 text-white px-5 py-2.5 rounded font-medium text-sm hover:bg-blue-700 transition" 
                href={`/tools/sb988-contract-generator?role=${currentProfession.slug}`}
              >
                Customize via Smart AI Generator (DeepSeek Powered) →
              </Link>
            </div>
          </section>

          {/* FAQ 展现层：满足 YMYL 的用户可读性要求 */}
          <h2 className="text-xl font-semibold mt-10 mb-3">Frequently Asked Questions</h2>
          <div className="space-y-4 text-sm text-gray-700">
            <div className="border-b pb-3">
              <h4 className="font-bold mb-1">Is a verbal agreement valid for a $300 gig?</h4>
              <p className="text-gray-600">No, under SB 988, any service accumulating $250 or more over 4 months strictly requires a written contract in California.</p>
            </div>
            <div className="border-b pb-3">
              <h4 className="font-bold mb-1">Can a client ask me to waive my SB 988 rights?</h4>
              <p className="text-gray-600">Any contract waiver of SB 988 rights is explicitly deemed void against public policy by California law.</p>
            </div>
          </div>

          {/* 🚀 文章末尾的强力向上链 */}
          <section className="mt-12 p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl shadow-md">
            <h3 className="text-lg font-bold mb-2">Already Facing a Late Payment Issue?</h3>
            <p className="text-xs text-gray-300 mb-4 leading-relaxed">
              Don&apos;t let clients violate your SB 988 rights. If your overdue invoice is $250 or more, use our specialized California Freelance Late Payment Calculator to generate a formal statutory demand letter.
            </p>
            <Link 
              href="/tools/sb988-late-payment-calculator"
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-xs font-bold transition shadow-sm"
            >
              Demand 2x Double Damages Now →
            </Link>
          </section>

          {/* 横向互链：织紧网状结构 */}
          {nextProfession && (
            <footer className="mt-12 pt-4 border-t text-sm text-gray-500">
              Are you working in other fields? Check our guide for{' '}
              <Link className="text-blue-500 underline font-medium hover:text-blue-600" href={`/guides/${nextProfession.slug}`}>
                {nextProfession.name}
              </Link>.
            </footer>
          )}
        </main>

        {/* 2. 右侧侧边栏：直接嵌入活生生的计算器组件，而不是纯文本链接！ */}
        <aside className="w-full md:w-80 shrink-0">
          <div className="border border-red-200 bg-red-50 p-5 rounded md:sticky md:top-4 shadow-sm">
            <h4 className="font-bold text-red-800 text-sm mb-2">
              Is a CA Client Ghosting Your Invoice?
            </h4>
            <p className="text-xs text-red-700 mb-4 leading-relaxed">
              Under SB 988, if your {currentProfession.name.toLowerCase()} contract is $250+ and 30+ days overdue, calculate your 2x statutory penalty instantly below:
            </p>
            
            {/* 🚀 这里就是解耦出来的核心组件 */}
            <div className="bg-white p-3 rounded border border-red-100 shadow-inner">
              <SB988PenaltyCalculator />
            </div>
            
            <p className="text-[10px] text-gray-400 mt-3 text-center">
              *Calculated pursuant to California Civil Code (SB 988).
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
