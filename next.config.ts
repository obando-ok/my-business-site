// next.config.js

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "yourdomain.com",       // <- your production domain
      "cdn.jsdelivr.net",     // <- external font/image CDN if used
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizeCss: true,        // Faster builds & cleaner output
    serverActions: true,      // If using server components/actions
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        { key: "X-XSS-Protection", value: "1; mode=block" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ],
    },
  ],
};

module.exports = withBundleAnalyzer(nextConfig);
