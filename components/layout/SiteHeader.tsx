"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/legal-qa", label: "AI Q&A" },
  { href: "/dispute", label: "Dispute plans" },
  { href: "/documents", label: "Document drafting" },
  { href: "/contracts", label: "Contract drafting" },
  { href: "/explain", label: "Clause explanation" },
  { href: "/pricing", label: "Pricing" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const isLoggedIn = !!session;

  const linkClasses = (href: string) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      pathname === href
        ? "bg-primary-lavender/20 text-text-lavender"
        : "text-text-primary hover:bg-primary-lavender/15"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-border-lavender/70 bg-bg-main/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-semibold text-text-lavender">
          Panco Legal Assistant
        </Link>
        <nav className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClasses(link.href)}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={isLoggedIn ? "/dashboard" : "/login"}
            className="rounded-full border border-border-lavender bg-white/80 px-4 py-2 text-sm font-medium text-text-primary transition hover:border-primary-lavender hover:bg-white"
          >
            {isLoggedIn ? "Dashboard" : "Log in"}
          </Link>
          {isLoggedIn && (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 hover:border-red-300"
            >
              Sign out
            </button>
          )}
        </div>
        <button
          className="rounded-full border border-border-lavender p-2 text-text-primary lg:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <span className="block h-0.5 w-5 bg-text-primary" />
          <span className="mt-1 block h-0.5 w-5 bg-text-primary" />
          <span className="mt-1 block h-0.5 w-5 bg-text-primary" />
        </button>
      </div>
      {isOpen && (
        <div className="space-y-3 border-t border-border-lavender/50 px-6 py-4 lg:hidden">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className={linkClasses(link.href)}>
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3">
            <Link
              href={isLoggedIn ? "/dashboard" : "/login"}
              onClick={() => setIsOpen(false)}
              className="flex-1 rounded-full border border-border-lavender bg-white/80 px-4 py-2 text-center text-sm font-medium text-text-primary"
            >
              {isLoggedIn ? "Dashboard" : "Log in"}
            </Link>
            {isLoggedIn && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
                className="flex-1 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-center text-sm font-medium text-red-600"
              >
                Sign out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
