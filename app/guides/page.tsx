import Link from "next/link";

export const metadata = {
  title: "Legal Guides | California SB 988 Resources",
  description: "Expert legal guides and resources for California freelancers, focusing on SB 988 compliance and protecting your freelance business.",
  alternates: {
    canonical: 'https://pancothink.com/guides',
  },
  openGraph: {
    title: "Legal Guides | California SB 988 Resources",
    description: "Expert legal guides and resources for California freelancers, focusing on SB 988 compliance and protecting your freelance business.",
    url: 'https://pancothink.com/guides',
    siteName: 'Panco',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Legal Guides | California SB 988 Resources",
    images: ['/og-image.png'],
  },
};

export default function GuidesPage() {
  const guides = [
    {
      title: "The Graphic Designer's Guide to California's SB 988",
      slug: "sb988-for-graphic-designers",
      description: "Learn the 5 mandatory contract clauses you need for every $250+ project, how to retain your IP rights, and use our specialized AI tool to generate a compliant agreement in seconds.",
      published: "April 20, 2026",
      readTime: "7 min read",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="mb-12">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm text-primary-lavender hover:underline mb-4"
        >
          ← Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
          Legal Guides for California Freelancers
        </h1>
        <p className="text-xl text-text-primary/80">
          Expert resources to help you navigate California&apos;s freelance laws and protect your business
        </p>
      </header>

      {/* Guides List */}
      <div className="space-y-8">
        {guides.map((guide) => (
          <Link 
            key={guide.slug} 
            href={`/guides/${guide.slug}`}
            className="block p-6 rounded-2xl border border-border-lavender/40 hover:border-primary-lavender/30 hover:bg-primary-lavender/5 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4">
              <h2 className="text-2xl font-bold text-text-primary mb-2 sm:mb-0">
                {guide.title}
              </h2>
              <div className="flex items-center text-sm text-text-primary/60">
                <span>{guide.published}</span>
                <span className="mx-2">•</span>
                <span>{guide.readTime}</span>
              </div>
            </div>
            <p className="text-text-primary/70 mb-4">
              {guide.description}
            </p>
            <div className="flex items-center text-primary-lavender font-medium hover:underline">
              Read Guide <span className="ml-1">→</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-16 p-8 rounded-2xl bg-primary-lavender/10 border border-primary-lavender/30 text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          Need Help with SB 988 Compliance?
        </h2>
        <p className="text-text-primary/70 mb-6">
          Use our AI-powered tools to generate compliant contracts and calculate late payment penalties
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            href="/tools/sb988-contract-generator" 
            className="inline-flex items-center text-white bg-primary-lavender font-medium px-6 py-3 rounded-lg hover:bg-primary-lavender-dark transition"
          >
            Generate Contract
          </Link>
          <Link 
            href="/tools/sb988-late-payment-calculator" 
            className="inline-flex items-center text-primary-lavender border border-primary-lavender/30 font-medium px-6 py-3 rounded-lg hover:bg-primary-lavender/5 transition"
          >
            Calculate Penalties
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-border-lavender">
        <div className="text-center">
          <p className="text-sm text-text-primary/60 mb-4">
            All guides are for informational purposes only and do not constitute legal advice.
          </p>
          <Link 
            href="/" 
            className="text-primary-lavender font-medium hover:underline"
          >
            Back to PancoLegal
          </Link>
        </div>
      </footer>
    </div>
  );
}
