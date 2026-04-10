import type { Metadata } from 'next';
import FreelancerContractReviewClient from './ClientComponent';

export const metadata: Metadata = {
  title: "Freelancer Contract Review | California Independent Contractor Tool",
  description: "Instantly detect risky clauses in freelancer and independent contractor agreements. Protect your rights as a freelancer or client in California.",
  keywords: "freelancer contract review, independent contractor agreement, California AB5, contract risk detection, freelance legal protection",
  alternates: {
    canonical: 'https://pancothink.com/tools/freelancer-contract-review',
  },
  openGraph: {
    title: "Freelancer Contract Review | California Independent Contractor Tool",
    description: "Instantly detect risky clauses in freelancer and independent contractor agreements.",
    url: 'https://pancothink.com/tools/freelancer-contract-review',
    siteName: 'Panco',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Freelancer Contract Review",
    description: "Instantly detect risky clauses in freelancer and independent contractor agreements.",
    images: ['/og-image.png'],
  },
};

export default function FreelancerContractReviewPage() {
  return <FreelancerContractReviewClient />;
}