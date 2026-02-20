import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  redirects() {
    return [
      {
        source: '/',
        destination: '/tecnico',
        permanent: true,
      }
    ]
  },
};

export default nextConfig;
