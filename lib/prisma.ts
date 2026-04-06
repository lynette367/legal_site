import { PrismaClient } from '@prisma/client';

/**
 * Prisma client singleton
 * Lazily loaded to avoid reading DATABASE_URL during build
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  // Skip DATABASE_URL checks during build to avoid failures; check at runtime instead
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
    // Lazy init: create client only when first accessed
    const client = getPrismaClient();
    const value = Reflect.get(client, prop, receiver);
    return typeof value === 'function' ? value.bind(client) : value;
  },
});

/**
 * User Credits helper
 */
export class UserCreditsService {
  /**
   * Get user Credits info
   */
  static async getUserCredits(userId: string) {
    let user = await prisma.user.findUnique({
      where: { id: userId },
    });

    // Create user if not found
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
   * Add Credits (purchase)
   */
  static async addCredits(userId: string, amount: number, orderId?: string) {
    const user = await this.getUserCredits(userId);

    // Update user credits
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        totalCredits: user.totalCredits + amount,
        remainingCredits: user.remainingCredits + amount,
      },
    });

    // Create usage record
    await prisma.creditUsageRecord.create({
      data: {
        userId,
        orderId,
        amount,
        type: 'purchase',
        description: `Purchased package: +${amount} credits`,
      },
    });

    return updatedUser;
  }

  /**
   * Deduct Credits
   */
  static async deductCredits(userId: string, amount: number, description: string) {
    const user = await this.getUserCredits(userId);

    // Check balance
    if (user.remainingCredits < amount) {
      throw new Error('Insufficient Credits');
    }

    // Update user credits
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        usedCredits: user.usedCredits + amount,
        remainingCredits: user.remainingCredits - amount,
      },
    });

    // Create usage record
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
   * Get user usage history
   */
  static async getUsageHistory(userId: string) {
    return await prisma.creditUsageRecord.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
