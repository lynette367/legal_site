import type { Metadata } from 'next';
import AIUsePolicyClient from './ClientComponent';

export const metadata: Metadata = {
  title: "Custom AI Use Policy Generator | Internal AI Guidelines Tool",
  description: "Generate internal AI usage policies tailored for your team. Ensure responsible and compliant use of AI tools in your organization.",
  keywords: "AI use policy, internal AI guidelines, AI compliance, responsible AI use, AI ethics",
  alternates: {
    canonical: 'https://pancothink.com/tools/ai-use-policy',
  },
  openGraph: {
    title: "Custom AI Use Policy Generator | Internal AI Guidelines Tool",
    description: "Generate internal AI usage policies tailored for your team.",
    url: 'https://pancothink.com/tools/ai-use-policy',
    siteName: 'Panco',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Custom AI Use Policy Generator",
    description: "Generate internal AI usage policies tailored for your team.",
    images: ['/og-image.png'],
  },
};

export default function AIUsePolicyPage() {
  return <AIUsePolicyClient />;
}