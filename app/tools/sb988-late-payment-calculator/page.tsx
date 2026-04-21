import SB988PenaltyCalculator from './SB988PenaltyCalculator';

export const metadata = {
  title: 'Calculate your double damages under CA SB 988',
  description: 'Calculate potential 2x late payment penalties under California SB 988 and determine how much you may be entitled to recover.',
  alternates: {
    canonical: 'https://pancothink.com/tools/sb988-late-payment-calculator',
  },
  openGraph: {
    title: 'Calculate your double damages under CA SB 988',
    description: 'Calculate potential 2x late payment penalties under California SB 988 and determine how much you may be entitled to recover.',
    url: 'https://pancothink.com/tools/sb988-late-payment-calculator',
    siteName: 'Panco',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculate your double damages under CA SB 988',
    images: ['/og-image.png'],
  },
};

export default function SB988LatePaymentCalculatorPage() {
  return <SB988PenaltyCalculator />;
}
