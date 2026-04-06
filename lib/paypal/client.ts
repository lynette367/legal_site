import checkoutNodeJssdk from '@paypal/checkout-server-sdk';

/**
 * PayPal client configuration
 * Supports sandbox and live modes
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
