"use client";

import { useSession } from "next-auth/react";
import { LoginPanel } from "./LoginPanel";
import { PageHero } from "../ui/PageHero";
import Link from "next/link";

/**
 * 登录页面内容组件
 * 根据登录状态显示不同内容：
 * - 已登录：显示已登录提示
 * - 未登录：显示登录邮件发送界面
 */
export function LoginPageContent() {
  const { data: session, status } = useSession();
  const isLoggedIn = !!session;
  const isLoading = status === "loading";

  // 加载中状态
  if (isLoading) {
    return (
      <>
        <PageHero
          overline="Account"
          title="用户登录"
          description="正在检查登录状态..."
          highlights={["安全访问", "0 免费次数", "行为验证码"]}
        />
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3 text-text-primary/60">
            <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>检查登录状态...</span>
          </div>
        </div>
      </>
    );
  }

  // 已登录：显示已登录提示
  if (isLoggedIn) {
    return (
      <>
        <PageHero
          overline="Account"
          title="用户登录"
          description="您已登录，可直接访问用户中心。"
          highlights={["安全访问", "0 免费次数", "行为验证码"]}
        />
        <div className="flex justify-center">
          <div className="w-full max-w-md rounded-3xl border border-border-lavender bg-bg-card p-8 shadow-soft">
            <div className="text-center">
              {/* 成功图标 */}
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-text-primary">您已登录</h2>
              <p className="mt-3 text-text-primary/70">
                当前账号：<span className="font-medium text-text-lavender">{session.user?.email}</span>
              </p>
              <p className="mt-2 text-sm text-text-primary/60">
                您已登录，可直接访问用户中心。
              </p>

              <div className="mt-8">
                <Link
                  href="/dashboard"
                  className="block w-full rounded-full bg-primary-lavender px-6 py-3 font-semibold text-white transition hover:bg-primary-lavender-dark"
                >
                  进入用户中心
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // 未登录：显示登录邮件发送界面
  return (
    <>
      <PageHero
        overline="Account"
        title="用户登录"
        description="使用邮箱登录，首次登录将自动注册。登录后即可进入用户中心，查看剩余点数并进行调用。系统不会提供免费额度，所有点数需通过套餐或按次购买获得。"
        highlights={["安全访问", "0 免费次数", "行为验证码"]}
      />
      <div className="flex justify-center">
        <LoginPanel />
      </div>
    </>
  );
}
