/** @type {import('next').NextConfig} */

import config from './config/path.config.cjs';

const nextConfig = {
  output: 'export',
  distDir: config.staticDirectoryName,
  reactStrictMode: true,
  swcMinify: true
};

export default nextConfig;
