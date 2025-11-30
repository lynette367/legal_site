"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * 用户中心面板组件
 * 显示用户信息和 Credits 余额
 */
export function UserCenterPanel() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [credits, setCredits] = useState({
    totalCredits: 0,
    usedCredits: 0,
    remainingCredits: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  // 获取用户 Credits
  useEffect(() => {
    if (session?.user?.id) {
      fetchCredits();
    }
  }, [session]);

  const fetchCredits = async () => {
    try {
      const response = await fetch("/api/credits/me");
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setCredits(data.credits);
        }
      }
    } catch (error) {
      console.error("Failed to fetch credits:", error);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut({ callbackUrl: "/" });
  };

  const handleLogin = () => {
    router.push("/login");
  };

  // 加载中
  if (status === "loading") {
    return (
      <div className="w-full max-w-md rounded-3xl border border-border-lavender bg-bg-card p-8 shadow-soft">
        <div className="flex items-center justify-center py-8">
          <div className="text-text-primary/60">加载中...</div>
        </div>
      </div>
    );
  }

  // 未登录
  if (!session) {
    return (
      <div className="w-full max-w-md rounded-3xl border border-border-lavender bg-bg-card p-8 shadow-soft">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-4">用户中心</h2>
          <p className="text-text-primary/70 mb-6">
            登录后可查看您的 Credits 余额和订单历史
          </p>
          <button
            onClick={handleLogin}
            className="w-full rounded-full bg-primary-lavender px-6 py-3 font-semibold text-white transition hover:bg-primary-lavender-dark"
        >
            登录 / 注册
          </button>
        </div>
      </div>
    );
  }

  // 已登录
  return (
    <div className="w-full max-w-md rounded-3xl border border-border-lavender bg-bg-card p-8 shadow-soft">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-primary">用户中心</h2>
      </div>

      {/* 用户信息 */}
      <div className="mb-6 rounded-2xl border border-border-lavender/80 bg-white/90 p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-lavender/20 text-primary-lavender">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-text-primary">
              {session.user.name || "用户"}
            </p>
            <p className="text-sm text-text-primary/70">{session.user.email}</p>
          </div>
        </div>
      </div>

      {/* Credits 信息 */}
      <div className="mb-6 rounded-2xl border border-border-lavender/80 bg-gradient-to-br from-primary-lavender/10 to-primary-lavender/5 p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-text-lavender">点数余额</span>
          <button
            onClick={fetchCredits}
            className="text-xs text-text-lavender hover:underline"
          >
            刷新
          </button>
        </div>
        
        <div className="mb-4">
          <p className="text-4xl font-bold text-text-lavender">
            {credits.remainingCredits}
            <span className="text-lg font-normal text-text-primary/60 ml-1">点</span>
          </p>
          <p className="text-sm text-text-primary/70 mt-1">
            总充值: {credits.totalCredits} 点 | 已使用: {credits.usedCredits} 点
          </p>
        </div>

        <div className="mb-3 rounded-xl bg-white/60 p-3 text-xs text-text-primary/70">
          <p className="font-semibold text-text-lavender mb-1">💡 扣费规则</p>
          <p>• 问答/条款解释：1 点</p>
          <p>• 纠纷方案：2 点</p>
          <p>• 文书/合同生成：3 点</p>
          <p className="mt-2">⭐ 推荐：常用点数包 ¥29.9 / 45 点</p>
        </div>

        <button
          onClick={() => router.push("/pricing")}
          className="w-full rounded-full bg-primary-lavender px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-lavender-dark"
        >
          购买点数
        </button>
      </div>

      {/* 快捷操作 */}
      <div className="space-y-2 mb-6">
        <button
          onClick={() => router.push("/dashboard")}
          className="w-full rounded-xl border border-border-lavender bg-white px-4 py-3 text-left text-sm font-medium text-text-primary transition hover:bg-gray-50"
        >
          我的订单
        </button>
        <button
          onClick={() => router.push("/pricing")}
          className="w-full rounded-xl border border-border-lavender bg-white px-4 py-3 text-left text-sm font-medium text-text-primary transition hover:bg-gray-50"
        >
          购买套餐
        </button>
      </div>

      {/* 退出登录 */}
      <button
        onClick={handleSignOut}
        disabled={isLoading}
        className="w-full rounded-full border border-red-200 bg-red-50 px-6 py-3 font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "退出中..." : "退出登录"}
      </button>
    </div>
  );
}
