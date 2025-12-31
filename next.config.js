/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/fanuc-cnc-site',
  images: {
    unoptimized: true,
  },
  // Добавляем эти две настройки ниже:
  eslint: {
    ignoreDuringBuilds: true, // Игнорировать ошибки оформления
  },
  typescript: {
    ignoreBuildErrors: true, // Игнорировать ошибки типов
  },
};

module.exports = nextConfig;