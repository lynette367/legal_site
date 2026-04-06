interface PageHeroProps {
  overline?: string;
  title: string;
  description: string;
  highlights?: string[];
}

export function PageHero({ overline, title, description, highlights }: PageHeroProps) {
  return (
    <section className="rounded-3xl border border-border-lavender bg-white/70 p-8 shadow-soft">
      {overline && (
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-lavender">{overline}</p>
      )}
      <h1 className="mt-4 text-3xl font-semibold text-text-primary">{title}</h1>
      <p className="mt-3 text-lg text-text-primary/80">{description}</p>
      {highlights && (
        <div className="mt-6 flex flex-wrap gap-3">
          {highlights.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border-lavender/60 bg-primary-lavender/10 px-4 py-1 text-sm text-text-lavender"
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
