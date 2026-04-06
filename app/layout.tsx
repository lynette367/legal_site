import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
import { Providers } from "./providers";
import { GoogleAnalytics } from "../components/layout/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://panco-ai-legal-assistant.example.com"),
  title: {
    default: "Free AI Compliance Tools for Small Business & Emerging Tech | Panco",
    template: "%s | Panco",
  },
  description: "Instant AI legal & compliance tools for California small businesses. Get AI-generated content copyright filings, ESG checklists, freelancer contract reviews, custom AI use policies, metaverse IP trademark support, and CCPA data breach letters in minutes. No legal background needed.",
  openGraph: {
    title: "Free AI Compliance Tools for Small Business & Emerging Tech | Panco",
    description: "Instant AI legal & compliance tools for California small businesses. Get AI-generated content copyright filings, ESG checklists, freelancer contract reviews, custom AI use policies, metaverse IP trademark support, and CCPA data breach letters in minutes. No legal background needed.",
    url: "https://panco.com",
    siteName: "Panco",
    locale: "en_US",
    type: "website",
  },
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
