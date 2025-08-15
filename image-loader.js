const imageLoader = ({ src, width, quality }) => {
  // For static export, return the src as-is without optimization
  return src;
};

module.exports = imageLoader;