export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/paypal/test
 * Test endpoint - returns system status and configuration details
 */
export async function GET() {
  try {
    // Check env configuration
    const config = {
      clientId: process.env.PAYPAL_CLIENT_ID ? 'Configured ✅' : 'Not configured ❌',
      clientSecret: process.env.PAYPAL_CLIENT_SECRET ? 'Configured ✅' : 'Not configured ❌',
      mode: process.env.PAYPAL_MODE || 'Not set (will use sandbox)',
      appUrl: process.env.NEXT_PUBLIC_APP_URL || 'Not set',
      publicClientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ? 'Configured ✅' : 'Not configured ❌',
      databaseUrl: process.env.DATABASE_URL ? 'Configured ✅' : 'Not configured ❌',
    };

    // Check dependencies
    let sdkInstalled = false;
    let prismaInstalled = false;
    try {
      await import('@paypal/checkout-server-sdk');
      sdkInstalled = true;
    } catch {
      sdkInstalled = false;
    }
    try {
      await import('@prisma/client');
      prismaInstalled = true;
    } catch {
      prismaInstalled = false;
    }

    // Stats from Prisma
    const totalOrders = await prisma.order.count();
    const completedOrders = await prisma.order.count({ where: { status: 'completed' } });
    const pendingOrders = await prisma.order.count({ where: { status: 'pending' } });
    const failedOrders = await prisma.order.count({ where: { status: 'failed' } });
    const totalUsers = await prisma.user.count();
    const totalCreditsAggregate = await prisma.user.aggregate({
      _sum: { totalCredits: true },
    });

    const stats = {
      totalOrders,
      completedOrders,
      pendingOrders,
      failedOrders,
      totalUsers,
      totalCreditsIssued: totalCreditsAggregate._sum.totalCredits || 0,
    };

    return NextResponse.json({
      status: 'ok',
      message: 'PayPal integration test endpoint (Prisma)',
      timestamp: new Date().toISOString(),
      environment: {
        nodeEnv: process.env.NODE_ENV || 'development',
        paypalMode: config.mode,
      },
      configuration: config,
      dependencies: {
        paypalSdk: sdkInstalled ? 'Installed ✅' : 'Not installed ❌',
        prisma: prismaInstalled ? 'Installed ✅' : 'Not installed ❌',
      },
      database: {
        status: 'Connected ✅',
        type: 'SQLite (dev) / PostgreSQL (prod)',
      },
      statistics: stats,
      endpoints: {
        create: '/api/paypal/create',
        capture: '/api/paypal/capture',
        query: '/api/paypal/query',
        test: '/api/paypal/test',
      },
      documentation: [
        'PAYPAL-SETUP.md - Quick setup guide',
        'README-PAYPAL.md - Full integration docs',
        'INTEGRATION-CHECKLIST.md - Integration checklist',
      ],
      nextSteps: [
        '1. Configure PayPal credentials in .env.local',
        '2. Visit /pricing to test the payment flow',
        '3. Pay with a PayPal Sandbox test account',
        '4. Review order records and Credits balance',
      ],
      warnings: config.clientId === 'Not configured ❌' ? [
        '⚠️ PayPal Client ID is not configured',
        '⚠️ PayPal Client Secret is not configured',
        'Please configure PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET in .env.local',
      ] : [],
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Test failed';
    return NextResponse.json(
      {
        status: 'error',
        message,
        error: error instanceof Error ? error.toString() : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
