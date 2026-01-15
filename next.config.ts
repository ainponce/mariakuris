import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize package imports to avoid loading entire barrel files (bundle-barrel-imports)
  // This transforms `import { motion } from 'framer-motion'` to direct imports at build time
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
};

export default nextConfig;
