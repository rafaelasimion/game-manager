const repo = "game-manager";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
  trailingSlash: true,
};

export default nextConfig;