/** @type {import('next').NextConfig} */

const repo = "game-manager";

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
};

export default nextConfig;