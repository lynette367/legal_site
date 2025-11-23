import { notFound } from "next/navigation";
import { contractTemplates } from "../../../data/contractsData";

export default function ContractDetailPage({ params }: { params: { id: string } }) {
  const contract = contractTemplates.find((template) => template.id === params.id);

  if (!contract) {
    notFound();
  }

  return (
    <article className="space-y-8 rounded-3xl bg-bg-card p-8 shadow-soft border border-primary-mint/10">
      <header>
        <p className="text-sm text-text-secondary">{contract.category}</p>
        <h1 className="text-4xl font-semibold text-text-primary">{contract.name}</h1>
        <div className="mt-4 flex flex-wrap gap-3">
          {contract.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-accent-blue/25 px-4 py-1 text-sm text-[#5A9BB5] font-medium">
              #{tag}
            </span>
          ))}
        </div>
        <p className="mt-4 text-text-secondary">{contract.briefDescription}</p>
        <p className="text-text-tertiary">适用场景：{contract.scene}</p>
      </header>
      <section>
        <h2 className="text-2xl font-semibold text-text-primary">合同结构参考</h2>
        <ol className="mt-4 space-y-3 text-text-secondary">
          {contract.outline.map((item, index) => (
            <li
              key={item}
              className="rounded-2xl bg-bg-alt px-4 py-3 text-sm shadow-soft"
            >
              {index + 1}. {item}
            </li>
          ))}
        </ol>
      </section>
      <section className="rounded-2xl bg-primary-mint/10 border border-primary-mint/20 p-6 text-sm text-text-primary">
        <p>
          温柔提醒：本页面仅为示例合同结构。正式签署前请结合实际情况修改，或点击
          <a
            href={`mailto:hello@lawstudio.com?subject=咨询${contract.name}`}
            className="text-primary-mint hover:text-primary-mint-dark underline-offset-4 hover:underline transition-colors"
          >
            咨询专业律师
          </a>
          。
        </p>
      </section>
    </article>
  );
}
