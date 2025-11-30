# PayPal API 路由说明

## 概述

本目录包含三个 PayPal 支付相关的 API 路由，构成完整的支付流程。

## API 端点

### 1. POST /api/paypal/create

创建 PayPal 订单并生成支付链接。

**请求体:**
```json
{
  "planId": "basic",      // 套餐 ID（必需）
  "userId": "user_123"    // 用户 ID（必需）
}
```

**响应 (成功):**
```json
{
  "success": true,
  "orderId": "order_1234567890_abc",           // 内部订单 ID
  "paypalOrderId": "8XY12345AB678901C",         // PayPal 订单 ID
  "approveUrl": "https://www.paypal.com/...",   // 支付链接
  "plan": {
    "id": "basic",
    "name": "基础包",
    "credits": 10,
    "amount": "9.9"
  }
}
```

**响应 (失败):**
```json
{
  "error": "错误信息"
}
```

**流程:**
1. 验证 planId 和 userId
2. 查找对应套餐信息
3. 创建内部订单记录
4. 调用 PayPal API 创建订单
5. 返回支付链接

---

### 2. POST /api/paypal/capture

捕获（完成）PayPal 订单支付，并为用户增加 credits。

**请求体:**
```json
{
  "paypalOrderId": "8XY12345AB678901C"  // PayPal 订单 ID（必需）
}
```

**响应 (成功):**
```json
{
  "success": true,
  "order": {
    "id": "order_1234567890_abc",
    "userId": "user_123",
    "status": "completed",
    "credits": 10,
    "capturedAt": "2025-11-28T10:30:00Z",
    ...
  },
  "credits": {
    "userId": "user_123",
    "totalCredits": 10,
    "usedCredits": 0,
    "remainingCredits": 10,
    ...
  },
  "captureDetails": {
    "captureId": "...",
    "status": "COMPLETED",
    "payer": {...}
  }
}
```

**响应 (失败):**
```json
{
  "error": "错误信息"
}
```

**流程:**
1. 查找内部订单记录
2. 验证订单状态（防止重复支付）
3. 调用 PayPal API 捕获支付
4. 更新订单状态为 completed
5. 为用户增加对应 credits
6. 返回完整结果

---

### 3. GET /api/paypal/query

查询订单详情和用户 credits。

**查询参数（三选一）:**
- `orderId`: 内部订单 ID
- `paypalOrderId`: PayPal 订单 ID
- `userId`: 用户 ID（返回该用户所有订单）

**示例请求:**
```
GET /api/paypal/query?userId=user_123
GET /api/paypal/query?orderId=order_1234567890_abc
GET /api/paypal/query?paypalOrderId=8XY12345AB678901C
```

**响应 (单个订单):**
```json
{
  "success": true,
  "order": {
    "id": "order_1234567890_abc",
    "userId": "user_123",
    "planId": "basic",
    "status": "completed",
    ...
  },
  "paypalDetails": {
    "id": "8XY12345AB678901C",
    "status": "COMPLETED",
    "payer": {...},
    ...
  }
}
```

**响应 (用户所有订单):**
```json
{
  "success": true,
  "orders": [
    { /* 订单1 */ },
    { /* 订单2 */ }
  ],
  "credits": {
    "userId": "user_123",
    "totalCredits": 20,
    "usedCredits": 5,
    "remainingCredits": 15
  }
}
```

**流程:**
1. 根据参数类型查询订单
2. 如果有 PayPal Order ID，获取 PayPal 端详情
3. 返回完整信息

## 测试示例

使用 curl 测试：

```bash
# 1. 创建订单
curl -X POST http://localhost:3000/api/paypal/create \
  -H "Content-Type: application/json" \
  -d '{"planId":"basic","userId":"test_user"}'

# 2. 查询用户订单
curl "http://localhost:3000/api/paypal/query?userId=test_user"

# 3. 捕获支付（需要真实的 PayPal Order ID）
curl -X POST http://localhost:3000/api/paypal/capture \
  -H "Content-Type: application/json" \
  -d '{"paypalOrderId":"YOUR_PAYPAL_ORDER_ID"}'
```

## 错误处理

所有 API 都会返回统一的错误格式：

```json
{
  "error": "错误描述信息"
}
```

常见错误：
- `400`: 缺少必需参数
- `404`: 订单不存在
- `500`: 服务器错误或 PayPal API 调用失败

## 安全注意事项

1. **生产环境必须添加：**
   - 用户身份验证
   - 订单归属验证
   - 请求频率限制
   - IP 白名单（对于 webhook）

2. **敏感信息：**
   - 永远不要在前端暴露 PayPal Secret
   - 所有支付逻辑在服务器端处理

3. **日志记录：**
   - 记录所有支付操作
   - 保存 PayPal 响应用于审计

## 数据库集成建议

当前使用内存存储（`InMemoryStore`），生产环境建议：

```typescript
// Prisma 示例
import { prisma } from '@/lib/prisma';

// 创建订单
const order = await prisma.order.create({
  data: {
    userId,
    planId,
    // ...
  }
});

// 更新订单
await prisma.order.update({
  where: { id: orderId },
  data: { status: 'completed' }
});
```

## Webhook 集成（可选）

为了处理异步事件（如退款、争议），建议添加 webhook：

```typescript
// app/api/paypal/webhook/route.ts
export async function POST(request: NextRequest) {
  const body = await request.json();
  
  // 验证 webhook 签名
  // 处理不同事件类型
  switch (body.event_type) {
    case 'PAYMENT.CAPTURE.COMPLETED':
      // 处理支付成功
      break;
    case 'PAYMENT.CAPTURE.REFUNDED':
      // 处理退款
      break;
    // ...
  }
}
```

