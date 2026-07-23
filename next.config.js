/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [],
  },
  
  async redirects() {
    return [

      // ==========================================
      // 1. 旧路径 ➔ 新路径的精准映射 (改名后的重定向)
      // ==========================================
      
      // 合规与法规目录重命名
      {
        source: '/independent-contractor-laws',
        destination: '/compliance',
        permanent: true,
      },
      {
        source: '/independent-contractor-laws/:slug*', // 匹配子页面（如动态路由）
        destination: '/compliance/:slug*',
        permanent: true,
      },

      // 小额法庭指南改名
      {
        source: '/guides/sb988-small-claims-guide',
        destination: '/guides/ca-contractor-small-claims',
        permanent: true,
      },

      // 工具重命名 / 去除 sb988 前缀
      {
        source: '/tools/sb988-contract-generator',
        destination: '/contracts/generator', // 迁移到新 contracts 目录
        permanent: true,
      },
      {
        source: '/tools/sb988-demand-letter-generator',
        destination: '/tools/demand-letter-generator',
        permanent: true,
      },
      {
        source: '/tools/sb988-late-payment-calculator',
        destination: '/tools/late-payment-calculator',
        permanent: true,
      },
    
    ]
  },
}

module.exports = nextConfig