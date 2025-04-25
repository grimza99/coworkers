import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  images: {
    domains: ['sprint-fe-project.s3.ap-northeast-2.amazonaws.com/'],
  },
  /* config options here */
  // 다른 설정이 있을 경우 추가
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.(js|ts|tsx|jsx)$/],
      },
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
