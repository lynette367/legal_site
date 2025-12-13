export function SiteFooter() {
  return (
    <footer className="border-t border-border-lavender/70 bg-white/70 text-sm text-text-primary">
      <div className="border-t border-border-lavender/50 bg-bg-main/80 px-6 py-6 text-center text-xs text-text-primary/70">
        <p>© {new Date().getFullYear()} Panco Legal Assistant</p>
        <p className="mt-3 font-semibold text-text-primary">
          This site is an AI legal support tool and does not provide legal advice. Use your own judgment and consult a licensed attorney when needed.
        </p>
      </div>
    </footer>
  );
}
