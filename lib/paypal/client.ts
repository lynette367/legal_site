import checkoutNodeJssdk from '@paypal/checkout-server-sdk';

/**
 * PayPal 客户端配置
 * 支持 sandbox 与 live 模式
 */
export function paypalClient() {
  const Environment = process.env.PAYPAL_MODE === 'live'
    ? checkoutNodeJssdk.core.LiveEnvironment
    : checkoutNodeJssdk.core.SandboxEnvironment;

  const client = new checkoutNodeJssdk.core.PayPalHttpClient(
    new Environment(
      process.env.PAYPAL_CLIENT_ID!,
      process.env.PAYPAL_CLIENT_SECRET!
    )
  );

  return client;
}

