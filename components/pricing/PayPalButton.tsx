"use client";

import { useEffect, useState } from "react";

interface PayPalButtonProps {
  planId: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

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
      console.error('PayPal Client ID not configured');
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    script.onerror = () => {
      console.error('Failed to load PayPal SDK');
      onError?.({ message: 'Failed to load PayPal SDK' });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [onError]);

  useEffect(() => {
    if (!sdkReady) return;

    // 渲染 PayPal 按钮
    const container = document.getElementById('paypal-button-container');
    if (!container || container.children.length > 0) return;

    const paypal = (window as any).paypal;
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

            const data = await response.json();
            if (!response.ok || !data.success) {
              throw new Error(data.error || 'Failed to create order');
            }

            return data.paypalOrderId;
          } catch (error: any) {
            console.error('Error creating order:', error);
            onError?.(error);
            throw error;
          } finally {
            setIsLoading(false);
          }
        },
        // 批准后捕获订单
        onApprove: async (data: any) => {
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

            const result = await response.json();
            if (!response.ok || !result.success) {
              throw new Error(result.error || 'Failed to capture order');
            }

            onSuccess?.(result);
          } catch (error: any) {
            console.error('Error capturing order:', error);
            onError?.(error);
          } finally {
            setIsLoading(false);
          }
        },
        // 取消支付
        onCancel: (data: any) => {
          console.log('Payment cancelled:', data);
          setIsLoading(false);
        },
        // 错误处理
        onError: (err: any) => {
          console.error('PayPal error:', err);
          onError?.(err);
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

