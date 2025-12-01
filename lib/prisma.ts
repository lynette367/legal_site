import { PrismaClient } from '@prisma/client';

/**
 * Prisma 客户端单例
 * 采用懒加载，避免在构建阶段读取 DATABASE_URL
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  // 在构建阶段（Next.js build），不检查 DATABASE_URL，避免构建失败
  // 只在运行时检查
  if (typeof window === 'undefined' && process.env.NEXT_PHASE !== 'phase-production-build') {
    if (!process.env.DATABASE_URL) {
      console.warn('DATABASE_URL environment variable is not set');
    }
  }

  return new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });
}

function getPrismaClient(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }
  return globalForPrisma.prisma;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    // 延迟初始化，只在实际使用时创建客户端
    const client = getPrismaClient();
    const value = Reflect.get(client, prop, receiver);
    return typeof value === 'function' ? value.bind(client) : value;
  },
});

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
   * 扣除 Credits
   */
  static async deductCredits(userId: string, amount: number, description: string) {
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
