import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "法律助手 | Panco Law",
  description: "简单易懂的法律资讯与合同模板站，让你轻松理解每一条条款。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hans" className={inter.variable}>
      <body className="bg-bg-main text-text-primary">
        <Header />
        <main className="mx-auto min-h-screen max-w-6xl px-6 py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
