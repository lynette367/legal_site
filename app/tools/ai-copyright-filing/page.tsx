import type { Metadata } from 'next';
import AICopyrightFilingClient from './ClientComponent';

export const metadata: Metadata = {
  title: "AI-generated Content Copyright Filing | Free Copyright Tool",
  description: "Professional AI-generated content copyright filing assistant for digital creators. Ensure your AI-created works are properly protected with our free tool.",
  keywords: "AI-generated content copyright, copyright filing, AI content protection, digital creators, U.S. Copyright Office",
  alternates: {
    canonical: 'https://pancothink.com/tools/ai-copyright-filing',
  },
  openGraph: {
    title: "AI-generated Content Copyright Filing | Free Copyright Tool",
    description: "Professional AI-generated content copyright filing assistant for digital creators.",
    url: 'https://pancothink.com/tools/ai-copyright-filing',
    siteName: 'Panco',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "AI-generated Content Copyright Filing",
    description: "Professional AI-generated content copyright filing assistant for digital creators.",
    images: ['/og-image.png'],
  },
};

export default function AICopyrightFilingPage() {
  return <AICopyrightFilingClient />;
}