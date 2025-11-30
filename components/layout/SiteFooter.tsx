import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border-lavender/70 bg-white/70 text-sm text-text-primary">
      <div className="border-t border-border-lavender/50 bg-bg-main/80 px-6 py-6 text-center text-xs text-text-primary/70">
        <p>© {new Date().getFullYear()} Panco 法律助手</p>
        <p className="mt-3 font-semibold text-text-primary">
          本网站为 AI 法律辅助工具，不提供法律建议；所有内容需用户自行判断，并建议必要时咨询专业律师。
        </p>
      </div>
    </footer>
  );
}
