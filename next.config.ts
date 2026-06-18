import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pdf-parse pulls in pdfjs-dist + a native canvas binary; let Next load it
  // at runtime instead of bundling it into the serverless function.
  serverExternalPackages: ["pdf-parse"],
};

export default nextConfig;
