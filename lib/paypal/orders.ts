import checkoutNodeJssdk from '@paypal/checkout-server-sdk';
import { paypalClient } from './client';

export interface PayPalLink {
  href?: string;
  rel?: string;
  method?: string;
}

interface PayPalSuccessResponse {
  success: true;
}

export interface PayPalCreateOrderSuccess extends PayPalSuccessResponse {
  orderId: string;
  status: string;
  links?: PayPalLink[];
  result: Record<string, unknown>;
}

export interface PayPalCaptureOrderSuccess extends PayPalSuccessResponse {
  captureId: string;
  status: string;
  payer?: Record<string, unknown>;
  purchaseUnits?: Record<string, unknown>[];
  result: Record<string, unknown>;
}

export interface PayPalGetOrderSuccess extends PayPalSuccessResponse {
  order: Record<string, unknown>;
}

export interface PayPalErrorResponse {
  success: false;
  error: string;
}

export type PayPalCreateOrderResult = PayPalCreateOrderSuccess | PayPalErrorResponse;
export type PayPalCaptureOrderResult = PayPalCaptureOrderSuccess | PayPalErrorResponse;
export type PayPalGetOrderResult = PayPalGetOrderSuccess | PayPalErrorResponse;

/**
 * Create a PayPal order
 */
export async function createPayPalOrder(
  amount: string,
  currency: string = 'USD',
  description: string = 'Legal Service Credits'
): Promise<PayPalCreateOrderResult> {
  const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: currency,
          value: amount,
        },
        description: description,
      },
    ],
    application_context: {
      brand_name: 'Panco Legal Assistant',
      landing_page: 'NO_PREFERENCE',
      user_action: 'PAY_NOW',
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    },
  });

  try {
    const client = paypalClient();
    const response = await client.execute(request);
    const result = response.result as {
      id: string;
      status: string;
      links?: PayPalLink[];
    } & Record<string, unknown>;
    return {
      success: true,
      orderId: result.id,
      status: result.status,
      links: result.links,
      result,
    };
  } catch (error: unknown) {
    console.error('PayPal createOrder error:', error);
    const message =
      error instanceof Error ? error.message : 'Failed to create PayPal order';
    return {
      success: false,
      error: message,
    };
  }
}

/**
 * Capture (complete) a PayPal order
 */
export async function capturePayPalOrder(orderId: string): Promise<PayPalCaptureOrderResult> {
  const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderId);
  // @ts-expect-error - PayPal SDK types require payment_source but it's optional for capture
  request.requestBody({});

  try {
    const client = paypalClient();
    const response = await client.execute(request);
    const result = response.result as {
      id: string;
      status: string;
      payer?: Record<string, unknown>;
      purchase_units?: Record<string, unknown>[];
    } & Record<string, unknown>;
    return {
      success: true,
      captureId: result.id,
      status: result.status,
      payer: result.payer,
      purchaseUnits: result.purchase_units,
      result,
    };
  } catch (error: unknown) {
    console.error('PayPal captureOrder error:', error);
    const message =
      error instanceof Error ? error.message : 'Failed to capture PayPal order';
    return {
      success: false,
      error: message,
    };
  }
}

/**
 * Get PayPal order details
 */
export async function getPayPalOrderDetails(orderId: string): Promise<PayPalGetOrderResult> {
  const request = new checkoutNodeJssdk.orders.OrdersGetRequest(orderId);

  try {
    const client = paypalClient();
    const response = await client.execute(request);
    const result = response.result as Record<string, unknown>;
    return {
      success: true,
      order: result,
    };
  } catch (error: unknown) {
    console.error('PayPal getOrder error:', error);
    const message =
      error instanceof Error ? error.message : 'Failed to get PayPal order details';
    return {
      success: false,
      error: message,
    };
  }
}
