module.exports = {
  optimizeFonts: false,
  images: {
    // unoptimized: true,
    loader: 'cloudinary',
    path: '/',
  },
  // target: 'serverless',
  async rewrites() {
    return [
      // Rewrite everything to `pages/index`
      {
        source: '/:any*',
        destination: '/',
      },
    ];
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.md$/,
      type: 'javascript/auto',
      // test: /\.mjs$/,
      include: /node_modules/,
      use: 'frontmatter-markdown-loader',
    });

    return config;
  },
};
