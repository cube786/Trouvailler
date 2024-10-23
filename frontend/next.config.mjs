/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    optimizeFonts: true,
    experimental: {
      scrollRestoration: false,
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "img.freepik.com",
        },
        {
          protocol: "https",
          hostname: "lh3.googleusercontent.com",
        },
        {
          protocol: "https",
          hostname: "res.cloudinary.com",
        }
      ],
      minimumCacheTTL: 1500000,
    },
};

export default nextConfig;
