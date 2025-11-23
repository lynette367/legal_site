"use client";

import { useMemo, useState } from "react";
import ContractCard from "./ContractCard";
import { contractTemplates } from "../data/contractsData";

const tags = ["个人", "公司", "劳动", "租赁", "合作", "保密", "知识产权", "投资"];

export default function ContractSearchSection() {
  const [keyword, setKeyword] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredTemplates = useMemo(() => {
    return contractTemplates.filter((template) => {
      const matchKeyword = keyword
        ? template.name.includes(keyword) ||
          template.briefDescription.includes(keyword) ||
          template.tags.some((tag) => tag.includes(keyword))
        : true;
      const matchTag = selectedTag ? template.tags.includes(selectedTag) : true;
      return matchKeyword && matchTag;
    });
  }, [keyword, selectedTag]);

  return (
    <section className="mt-16 rounded-3xl bg-bg-card p-8 shadow-soft border border-primary-mint/10">
      <div className="mb-6 text-center">
        <p className="text-sm text-text-secondary">Panco 合同角落</p>
        <h2 className="text-3xl font-semibold text-text-primary">找找合同</h2>
        <p className="text-text-secondary">
          想签合同但不知道从哪里下手？先在这里逛逛模板吧。
        </p>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <input
          type="text"
          placeholder="搜索：劳动合同 / 租赁合同 / 合作协议..."
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          className="flex-1 rounded-lg border-2 border-gray-200 bg-bg-card px-4 py-3 shadow-inner focus:border-primary-mint focus:ring-2 focus:ring-primary-mint/20 text-text-primary placeholder-text-tertiary transition-all outline-none"
        />
        <button
          type="button"
          onClick={() => {
            setKeyword("");
            setSelectedTag(null);
          }}
          className="rounded-lg border-2 border-primary-mint/40 text-text-mint hover:bg-primary-mint/10 px-4 py-2 text-sm transition-all font-medium"
        >
          清空筛选
        </button>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setSelectedTag((prev) => (prev === tag ? null : tag))}
            className={`rounded-full px-4 py-2 text-sm shadow-soft transition-all font-medium ${
              selectedTag === tag
                ? "bg-primary-mint text-white"
                : "bg-bg-alt text-text-secondary hover:bg-primary-mint/15"
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {filteredTemplates.map((template) => (
          <ContractCard key={template.id} template={template} />
        ))}
        {!filteredTemplates.length && (
          <p className="col-span-full rounded-3xl bg-bg-alt p-6 text-center text-text-secondary">
            暂时没有找到相关合同，换个关键词试试吧。
          </p>
        )}
      </div>
    </section>
  );
}
