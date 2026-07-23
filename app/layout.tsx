import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
import { Providers } from "./providers";
import { GoogleAnalytics } from "../components/layout/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL('https://indielegalterms.com'),
  title: {
    default: "Indie Legal | Contract for Service Generator & Freelancer Compliance Tools",
    template: "%s | Indie Legal",
  },
  description: "Generate California SB 988 compliant contracts for service in minutes. Calculate freelancer true costs, audit agreement liability, and protect your hiring team from gig economy penalties.",
  openGraph: {
    title: "Indie Legal | Contract for Service Generator & Freelancer Compliance Tools",
    description: "Generate California SB 988 compliant contracts for service in minutes. Calculate freelancer true costs, audit agreement liability, and protect your hiring team from gig economy penalties.",
    url: "https://indielegalterms.com",
    siteName: "Indie Legal",
    locale: "en_US",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-bg-main text-text-primary">
        <GoogleAnalytics />
        <Providers>
          <SiteHeader />
          <main className="mx-auto min-h-screen max-w-6xl px-6 py-10">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
