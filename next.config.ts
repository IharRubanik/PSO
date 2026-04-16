import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const cspHeader = {
  key: "Content-Security-Policy",
  value: [
    "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https:",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https:",
    "style-src 'self' 'unsafe-inline' https:",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data: https:",
    "connect-src 'self' https: blob: wss:",
    "worker-src 'self' blob: data:",
    "frame-src 'self' https:",
  ].join("; "),
};

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    unoptimized: true,
  },
  async headers() {
    return [
      { source: "/:path*", headers: [cspHeader] },
    ];
  },
};

export default withPayload(nextConfig);
