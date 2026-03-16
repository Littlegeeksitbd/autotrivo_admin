const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.qrserver.com",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard/ecommerce",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;