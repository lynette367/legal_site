"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const navLinks = [
  { label: "首页", href: "/" },
  { label: "法律资讯", href: "/news" },
  { label: "法律知识", href: "/knowledge" },
  { label: "找找合同", href: "/contracts" },
  { label: "需要帮助", href: "/help" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-bg-card/95 shadow-soft backdrop-blur-sm border-b border-primary-mint/20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-semibold text-primary-mint">
          法律助手
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 transition-colors ${
                pathname === link.href
                  ? "border-b-2 border-primary-mint bg-primary-mint/10 text-text-primary"
                  : "text-text-primary hover:bg-primary-mint/15"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/help"
            className="rounded-full bg-primary-mint hover:bg-primary-mint-dark text-white px-5 py-2 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            立即咨询
          </Link>
        </nav>
        <button
          className="rounded-full bg-bg-card p-2 text-text-primary shadow-soft md:hidden"
          aria-label="打开导航"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <FontAwesomeIcon icon={isOpen ? faXmark : faBars} size="lg" />
        </button>
      </div>
      {isOpen && (
        <div className="flex flex-col gap-3 px-6 pb-6 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`rounded-2xl px-4 py-3 text-base font-medium shadow-soft ${
                pathname === link.href
                  ? "bg-primary-mint/10 border-b-2 border-primary-mint text-text-primary"
                  : "bg-bg-card text-text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/help"
            onClick={() => setIsOpen(false)}
            className="rounded-2xl bg-primary-mint hover:bg-primary-mint-dark px-4 py-3 text-center text-white shadow-soft transition-all"
          >
            立即咨询
          </Link>
        </div>
      )}
    </header>
  );
}
