const nextConfig = {
  images: {
    domains: ["vercel.com", "assets.vercel.com"],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  devIndicators: false
}

module.exports = nextConfig
