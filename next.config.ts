import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "export", // Enables static export
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;