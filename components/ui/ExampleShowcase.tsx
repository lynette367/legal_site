export interface OutputBlock {
  label: string;
  value?: string;
  items?: string[];
}

interface ExampleShowcaseProps {
  inputExample: string;
  outputBlocks: OutputBlock[];
  title?: string;
}

export function ExampleShowcase({ inputExample, outputBlocks, title = "Sample response" }: ExampleShowcaseProps) {
  return (
    <section className="rounded-3xl border border-border-lavender bg-bg-card p-8 shadow-soft">
      <h2 className="text-2xl font-semibold text-text-primary mb-6">Usage example</h2>
      
      <div className="space-y-6">
        <div>
          <p className="text-sm font-semibold text-text-lavender mb-2">Input example</p>
          <div className="rounded-2xl border border-border-lavender/70 bg-white/80 p-4">
            <p className="text-base text-text-primary">{inputExample}</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-text-lavender mb-4">Output example</p>
          <div className="rounded-2xl border border-border-lavender/70 bg-primary-lavender/10 p-6">
            <p className="text-lg font-semibold text-text-primary mb-4">{title}</p>
            <div className="space-y-4">
              {outputBlocks.map((block) => (
                <div key={block.label}>
                  <p className="text-sm font-semibold text-text-lavender mb-2">{block.label}</p>
                  {block.value && <p className="text-base text-text-primary">{block.value}</p>}
                  {block.items && (
                    <ul className="list-disc space-y-1 pl-5 text-base text-text-primary">
                      {block.items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
