import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
    dest: "public", // 서비스 워커 파일이 생성될 위치
    cacheOnFrontEndNav: true, // 프론트엔드 네비게이션 시 캐싱 여부
    aggressiveFrontEndNavCaching: true,
  })

const nextConfig: NextConfig = {
  
  webpack: (config) => {
    config.parallelism = 1; 
    return config;
  },
  experimental: {
    workerThreads: false, 
    cpus: 1,              
  },
  typescript: { ignoreBuildErrors: true },
  
};

export default withPWA(nextConfig);
