import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts", // 서비스 워커 소스 파일 위치
  swDest: "public/sw.js", // 생성될 파일
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  // 메모리 부족 에러 방지 설정 유지
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
  typescript: { ignoreBuildErrors: true },

};
export default withSerwist(nextConfig);
