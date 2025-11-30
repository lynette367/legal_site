import checkoutNodeJssdk from '@paypal/checkout-server-sdk';
import { paypalClient } from './client';

/**
 * 创建 PayPal 订单
 */
export async function createPayPalOrder(
  amount: string,
  currency: string = 'USD',
  description: string = 'Legal Service Credits'
) {
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
      brand_name: 'Panco 法律助手',
      landing_page: 'NO_PREFERENCE',
      user_action: 'PAY_NOW',
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    },
  });

  try {
    const client = paypalClient();
    const response = await client.execute(request);
    return {
      success: true,
      orderId: response.result.id,
      status: response.result.status,
      links: response.result.links,
      result: response.result,
    };
  } catch (error: any) {
    console.error('PayPal createOrder error:', error);
    return {
      success: false,
      error: error.message || 'Failed to create PayPal order',
    };
  }
}

/**
 * 捕获（完成）PayPal 订单支付
 */
export async function capturePayPalOrder(orderId: string) {
  const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  try {
    const client = paypalClient();
    const response = await client.execute(request);
    return {
      success: true,
      captureId: response.result.id,
      status: response.result.status,
      payer: response.result.payer,
      purchaseUnits: response.result.purchase_units,
      result: response.result,
    };
  } catch (error: any) {
    console.error('PayPal captureOrder error:', error);
    return {
      success: false,
      error: error.message || 'Failed to capture PayPal order',
    };
  }
}

/**
 * 查询 PayPal 订单详情
 */
export async function getPayPalOrderDetails(orderId: string) {
  const request = new checkoutNodeJssdk.orders.OrdersGetRequest(orderId);

  try {
    const client = paypalClient();
    const response = await client.execute(request);
    return {
      success: true,
      order: response.result,
    };
  } catch (error: any) {
    console.error('PayPal getOrder error:', error);
    return {
      success: false,
      error: error.message || 'Failed to get PayPal order details',
    };
  }
}

