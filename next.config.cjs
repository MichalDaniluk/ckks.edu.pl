module.exports = {
  output: 'export',
  poweredByHeader: false,
  reactStrictMode: true,
  concurrentFeatures: true,
  trailingSlash: false,
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './image-loader.js',
  },

  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
  esmExternals: true,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx', 'js', 'jsx'],

  // Exclude API directory from build
  experimental: {
    externalDir: false,
  },
  async redirects() {
    return [
      {
        source: '/szkolenia-sportowe',
        destination: '/kursy-i-szkolenia?search=sport',
        permanent: true,
      },
      {
        source: '/oswiata',
        destination: '/kursy-i-szkolenia?search=oswiata',
        permanent: true,
      },
      {
        source: '/szkolenia-instruktorskie',
        destination: '/kursy-i-szkolenia?search=instruktorskie',
        permanent: true,
      },
      {
        source: '/trenerskie',
        destination: '/kursy-i-szkolenia?search=trenerskie',
        permanent: true,
      },
      {
        source: '/szkolenia',
        destination: '/kursy-i-szkolenia?search=fizjoterapia',
        permanent: true,
      },
      {
        source: '/online',
        destination: '/kursy-i-szkolenia?search=on-line',
        permanent: true,
      },
      {
        source: '/podyplomowe',
        destination: '/kursy-i-szkolenia?search=podyplomowe',
        permanent: true,
      },
    ];
  },
};
