# PayPal 库文件说明

## client.ts

PayPal 客户端配置文件，提供 PayPal HTTP 客户端实例。

**功能:**
- 根据环境变量自动选择 Sandbox 或 Live 环境
- 使用 PayPal Client ID 和 Secret 初始化客户端

**使用示例:**
```typescript
import { paypalClient } from '@/lib/paypal/client';

const client = paypalClient();
```

## orders.ts

PayPal 订单操作工具函数集合。

**主要函数:**

### createPayPalOrder()
创建 PayPal 订单

**参数:**
- `amount`: string - 订单金额
- `currency`: string - 货币类型（默认 'USD'）
- `description`: string - 订单描述

**返回:**
```typescript
{
  success: boolean;
  orderId?: string;        // PayPal Order ID
  status?: string;
  links?: Array<{          // 支付链接
    rel: string;
    href: string;
  }>;
  error?: string;
}
```

### capturePayPalOrder()
捕获（完成）PayPal 订单支付

**参数:**
- `orderId`: string - PayPal Order ID

**返回:**
```typescript
{
  success: boolean;
  captureId?: string;
  status?: string;
  payer?: object;          // 付款人信息
  purchaseUnits?: array;   // 购买单元
  error?: string;
}
```

### getPayPalOrderDetails()
查询 PayPal 订单详情

**参数:**
- `orderId`: string - PayPal Order ID

**返回:**
```typescript
{
  success: boolean;
  order?: object;          // 完整订单信息
  error?: string;
}
```

## 使用流程

```typescript
// 1. 创建订单
const createResult = await createPayPalOrder('9.90', 'USD', '基础包');
if (createResult.success) {
  const approveUrl = createResult.links?.find(l => l.rel === 'approve')?.href;
  // 跳转到 approveUrl 让用户支付
}

// 2. 用户支付后，捕获订单
const captureResult = await capturePayPalOrder(createResult.orderId!);
if (captureResult.success) {
  // 支付成功，为用户增加 credits
}

// 3. 查询订单状态
const queryResult = await getPayPalOrderDetails(orderId);
console.log(queryResult.order?.status); // CREATED, APPROVED, COMPLETED
```

## 环境变量

需要配置以下环境变量：

```bash
PAYPAL_CLIENT_ID=your_client_id
PAYPAL_CLIENT_SECRET=your_secret
PAYPAL_MODE=sandbox  # 或 live
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

