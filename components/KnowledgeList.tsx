type Article = {
  id: string;
  title: string;
  summary: string;
  category: string;
  image: string;
  href?: string;
};

type KnowledgeListProps = {
  title: string;
  description?: string;
  articles: Article[];
};

export default function KnowledgeList({ title, description, articles }: KnowledgeListProps) {
  return (
    <section className="mt-16">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-semibold text-text-primary">{title}</h2>
        {description && <p className="text-text-secondary">{description}</p>}
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {articles.map((article) => (
          <article
            key={article.id}
            className="flex flex-col overflow-hidden rounded-3xl bg-bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg border border-primary-mint/10"
          >
            <img src={article.image} alt={article.title} className="h-48 w-full object-cover" />
            <div className="flex flex-1 flex-col gap-3 p-6">
              <span className="self-start rounded-full bg-accent-blue/25 px-3 py-1 text-xs text-[#5A9BB5] font-medium">
                {article.category}
              </span>
              <h3 className="text-xl font-semibold text-text-primary">{article.title}</h3>
              <p className="flex-1 text-sm text-text-secondary">{article.summary}</p>
              <a
                href={article.href ?? "#"}
                className="text-sm font-medium text-primary-mint hover:text-primary-mint-dark underline-offset-4 hover:underline transition-colors"
              >
                阅读全文
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
