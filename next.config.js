/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [],
  },
  async redirects() {
    return [
      {
        source: '/contracts',
        destination: '/tools/sb988-contract-generator',
        permanent: true,
      },
      {
        source: '/dispute',
        destination: '/tools/sb988-contract-generator',
        permanent: true,
      },
      {
        source: '/documents',
        destination: '/tools/sb988-contract-generator',
        permanent: true,
      },
      {
        source: '/explain',
        destination: '/tools/sb988-contract-generator',
        permanent: true,
      },
      {
        source: '/legal-qa',
        destination: '/tools/sb988-contract-generator',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig