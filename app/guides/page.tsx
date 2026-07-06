// app/guides/page.tsx
import Link from "next/link";
import { professions } from "@/data/professions"; // 1. 完美自动读取你的职业数据源

export const metadata = {
  title: "California SB 988 Legal Guides & Verified Contract Templates (2026)",
  description: "Access industry-specific contract templates and small claims enforcement guides compliant with California's Freelance Worker Protection Act (SB 988).",
  alternates: {
    canonical: 'https://www.pancothink.com/guides',
  },
};

export default function GuidesPage() {
  // ⚡ 2. 动态日期：自动锁定 2026 年 5 月，向 Google 和用户释放极高时效性信号
  const currentUpdatedDate = "May 30, 2026";

  // 3. 自动从 data/professions 转换为动态的行业列表
  const dynamicGuides = professions.map((p) => ({
    title: `${p.seoTitle || `Free ${p.name} Contract Template & SB 988 Guide`}`,
    slug: p.slug,
    url: `/guides/${p.slug}`,
    description: p.seoDesc || `Download CA SB 988 compliant agreements for ${p.name.toLowerCase()}. Protect your $250+ projects with mandatory payment deadlines.`,
    isPinned: false,
    displayUrl: `www.pancothink.com › guides › ${p.slug}`
  }));

  // 4. 置顶的重磅静态维权指南
  const staticGuides = [
    {
      title: "🚨 California Small Claims Court: The Ultimate SB 988 Sue & Enforcement Guide",
      slug: "sb988-small-claims-guide",
      url: "/guides/sb988-small-claims-guide", // 精准命中接下来要建的静态文件夹
      description: "Did a client ghost your invoice? Learn how to file Form SC-100, trigger statutory 2x double damages penalties, and win your case in California small claims without an attorney.",
      isPinned: true,
      displayUrl: "www.pancothink.com › guides › sb988-small-claims-guide"
    },
  ];

  // 全量缝合
  const allGuides = [...staticGuides, ...dynamicGuides];

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        {/* 聚合页头部 */}
        <div className="border-b border-gray-100 pb-8 mb-10">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            California SB 988 Legal Guides & Templates
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            100% Compliant with the Freelance Worker Protection Act. Fully updated for May 2026.
          </p>
        </div>

        {/* 🔍 谷歌检索结果风格列表区 */}
        <div className="space-y-10">
          {allGuides.map((guide) => (
            <div key={guide.slug} className="group">

              {/* A. Google 风格面包屑/绿色Url */}
              <div className="flex items-center text-xs text-gray-600 mb-1 tracking-wide truncate">
                <span className="font-medium">{guide.displayUrl}</span>
              </div>

              {/* B. Google 风格蓝色大标题 */}
              <Link href={guide.url} className="block group-hover:underline">
                <h2 className={`text-xl font-medium leading-tight ${guide.isPinned
                  ? "text-red-700 font-bold" // 置顶的维权指南给一点视觉强调
                  : "text-purple-800" // 用主题紫替换标准的 Google 搜索蓝
                  }`}>
                  {guide.title}
                </h2>
              </Link>

              {/* C. Google 风格描述文本 + 灰色日期前缀（YMYL 杀手锏） */}
              <p className="mt-1 text-sm text-gray-600 leading-relaxed font-sans">
                <span className="text-gray-400 text-xs mr-2">{currentUpdatedDate} —</span>
                {guide.description}
              </p>

            </div>
          ))}
        </div>

        {/* 底部聚合跳转区 */}
        <div className="mt-16 p-6 rounded-xl bg-gray-50 border border-gray-200 text-center">
          <h3 className="text-base font-bold text-gray-900 mb-2">
            Need Direct Automation Compliance?
          </h3>
          <p className="text-xs text-gray-500 mb-4">
            Skip manual drafting. Use our live interactive system to issue letters or sign agreements instantly.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              href="/tools/sb988-contract-generator"
              className="bg-gray-950 hover:bg-gray-800 text-white text-xs font-bold px-4 py-2 rounded transition"
            >
              Contract Generator
            </Link>
            <Link
              href="/tools/sb988-late-payment-calculator"
              className="border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-bold px-4 py-2 rounded transition"
            >
              Late Penalty Scanner
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}