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
        destination: '/tools/ca-demand-letter-template',
        permanent: true,
      },
      {
        source: '/tools/sb988-late-payment-calculator',
        destination: '/tools/ca-late-payment-calculator',
        permanent: true,
      },
      {
        source: '/contracts/freelance-copywriter-contract-template-california',
        destination: '/contracts/freelance-copywriter-contract-template',
        permanent: true,
      },

      // ==========================================
      // 2. PR-01 (P0-1): 33 条确认清理组合页 301 重定向
      // ==========================================

      // Tech Contractor (6 项) -> /contracts/california-tech-contractor-agreement-template
      {
        source: '/contracts/tech-contractor-contract-template-california',
        destination: '/contracts/california-tech-contractor-agreement-template',
        permanent: true,
      },
      {
        source: '/contracts/tech-contractor-late-payment-protection-san-francisco',
        destination: '/contracts/california-tech-contractor-agreement-template',
        permanent: true,
      },
      {
        source: '/contracts/tech-contractor-demand-letter-los-angeles',
        destination: '/contracts/california-tech-contractor-agreement-template',
        permanent: true,
      },
      {
        source: '/contracts/tech-contractor-invoice-dispute-los-angeles',
        destination: '/contracts/california-tech-contractor-agreement-template',
        permanent: true,
      },
      {
        source: '/contracts/tech-contractor-late-payment-protection-sacramento',
        destination: '/contracts/california-tech-contractor-agreement-template',
        permanent: true,
      },
      {
        source: '/contracts/tech-contractor-late-payment-protection-san-diego',
        destination: '/contracts/california-tech-contractor-agreement-template',
        permanent: true,
      },

      // Copywriter (7 项) -> /contracts/freelance-copywriter-contract-template
      {
        source: '/contracts/copywriter-contract-template-orange-county',
        destination: '/contracts/freelance-copywriter-contract-template',
        permanent: true,
      },
      {
        source: '/contracts/copywriter-demand-letter-bay-area',
        destination: '/contracts/freelance-copywriter-contract-template',
        permanent: true,
      },
      {
        source: '/contracts/copywriter-demand-letter-san-diego',
        destination: '/contracts/freelance-copywriter-contract-template',
        permanent: true,
      },
      {
        source: '/contracts/copywriter-double-damages-orange-county',
        destination: '/contracts/freelance-copywriter-contract-template',
        permanent: true,
      },
      {
        source: '/contracts/copywriter-invoice-dispute-sacramento',
        destination: '/contracts/freelance-copywriter-contract-template',
        permanent: true,
      },
      {
        source: '/contracts/copywriter-invoice-dispute-san-francisco',
        destination: '/contracts/freelance-copywriter-contract-template',
        permanent: true,
      },
      {
        source: '/contracts/copywriter-late-payment-protection-los-angeles',
        destination: '/contracts/freelance-copywriter-contract-template',
        permanent: true,
      },

      // Photographer (6 项)
      {
        source: '/contracts/photographer-contract-template-california',
        destination: '/guides/photographers',
        permanent: true,
      },
      {
        source: '/contracts/photographer-late-payment-protection-bay-area',
        destination: '/guides/photographers',
        permanent: true,
      },
      {
        source: '/contracts/photographer-late-payment-protection-los-angeles',
        destination: '/guides/photographers',
        permanent: true,
      },
      {
        source: '/contracts/photographer-demand-letter-san-francisco',
        destination: '/tools/ca-demand-letter-template',
        permanent: true,
      },
      {
        source: '/contracts/photographer-invoice-dispute-orange-county',
        destination: '/contracts/client-refuses-to-pay-freelance-invoice-california',
        permanent: true,
      },
      {
        source: '/contracts/photographer-invoice-dispute-san-diego',
        destination: '/contracts/client-refuses-to-pay-freelance-invoice-california',
        permanent: true,
      },

      // Video Editor (9 项) -> /contracts/la-video-editor-freelance-contract-template
      {
        source: '/contracts/video-editor-contract-template-los-angeles',
        destination: '/contracts/la-video-editor-freelance-contract-template',
        permanent: true,
      },
      {
        source: '/contracts/video-editor-demand-letter-los-angeles',
        destination: '/contracts/la-video-editor-freelance-contract-template',
        permanent: true,
      },
      {
        source: '/contracts/video-editor-demand-letter-orange-county',
        destination: '/contracts/la-video-editor-freelance-contract-template',
        permanent: true,
      },
      {
        source: '/contracts/video-editor-double-damages-silicon-valley',
        destination: '/contracts/la-video-editor-freelance-contract-template',
        permanent: true,
      },
      {
        source: '/contracts/video-editor-invoice-dispute-sacramento',
        destination: '/contracts/la-video-editor-freelance-contract-template',
        permanent: true,
      },
      {
        source: '/contracts/video-editor-invoice-dispute-san-francisco',
        destination: '/contracts/la-video-editor-freelance-contract-template',
        permanent: true,
      },
      {
        source: '/contracts/video-editor-late-payment-protection-bay-area',
        destination: '/contracts/la-video-editor-freelance-contract-template',
        permanent: true,
      },
      {
        source: '/contracts/video-editor-late-payment-protection-california',
        destination: '/contracts/la-video-editor-freelance-contract-template',
        permanent: true,
      },
      {
        source: '/contracts/video-editor-late-payment-protection-san-diego',
        destination: '/contracts/la-video-editor-freelance-contract-template',
        permanent: true,
      },

      // Marketing Freelancer (5 项) -> /contracts/freelance-copywriter-contract-template
      {
        source: '/contracts/marketing-freelancer-contract-template-california',
        destination: '/contracts/freelance-copywriter-contract-template',
        permanent: true,
      },
      {
        source: '/contracts/marketing-freelancer-contract-template-sacramento',
        destination: '/contracts/freelance-copywriter-contract-template',
        permanent: true,
      },
      {
        source: '/contracts/marketing-freelancer-demand-letter-orange-county',
        destination: '/contracts/freelance-copywriter-contract-template',
        permanent: true,
      },
      {
        source: '/contracts/marketing-freelancer-demand-letter-san-francisco',
        destination: '/contracts/freelance-copywriter-contract-template',
        permanent: true,
      },
      {
        source: '/contracts/marketing-freelancer-late-payment-protection-los-angeles',
        destination: '/contracts/freelance-copywriter-contract-template',
        permanent: true,
      },
    
    ]
  },
}

module.exports = nextConfig