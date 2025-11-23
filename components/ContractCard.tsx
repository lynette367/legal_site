import Link from "next/link";
import type { ContractTemplate } from "../data/contractsData";

type ContractCardProps = {
  template: ContractTemplate;
  showActions?: boolean;
};

export default function ContractCard({ template, showActions = false }: ContractCardProps) {
  return (
    <article className="flex flex-col rounded-3xl bg-bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg border border-primary-mint/10">
      <div className="mb-3 flex items-center justify-between text-sm text-text-secondary">
        <span className="rounded-full bg-primary-mint/20 px-3 py-1 text-xs text-text-mint font-medium">{template.level}</span>
        <span className="text-text-secondary">{template.category}</span>
      </div>
      <h3 className="text-2xl font-semibold text-text-primary">{template.name}</h3>
      <p className="mt-3 text-sm text-text-secondary">{template.briefDescription}</p>
      <p className="mt-2 text-sm text-text-tertiary">{template.scene}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {template.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-primary-mint-light/20 px-3 py-1 text-xs text-text-mint font-medium">
            #{tag}
          </span>
        ))}
      </div>
      {showActions ? (
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/contracts/${template.id}`}
            className="flex-1 rounded-lg bg-primary-mint hover:bg-primary-mint-dark text-white px-4 py-2 text-center shadow-soft transition-all hover:-translate-y-0.5 font-medium"
          >
            查看详情
          </Link>
          <a
            href={`mailto:hello@lawstudio.com?subject=咨询${template.name}`}
            className="flex-1 rounded-lg border-2 border-primary-mint text-text-mint hover:bg-primary-mint/10 px-4 py-2 text-center transition-all font-medium"
          >
            咨询律师
          </a>
        </div>
      ) : (
        <div className="mt-6">
          <Link href={`/contracts/${template.id}`} className="text-sm font-medium text-primary-mint hover:text-primary-mint-dark underline-offset-4 hover:underline transition-colors">
            查看模板
          </Link>
        </div>
      )}
    </article>
  );
}
