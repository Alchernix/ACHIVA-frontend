import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["achivadata.s3.ap-northeast-2.amazonaws.com"],
  },
  // productionBrowserSourceMaps: true,
};

export default nextConfig;
