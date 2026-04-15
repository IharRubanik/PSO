import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const cspHeader = {
  key: "Content-Security-Policy",
  value: [
    "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https:",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self' https: blob:",
    "worker-src 'self' blob:",
    "frame-src 'self'",
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
      { source: "/admin", headers: [cspHeader] },
      { source: "/admin/:path*", headers: [cspHeader] },
    ];
  },
};

export default withPayload(nextConfig);
