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
    default: "Panco 法律助手｜AI 法律问答、纠纷方案、法律文书生成、合同生成",
    template: "%s｜Panco 法律助手",
  },
  description: "Panco 法律助手是一款面向个人与中小企业的 AI 法律工具，提供法律问答、纠纷分析、起诉状/答辩状/投诉书生成、合同生成与条款解释。按次收费，无需订阅，安全即时清除数据。",
  openGraph: {
    title: "Panco 法律助手｜AI 法律问答、纠纷方案、法律文书生成、合同生成",
    description: "面向个人与中小企业的专业 AI 法律工具，支持法律问答、纠纷分析、文书生成与合同生成，按次收费，无需订阅。",
    url: "https://panco-ai-legal-assistant.example.com",
    siteName: "Panco 法律助手",
    locale: "zh_CN",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hans" className={inter.variable}>
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
