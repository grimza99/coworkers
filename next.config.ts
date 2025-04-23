import type { NextConfig } from 'next';
import type { Configuration } from 'webpack';
/*
  npm install 해주셔야합니다.
*/

const nextConfig: NextConfig = {
  webpack(config: Configuration) {
    config.module?.rules?.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
