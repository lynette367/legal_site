import type { Metadata } from "next";
import Link from "next/link";
import { paymentChannels, plans, creditsNote } from "../data/plans";

export const metadata: Metadata = {
  title: "Panco 法律助手｜AI 法律问答、纠纷方案、法律文书生成、合同生成",
  description: "Panco 法律助手是一款面向个人与中小企业的 AI 法律工具，提供法律问答、纠纷分析、起诉状/答辩状/投诉书生成、合同生成与条款解释。按次收费，无需订阅，安全即时清除数据。",
};

const modules = [
  { name: "AI 法律问答", href: "/legal-qa", desc: "即时洞察问题类型与风险点", tag: "1 点/调用" },
  { name: "条款解释功能", href: "/explain", desc: "条款含义 + 风险提示", tag: "1 点/调用" },
  { name: "AI 纠纷方案生成", href: "/dispute", desc: "输出行动路径、证据与风险", tag: "2 点/调用" },
  { name: "法律文书自动生成", href: "/documents", desc: "起诉状/答辩状/投诉书草稿", tag: "3 点/调用" },
  { name: "合同自动生成", href: "/contracts", desc: "租房/劳务/合作/NDA 模板", tag: "3 点/调用" },
];

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-border-lavender bg-bg-card p-12 text-center shadow-[0_4px_20px_rgba(126,196,164,0.2)]">
          <p className="text-2xl font-semibold text-text-primary md:text-3xl">
            Panco 法律助手
          </p>
          
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-text-primary">
            面向个人与中小企业的 AI 法律工具，提供法律问答、纠纷分析、文书生成与合同生成。
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="rounded-full bg-primary-lavender/25 px-4 py-2 text-sm font-medium text-text-lavender">
              AI 法律问答（随问随答）
            </span>
            <span className="rounded-full bg-primary-lavender/25 px-4 py-2 text-sm font-medium text-text-lavender">
              法律文书一键生成
            </span>
            <span className="rounded-full bg-primary-lavender/25 px-4 py-2 text-sm font-medium text-text-lavender">
              按次收费，无需订阅
            </span>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/legal-qa"
              className="rounded-xl bg-primary-lavender px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-primary-lavender-dark"
            >
              立即体验 AI 法律问答
            </Link>
            <Link
              href="/pricing"
              className="rounded-xl border border-primary-lavender/40 bg-white px-6 py-3 text-base font-semibold text-text-lavender transition hover:border-primary-lavender"
            >
              查看套餐与价格
            </Link>
          </div>

          <p className="mt-8 text-sm text-text-primary/60">
            你的数据将被即时处理、即时清除，不会被存储或用于模型训练。
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-border-lavender bg-white/80 p-8 shadow-soft">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">五大功能</h2>
          <p className="mt-2 text-text-primary/70">每个模块均提供示例，付费后才可调用 AI。</p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {modules.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-border-lavender/70 bg-bg-card p-5 transition hover:-translate-y-1 hover:border-primary-lavender"
            >
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-text-primary">{item.name}</p>
                <span className="rounded-full bg-primary-lavender/20 px-3 py-1 text-xs font-semibold text-text-lavender">
                  {item.tag}
                </span>
              </div>
              <p className="mt-3 text-sm text-text-primary/70">{item.desc}</p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-text-lavender">
                前往模块 →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-border-lavender bg-bg-card p-8 shadow-soft">
        <h2 className="text-2xl font-semibold text-text-primary">点数套餐</h2>
        <p className="mt-2 text-sm text-text-primary/70">💡 {creditsNote}</p>
        
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`relative rounded-2xl border p-5 ${
                plan.recommended 
                  ? "border-primary-lavender ring-2 ring-primary-lavender bg-white" 
                  : "border-border-lavender/80 bg-white/80"
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-4 rounded-full bg-primary-lavender px-3 py-1 text-xs font-bold text-white">
                  ⭐ 最推荐
                </div>
              )}
              <div className="flex items-baseline justify-between">
                <p className="text-lg font-semibold text-text-primary">{plan.name}</p>
                <p className="text-xl font-bold text-text-lavender">{plan.price}</p>
              </div>
              <p className="text-xs text-text-lavender mt-1">{plan.credits} 点</p>
              <p className="text-sm text-text-primary/70 mt-2">{plan.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/pricing"
            className="inline-block rounded-full bg-primary-lavender px-8 py-3 text-sm font-semibold text-white transition hover:bg-primary-lavender-dark"
          >
            立即购买点数
          </Link>
        </div>

        <div className="mt-6 rounded-2xl border border-border-lavender/80 bg-white/80 p-5">
          <p className="text-sm font-semibold text-text-lavender">支付方式</p>
          <p className="mt-2 text-sm text-text-primary/80">支持 PayPal 官方支付 + 微信/支付宝 H5 支付</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <span className="rounded-full bg-blue-500/20 px-4 py-1 text-sm text-blue-600 font-semibold">
              PayPal（已集成）
            </span>
            {paymentChannels.map((method) => (
              <span key={method.value} className="rounded-full bg-primary-lavender/20 px-4 py-1 text-sm text-text-lavender">
                {method.label}
              </span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
