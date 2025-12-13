import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://panco-ai-legal-assistant.example.com"),
  title: {
    default: "Panco Legal Assistant | AI Legal Q&A, Dispute Plans, Documents, Contracts",
    template: "%s | Panco Legal Assistant",
  },
  description: "Panco Legal Assistant is an AI tool for individuals and small businesses, covering legal Q&A, dispute analysis, lawsuits/defense/complaint drafts, contract generation, and clause explanations. Pay per use, no subscriptions, with data cleared instantly.",
  openGraph: {
    title: "Panco Legal Assistant | AI Legal Q&A, Dispute Plans, Documents, Contracts",
    description: "An AI legal toolkit for individuals and small businesses. Provides legal Q&A, dispute analysis, document drafting, and contract generation with pay-per-use billing and no subscription.",
    url: "https://panco-ai-legal-assistant.example.com",
    siteName: "Panco Legal Assistant",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-bg-main text-text-primary">
        <Providers>
          <SiteHeader />
          <main className="mx-auto min-h-screen max-w-6xl px-6 py-10">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
