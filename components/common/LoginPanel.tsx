"use client";

import { useState, useCallback } from "react";
import { signIn } from "next-auth/react";

interface LoginPanelProps {
  onClose?: () => void;
}

/**
 * 登录面板组件
 * 仅用于未登录用户发送登录邮件
 */
export function LoginPanel({ onClose }: LoginPanelProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleEmailLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证邮箱格式
    if (!email || !email.includes("@")) {
      setError("请输入有效的邮箱地址");
      return;
    }
    
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      console.log("[LoginPanel] 开始登录流程，邮箱:", email);
      
      const result = await signIn("email", {
        email: email.trim().toLowerCase(),
        redirect: false,
        callbackUrl: "/dashboard",
      });

      console.log("[LoginPanel] signIn 结果:", result);

      if (result?.error) {
        console.error("[LoginPanel] 登录错误:", result.error);
        if (result.error === "EmailSignin") {
          setError("邮件发送失败，请检查邮箱配置或稍后重试");
        } else if (result.error === "Configuration") {
          setError("服务器配置错误，请联系管理员");
        } else {
          setError(`登录失败: ${result.error}`);
        }
      } else if (result?.ok) {
        setMessage("✅ 验证邮件已发送！请检查您的邮箱（包括垃圾邮件文件夹）。");
      } else {
        setError("登录请求失败，请稍后重试");
      }
    } catch (err) {
      console.error("[LoginPanel] 登录异常:", err);
      setError("网络错误，请检查网络连接后重试");
    } finally {
      setIsLoading(false);
    }
  }, [email]);

  return (
    <div className="w-full max-w-md rounded-3xl border border-border-lavender bg-bg-card p-8 shadow-soft">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-primary">登录 / 注册</h2>
        <p className="mt-2 text-sm text-text-primary/70">
          使用邮箱登录，首次登录将自动注册
        </p>
        <p className="mt-1 text-sm text-text-primary/60">
          请通过邮件中的登录链接完成登录。
        </p>
      </div>

      <form onSubmit={handleEmailLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
            邮箱地址
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            disabled={isLoading}
            className="w-full rounded-xl border border-border-lavender bg-white px-4 py-3 text-text-primary placeholder:text-text-primary/40 focus:border-primary-lavender focus:outline-none focus:ring-2 focus:ring-primary-lavender/20 disabled:opacity-50"
          />
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {message && (
          <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-600">
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !email}
          className="w-full rounded-full bg-primary-lavender px-6 py-3 font-semibold text-white transition hover:bg-primary-lavender-dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
              发送中...
            </>
          ) : (
            "发送登录邮件"
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-text-primary/60">
        <p>点击"发送登录邮件"即表示您同意我们的</p>
        <p className="mt-1">
          <a href="/terms" className="text-primary-lavender hover:underline">
            服务条款
          </a>
          {" 和 "}
          <a href="/privacy" className="text-primary-lavender hover:underline">
            隐私政策
          </a>
        </p>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="mt-4 w-full rounded-full border border-border-lavender px-6 py-3 font-semibold text-text-primary transition hover:bg-gray-50"
        >
          取消
        </button>
      )}
    </div>
  );
}
