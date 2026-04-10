import type { Metadata } from 'next';
import ESGComplianceChecklistClient from './ClientComponent';

export const metadata: Metadata = {
  title: "ESG Compliance Checklist | California Small Business Tool",
  description: "Comprehensive ESG compliance toolkit for California small businesses. Ensure your business meets environmental, social, and governance standards.",
  keywords: "ESG compliance, California small business, environmental compliance, social responsibility, governance standards",
  alternates: {
    canonical: 'https://pancothink.com/tools/esg-compliance-checklist',
  },
  openGraph: {
    title: "ESG Compliance Checklist | California Small Business Tool",
    description: "Comprehensive ESG compliance toolkit for California small businesses.",
    url: 'https://pancothink.com/tools/esg-compliance-checklist',
    siteName: 'Panco',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ESG Compliance Checklist",
    description: "Comprehensive ESG compliance toolkit for California small businesses.",
    images: ['/og-image.png'],
  },
};

export default function ESGComplianceChecklistPage() {
  return <ESGComplianceChecklistClient />;
}