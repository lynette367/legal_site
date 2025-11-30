import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/paypal/test
 * 测试接口 - 返回系统状态和配置信息
 */
export async function GET() {
  try {
    // 检查环境变量配置
    const config = {
      clientId: process.env.PAYPAL_CLIENT_ID ? '已配置 ✅' : '未配置 ❌',
      clientSecret: process.env.PAYPAL_CLIENT_SECRET ? '已配置 ✅' : '未配置 ❌',
      mode: process.env.PAYPAL_MODE || '未设置（将使用 sandbox）',
      appUrl: process.env.NEXT_PUBLIC_APP_URL || '未设置',
      publicClientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ? '已配置 ✅' : '未配置 ❌',
      databaseUrl: process.env.DATABASE_URL ? '已配置 ✅' : '未配置 ❌',
    };

    // 检查依赖
    let sdkInstalled = false;
    let prismaInstalled = false;
    try {
      require('@paypal/checkout-server-sdk');
      sdkInstalled = true;
    } catch (e) {
      sdkInstalled = false;
    }
    try {
      require('@prisma/client');
      prismaInstalled = true;
    } catch (e) {
      prismaInstalled = false;
    }

    // 统计数据（从 Prisma 数据库获取）
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
      message: 'PayPal 集成测试接口（Prisma 版本）',
      timestamp: new Date().toISOString(),
      environment: {
        nodeEnv: process.env.NODE_ENV || 'development',
        paypalMode: config.mode,
      },
      configuration: config,
      dependencies: {
        paypalSdk: sdkInstalled ? '已安装 ✅' : '未安装 ❌',
        prisma: prismaInstalled ? '已安装 ✅' : '未安装 ❌',
      },
      database: {
        status: '已连接 ✅',
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
        'PAYPAL-SETUP.md - 快速设置指南',
        'README-PAYPAL.md - 完整集成文档',
        'INTEGRATION-CHECKLIST.md - 集成清单',
      ],
      nextSteps: [
        '1. 配置 .env.local 文件中的 PayPal 凭证',
        '2. 访问 /pricing 页面测试支付流程',
        '3. 使用 PayPal Sandbox 测试账户进行支付',
        '4. 查看订单和 Credits 变化',
      ],
      warnings: config.clientId === '未配置 ❌' ? [
        '⚠️ PayPal Client ID 未配置',
        '⚠️ PayPal Client Secret 未配置',
        '请在 .env.local 中配置 PAYPAL_CLIENT_ID 和 PAYPAL_CLIENT_SECRET',
      ] : [],
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'error',
        message: error.message || '测试失败',
        error: error.toString(),
      },
      { status: 500 }
    );
  }
}

