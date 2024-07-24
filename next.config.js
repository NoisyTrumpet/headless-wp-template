const { withFaust, getWpHostname } = require("@faustwp/core");

/** @type {import('next').NextConfig} */
module.exports = withFaust({
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: true,
  trailingSlash: true,
  eslint: {
    dirs: ["components", "pages", "fragments", "lib", "styles", "utilities"],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: getWpHostname(),
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_WORDPRESS_URL,
        port: '',
        pathname: '/**',
      },
    ],
  },
  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
});
