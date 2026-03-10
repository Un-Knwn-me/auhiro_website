/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for AWS Amplify SSR deployment
  output: "standalone",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // Supabase Storage domains (add your Supabase project URL)
    domains: ["localhost"],
  },

  // Optimize for serverless
  experimental: {
    // Reduce cold start times
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },

  // Environment variables validation
  env: {
    CUSTOM_ENV: process.env.CUSTOM_ENV,
  },
};

export default nextConfig;
