/**
 * 订单类型定义
 * 注意：实际数据存储已迁移到 Prisma
 * 此文件保留类型定义以便向后兼容
 */

/**
 * 订单记录类型
 * @deprecated 请使用 Prisma 的 Order 模型
 */
export interface OrderRecord {
  id: string;
  userId: string;
  planId: string;
  planName: string;
  credits: number;
  amount: string | number;
  currency: string;
  paypalOrderId?: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  capturedAt?: Date;
  errorMessage?: string;
}

/**
 * 用户 Credits 类型
 * @deprecated 请使用 Prisma 的 User 模型
 */
export interface UserCredits {
  userId: string;
  totalCredits: number;
  usedCredits: number;
  remainingCredits: number;
  lastUpdated: Date;
}

/**
 * Credits 使用记录类型
 * @deprecated 请使用 Prisma 的 CreditUsageRecord 模型
 */
export interface CreditUsageRecord {
  id: string;
  userId: string;
  orderId?: string;
  amount: number;
  type: 'purchase' | 'usage' | 'refund' | 'adjustment';
  description: string;
  createdAt: Date;
}

/**
 * @deprecated InMemoryStore 已被 Prisma 数据库替代
 * 
 * 迁移说明：
 * - 所有订单数据现在存储在 Prisma 数据库中
 * - 使用 prisma.order 替代 InMemoryStore.createOrder()
 * - 使用 prisma.user 替代 InMemoryStore.getUserCredits()
 * - 使用 UserCreditsService 替代 InMemoryStore.addCredits()
 * 
 * 详见：lib/prisma.ts
 */
export class InMemoryStore {
  static createOrder() {
    throw new Error('InMemoryStore 已废弃，请使用 Prisma: prisma.order.create()');
  }

  static getOrder() {
    throw new Error('InMemoryStore 已废弃，请使用 Prisma: prisma.order.findUnique()');
  }

  static getOrderByPaypalId() {
    throw new Error('InMemoryStore 已废弃，请使用 Prisma: prisma.order.findUnique({ where: { paypalOrderId } })');
  }

  static updateOrder() {
    throw new Error('InMemoryStore 已废弃，请使用 Prisma: prisma.order.update()');
  }

  static getUserOrders() {
    throw new Error('InMemoryStore 已废弃，请使用 Prisma: prisma.order.findMany({ where: { userId } })');
  }

  static getUserCredits() {
    throw new Error('InMemoryStore 已废弃，请使用 Prisma: UserCreditsService.getUserCredits()');
  }

  static addCredits() {
    throw new Error('InMemoryStore 已废弃，请使用 Prisma: UserCreditsService.addCredits()');
  }

  static useCredits() {
    throw new Error('InMemoryStore 已废弃，请使用 Prisma: UserCreditsService.deductCredits()');
  }

  static getUsageHistory() {
    throw new Error('InMemoryStore 已废弃，请使用 Prisma: UserCreditsService.getUsageHistory()');
  }
}
