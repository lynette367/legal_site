import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "验证邮件已发送｜Panco 法律助手",
  description: "请检查您的邮箱以完成登录",
};

/**
 * 邮箱验证请求页面
 * 用户提交邮箱后显示此页面
 */
export default function VerifyRequestPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-border-lavender bg-bg-card p-8 shadow-soft text-center">
        {/* 邮件图标 */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary-lavender to-primary-lavender-dark">
          <svg
            className="h-10 w-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>

        <h1 className="mb-4 text-2xl font-bold text-text-primary">
          验证邮件已发送
        </h1>

        <p className="mb-6 text-text-primary/70">
          我们已向您的邮箱发送了一封登录邮件。
          <br />
          请点击邮件中的链接完成登录。
        </p>

        <div className="mb-6 rounded-xl bg-amber-50 border border-amber-200 p-4">
          <p className="text-sm text-amber-700">
            <strong>提示：</strong>如果没有收到邮件，请检查垃圾邮件文件夹。
            邮件可能需要几分钟才能到达。
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href="/login"
            className="block w-full rounded-full border border-border-lavender px-6 py-3 font-semibold text-text-primary transition hover:bg-gray-50"
          >
            返回登录页面
          </Link>

          <Link
            href="/"
            className="block text-sm text-primary-lavender hover:underline"
          >
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}

