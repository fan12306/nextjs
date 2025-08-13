import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // 仅在客户端构建时处理
    if (!isServer) {
      // 将 fs 模块设置为空模块
      config.resolve.fallback = { ...config.resolve.fallback, fs: false };
    }
    return config;
  },
  serverExternalPackages: ['@copilotkit/runtime'],
  experimental: {
    // 可以在这里添加其他实验性配置
  },
};

export default nextConfig;
