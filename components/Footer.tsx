import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 bg-bg-alt text-sm text-text-primary border-t border-primary-mint/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold text-text-primary">法律助手 · Panco Law</p>
          <p className="text-text-secondary">
            用简单易懂的方式解答复杂严肃问题，法律保护每一个人的权益。
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-text-secondary">
          <Link href="/privacy" className="hover:text-primary-mint transition-colors">
            隐私政策
          </Link>
          <Link href="/terms" className="hover:text-primary-mint transition-colors">
            使用条款
          </Link>
          <Link href="mailto:hello@lawstudio.com" className="hover:text-primary-mint transition-colors">
            hello@lawstudio.com
          </Link>
        </div>
      </div>
      <p className="border-t border-primary-mint/20 py-6 text-center text-text-tertiary">
        © {new Date().getFullYear()} Panco Law Studio. All rights reserved.
      </p>
    </footer>
  );
}
