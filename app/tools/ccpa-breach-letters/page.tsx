import type { Metadata } from 'next';
import CCPABreachLettersClient from './ClientComponent';

export const metadata: Metadata = {
  title: "CCPA Data Breach Notification Letter Generator | Free Template",
  description: "Create CCPA/CPRA-compliant data breach notification letters in 1 click for your California business. Free AI-powered templates, instant download, no legal expertise needed.",
  keywords: "CCPA data breach letter, data breach notification, CCPA compliance, CPRA breach letter, California data breach law",
  alternates: {
    canonical: 'https://pancothink.com/tools/ccpa-breach-letters',
  },
  openGraph: {
    title: "CCPA Data Breach Notification Letter Generator | Free Template",
    description: "Create CCPA/CPRA-compliant data breach notification letters in 1 click for your California business. Free AI-powered templates, instant download, no legal expertise needed.",
    url: 'https://pancothink.com/tools/ccpa-breach-letters',
    siteName: 'Panco',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "CCPA Data Breach Notification Letter Generator | Free Template",
    description: "Create CCPA/CPRA-compliant data breach notification letters in 1 click for your California business.",
    images: ['/og-image.png'],
  },
};

export default function CCPABreachLettersPage() {
  return <CCPABreachLettersClient />;
}
