/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Это создаст папку 'out' при сборке
  basePath: '/fanuc-cnc-site', // ВАЖНО: это имя твоего репозитория на GitHub
  images: {
    unoptimized: true, // Нужно, чтобы картинки работали на бесплатном хостинге GitHub
  },
};

module.exports = nextConfig;