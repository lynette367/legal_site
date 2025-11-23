import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-bg-card p-8 shadow-soft md:p-12 border border-primary-mint/10">
      <div className="grid gap-10 md:grid-cols-[3fr,2fr] md:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-text-secondary">实用的法律陪伴</p>
          <h1 className="peach-divider mb-6 text-3xl font-semibold text-text-primary md:text-4xl">
            想搞懂法律条文？让我们把晦涩的文字，变成你的贴心伙伴。
          </h1>
          <p className="mb-8 text-lg text-text-secondary">
            劳动、婚姻、合同、公司治理……法律帮你解决烦恼，让你专注生活。
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contracts"
              className="rounded-lg bg-primary-mint hover:bg-primary-mint-dark text-white px-6 py-3 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lg font-medium"
            >
              找找合同
            </Link>
            <Link
              href="/help"
              className="rounded-lg border-2 border-primary-mint text-text-mint hover:bg-primary-mint/10 px-6 py-3 transition-all font-medium"
            >
              需要帮助
            </Link>
          </div>
        </div>
        <div className="relative h-72 rounded-3xl bg-accent-blue/50 p-6 shadow-inner">
          <div className="relative z-10 flex h-full flex-col justify-between rounded-2xl bg-bg-card/80 p-6 shadow-soft">
            <p className="text-sm text-text-secondary">今日小提示</p>
            <h2 className="text-2xl font-semibold text-text-primary">
              合同签署前，记得确认对方主体信息与签章权限。
            </h2>
            <p className="text-sm text-text-secondary">
              如果对条款存疑，先在"找找合同"里对照模板，或预约律师快速审核。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
