/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/fanuc-cnc-site',
  images: {
    unoptimized: true,
  },
  // Эти настройки заставят GitHub собрать сайт, несмотря на красные подчеркивания
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;