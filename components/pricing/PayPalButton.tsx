"use client";

import { useEffect, useState } from "react";

type JsonObject = Record<string, unknown>;

interface PayPalCreateOrderSuccess {
  success: true;
  paypalOrderId: string;
}

interface PayPalApiError {
  success?: false;
  error?: string;
}

type PayPalCreateOrderResponse = PayPalCreateOrderSuccess | PayPalApiError;

export interface PayPalCaptureSuccess {
  success: true;
  credits?: {
    totalCredits: number;
    usedCredits: number;
    remainingCredits: number;
    [key: string]: unknown;
  };
  order?: JsonObject;
  captureDetails?: JsonObject;
}

type PayPalCaptureResponse = PayPalCaptureSuccess | PayPalApiError;

interface PayPalApproveData {
  orderID: string;
}

interface PayPalButtonsInstance {
  render: (selector: string) => void;
}

interface PayPalButtonsOptions {
  style?: {
    layout?: "vertical" | "horizontal";
    color?: "blue" | "gold" | "silver" | "white" | "black";
    shape?: "rect" | "pill";
    label?: "paypal" | "checkout" | "buynow" | "pay";
  };
  createOrder: () => Promise<string>;
  onApprove: (data: PayPalApproveData) => Promise<void>;
  onCancel?: (data: PayPalApproveData) => void;
  onError?: (error: Error) => void;
}

interface PayPalNamespace {
  Buttons: (options: PayPalButtonsOptions) => PayPalButtonsInstance;
}

declare global {
  interface Window {
    paypal?: PayPalNamespace;
  }
}

interface PayPalButtonProps {
  planId: string;
  onSuccess?: (data: PayPalCaptureSuccess) => void;
  onError?: (error: Error) => void;
}

const toError = (error: unknown, fallbackMessage: string): Error =>
  error instanceof Error ? error : new Error(fallbackMessage);

/**
 * PayPal 支付按钮组件
 * 集成 PayPal JavaScript SDK
 * 注意：需要用户已登录，userId 从 session 中自动获取
 */
export function PayPalButton({ planId, onSuccess, onError }: PayPalButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    // 加载 PayPal SDK
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    if (!clientId) {
      const error = new Error('PayPal Client ID not configured');
      console.error(error.message);
      onError?.(error);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    script.onerror = () => {
      const error = new Error('Failed to load PayPal SDK');
      console.error(error.message);
      onError?.(error);
    };

    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [onError]);

  useEffect(() => {
    if (!sdkReady) return;

    // 渲染 PayPal 按钮
    const container = document.getElementById('paypal-button-container');
    if (!container || container.children.length > 0) return;

    const paypal = window.paypal;
    if (!paypal) return;

    paypal
      .Buttons({
        style: {
          layout: 'vertical',
          color: 'blue',
          shape: 'rect',
          label: 'paypal',
        },
        // 创建订单（userId 从 session 中自动获取）
        createOrder: async () => {
          setIsLoading(true);
          try {
            const response = await fetch('/api/paypal/create', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                planId,
              }),
            });

            const data: PayPalCreateOrderResponse = await response.json();
            if (!response.ok || !data.success || !data.paypalOrderId) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              throw new Error((data as any).error || 'Failed to create order');
            }

            return data.paypalOrderId;
          } catch (error: unknown) {
            const err = toError(error, 'Failed to create order');
            console.error('Error creating order:', err);
            onError?.(err);
            throw err;
          } finally {
            setIsLoading(false);
          }
        },
        // 批准后捕获订单
        onApprove: async (data: PayPalApproveData) => {
          setIsLoading(true);
          try {
            const response = await fetch('/api/paypal/capture', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                paypalOrderId: data.orderID,
              }),
            });

            const result: PayPalCaptureResponse = await response.json();
            if (!response.ok || !result?.success) {
              throw new Error(result.error || 'Failed to capture order');
            }

            onSuccess?.(result);
          } catch (error: unknown) {
            const err = toError(error, 'Failed to capture order');
            console.error('Error capturing order:', err);
            onError?.(err);
          } finally {
            setIsLoading(false);
          }
        },
        // 取消支付
        onCancel: (data: PayPalApproveData) => {
          console.log('Payment cancelled:', data);
          setIsLoading(false);
        },
        // 错误处理
        onError: (err: Error | unknown) => {
          const error = toError(err, 'PayPal error');
          console.error('PayPal error:', error);
          onError?.(error);
          setIsLoading(false);
        },
      })
      .render('#paypal-button-container');
  }, [sdkReady, planId, onSuccess, onError]);

  if (!sdkReady) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="text-sm text-text-primary/70">加载 PayPal...</div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div id="paypal-button-container"></div>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80">
          <div className="text-sm text-text-primary">处理中...</div>
        </div>
      )}
    </div>
  );
}
