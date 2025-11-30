"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface PaymentSuccessPanelProps {
  planName: string;
  credits: number;
}

export function PaymentSuccessPanel({ planName, credits }: PaymentSuccessPanelProps) {
  const { data: session } = useSession();
  const [currentCredits, setCurrentCredits] = useState(0);

  useEffect(() => {
    // 获取最新的 Credits 余额
    const fetchCredits = async () => {
      if (!session) return;
      
      try {
        const response = await fetch("/api/credits/me");
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setCurrentCredits(data.credits.remainingCredits);
          }
        }
      } catch (error) {
        console.error("Failed to fetch credits:", error);
      }
    };
    
    fetchCredits();
  }, [session]);

  return (
    <div className="rounded-3xl border border-border-lavender bg-bg-card p-8 shadow-soft">
      <p className="text-sm font-semibold text-text-lavender">支付成功（示例）</p>
      <h1 className="mt-3 text-3xl font-semibold text-text-primary">已完成 {planName} 购买</h1>
      <p className="mt-2 text-sm text-text-primary/70">聚合支付已返回成功状态，系统自动增加套餐次数。</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border-lavender/70 bg-white/80 p-4">
          <p className="text-xs text-text-primary/70">到账套餐</p>
          <p className="text-lg font-semibold text-text-primary">{planName}</p>
        </div>
        <div className="rounded-2xl border border-border-lavender/70 bg-white/80 p-4">
          <p className="text-xs text-text-primary/70">本次增加次数</p>
          <p className="text-lg font-semibold text-text-primary">+{credits}</p>
        </div>
        <div className="rounded-2xl border border-border-lavender/70 bg-white/80 p-4">
          <p className="text-xs text-text-primary/70">当前账户余额</p>
          <p className="text-lg font-semibold text-text-primary">{currentCredits}</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-text-primary/80">
        所有调用在后端统一走 LLM API Key，前端仅发起调用请求。请在模块中勾选行为验证码后再进行扣费使用。
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/dashboard"
          className="rounded-full border border-border-lavender px-6 py-3 text-sm font-semibold text-text-primary hover:border-primary-lavender"
        >
          查看用户中心
        </Link>
        <Link
          href="/legal-qa"
          className="rounded-full bg-primary-lavender px-6 py-3 text-sm font-semibold text-white hover:bg-primary-lavender-dark"
        >
          去使用 AI 问答
        </Link>
      </div>
    </div>
  );
}
