import { PrismaClient } from '@prisma/client';

/**
 * Prisma 客户端单例
 * 防止在开发环境中创建多个实例
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

/**
 * 用户 Credits 操作工具
 */
export class UserCreditsService {
  /**
   * 获取用户 Credits 信息
   */
  static async getUserCredits(userId: string) {
    let user = await prisma.user.findUnique({
      where: { id: userId },
    });

    // 如果用户不存在，创建新用户
    if (!user) {
      user = await prisma.user.create({
        data: {
          id: userId,
          totalCredits: 0,
          usedCredits: 0,
          remainingCredits: 0,
        },
      });
    }

    return user;
  }

  /**
   * 增加 Credits（购买套餐）
   */
  static async addCredits(userId: string, amount: number, orderId?: string) {
    const user = await this.getUserCredits(userId);

    // 更新用户 credits
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        totalCredits: user.totalCredits + amount,
        remainingCredits: user.remainingCredits + amount,
      },
    });

    // 创建使用记录
    await prisma.creditUsageRecord.create({
      data: {
        userId,
        orderId,
        amount,
        type: 'purchase',
        description: `购买套餐充值 ${amount} credits`,
      },
    });

    return updatedUser;
  }

  /**
   * 使用 Credits
   */
  static async useCredits(userId: string, amount: number, description: string) {
    const user = await this.getUserCredits(userId);

    // 检查余额是否足够
    if (user.remainingCredits < amount) {
      throw new Error('Credits 余额不足');
    }

    // 更新用户 credits
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        usedCredits: user.usedCredits + amount,
        remainingCredits: user.remainingCredits - amount,
      },
    });

    // 创建使用记录
    await prisma.creditUsageRecord.create({
      data: {
        userId,
        amount: -amount,
        type: 'usage',
        description,
      },
    });

    return updatedUser;
  }

  /**
   * 获取用户使用历史
   */
  static async getUsageHistory(userId: string) {
    return await prisma.creditUsageRecord.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}

