"use client";

import { useMemo, useState } from "react";
import ContractCard from "../../components/ContractCard";
import { contractTemplates } from "../../data/contractsData";

const tabs = [
  { label: "热门合同", matcher: () => true },
  { label: "个人相关", matcher: (tags: string[]) => tags.includes("个人") },
  { label: "公司运营", matcher: (tags: string[]) => tags.includes("公司") },
  { label: "合作与投资", matcher: (tags: string[]) => tags.includes("合作") || tags.includes("投资") },
  { label: "知识产权", matcher: (tags: string[]) => tags.includes("知识产权") },
];

export default function ContractsPage() {
  const [keyword, setKeyword] = useState("");
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  const filteredTemplates = useMemo(() => {
    return contractTemplates.filter((template) => {
      const matchKeyword = keyword
        ? template.name.includes(keyword) ||
          template.briefDescription.includes(keyword) ||
          template.tags.some((tag) => tag.includes(keyword))
        : true;
      const tabMatcher = tabs.find((tab) => tab.label === activeTab)?.matcher ?? (() => true);
      const matchTab = tabMatcher(template.tags);
      return matchKeyword && matchTab;
    });
  }, [keyword, activeTab]);

  return (
    <div>
      <section className="rounded-3xl bg-bg-card p-8 shadow-soft border border-primary-mint/10">
        <p className="text-sm text-text-secondary">Panco 合同工作台</p>
        <h1 className="text-4xl font-semibold text-text-primary">找找合同</h1>
        <p className="mt-2 text-text-secondary">
          在这里找到常用的合同模板，先看说明再下载或咨询专业律师。
        </p>
      </section>
      <section className="mt-8 rounded-3xl bg-bg-card p-6 shadow-soft border border-primary-mint/10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <input
            type="text"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="输入关键字，例如：股权 / 租赁"
            className="flex-1 rounded-lg border-2 border-gray-200 bg-bg-card px-4 py-3 shadow-inner focus:border-primary-mint focus:ring-2 focus:ring-primary-mint/20 text-text-primary placeholder-text-tertiary transition-all outline-none"
          />
          <button
            type="button"
            onClick={() => setKeyword("")}
            className="rounded-lg border-2 border-primary-mint/40 text-text-mint hover:bg-primary-mint/10 px-4 py-2 text-sm transition-all font-medium"
          >
            清空
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActiveTab(tab.label)}
              className={`rounded-full px-5 py-2 text-sm shadow-soft transition-all font-medium ${
                activeTab === tab.label
                  ? "bg-primary-mint text-white"
                  : "bg-bg-alt text-text-secondary hover:bg-primary-mint/15"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>
      <section className="mt-8 grid gap-6 md:grid-cols-2">
        {filteredTemplates.map((template) => (
          <ContractCard key={template.id} template={template} showActions />
        ))}
        {!filteredTemplates.length && (
          <p className="col-span-full rounded-3xl bg-bg-alt p-6 text-center text-text-secondary">
            没有匹配的模板，试试换个关键词。
          </p>
        )}
      </section>
    </div>
  );
}
