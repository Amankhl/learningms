// next.config.mjs
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  webpack(config) {
    config.cache = false;
    return config;
  },
};

export default nextConfig;
