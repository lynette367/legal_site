"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * AI 模块通用逻辑包装器
 * 处理 Credits 消费和用户认证
 */
export function useAIModule() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * 调用 AI API（自动扣除 Credits）
   * @param apiEndpoint - AI API 端点路径（如 "/api/ai/legal-qa"）
   * @param payload - 请求参数
   * @returns AI 生成的内容和状态信息
   */
  const callAIApi = async (
    apiEndpoint: string,
    payload: Record<string, any>
  ): Promise<{ success: boolean; message: string; answer?: string }> => {
    // 检查登录状态
    if (status === "loading") {
      return { success: false, message: "正在加载用户信息..." };
    }

    if (!session) {
      router.push("/login");
      return { success: false, message: "请先登录" };
    }

    setIsProcessing(true);

    try {
      // 调用 AI API（会自动扣除 Credits）
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/login");
          return { success: false, message: "请先登录" };
        }
        if (response.status === 402) {
          return {
            success: false,
            message: "Credits 余额不足，请先充值",
          };
        }
        return { success: false, message: data.error || "AI 调用失败" };
      }

      if (data.success) {
        return {
          success: true,
          message: "AI 生成成功",
          answer: data.answer,
        };
      }

      return { success: false, message: "AI 调用失败" };
    } catch (error) {
      console.error("AI API error:", error);
      return { success: false, message: "网络错误，请稍后重试" };
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * 兼容旧的 consumeCreditsAndExecute（用于不需要 AI 的模块）
   * @deprecated 建议使用 callAIApi
   */
  const consumeCreditsAndExecute = async (
    description: string,
    onSuccess: () => void
  ): Promise<{ success: boolean; message: string }> => {
    if (status === "loading") {
      return { success: false, message: "正在加载用户信息..." };
    }

    if (!session) {
      router.push("/login");
      return { success: false, message: "请先登录" };
    }

    setIsProcessing(true);

    try {
      const response = await fetch("/api/credits/use", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 1,
          description,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/login");
          return { success: false, message: "请先登录" };
        }
        if (response.status === 400 && data.error?.includes("余额不足")) {
          return {
            success: false,
            message: "Credits 余额不足，请先充值",
          };
        }
        return { success: false, message: data.error || "扣费失败" };
      }

      if (data.success) {
        onSuccess();
        return {
          success: true,
          message: `已扣除 1 次调用，剩余 ${data.credits.remainingCredits} Credits`,
        };
      }

      return { success: false, message: "扣费失败" };
    } catch (error) {
      console.error("Credits consumption error:", error);
      return { success: false, message: "网络错误，请稍后重试" };
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    session,
    isLoggedIn: !!session,
    isProcessing,
    callAIApi,
    consumeCreditsAndExecute, // 保留兼容性
  };
}

