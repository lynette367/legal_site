import type { Metadata } from 'next';
import MetaverseIPTrademarkClient from './ClientComponent';

export const metadata: Metadata = {
  title: "Metaverse IP Trademark Support | Digital Asset Protection",
  description: "Strategic guidance for protecting digital assets and trademarks in the metaverse. Safeguard your virtual intellectual property rights.",
  keywords: "metaverse IP protection, digital asset trademark, virtual goods protection, NFT IP rights, Web3 intellectual property",
  alternates: {
    canonical: 'https://pancothink.com/tools/metaverse-ip-trademark',
  },
  openGraph: {
    title: "Metaverse IP Trademark Support | Digital Asset Protection",
    description: "Strategic guidance for protecting digital assets and trademarks in the metaverse.",
    url: 'https://pancothink.com/tools/metaverse-ip-trademark',
    siteName: 'Panco',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Metaverse IP Trademark Support",
    description: "Strategic guidance for protecting digital assets and trademarks in the metaverse.",
    images: ['/og-image.png'],
  },
};

export default function MetaverseIPTrademarkPage() {
  return <MetaverseIPTrademarkClient />;
}