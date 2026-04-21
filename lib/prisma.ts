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