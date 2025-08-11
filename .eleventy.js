const htmlmin = require('html-minifier-terser');

module.exports = function (eleventyConfig) {
  // Copy images and CSS to the output
  eleventyConfig.addPassthroughCopy('src/images');
  eleventyConfig.addPassthroughCopy('src/css');

  // Add date filter
  eleventyConfig.addFilter('date', (date) => {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d)) return '';
    const day = d.getDate();
    const month = d.toLocaleDateString('en-US', { month: 'long' });
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  });
  // Create collections for each category
  eleventyConfig.addCollection('writing', function (collectionApi) {
    return collectionApi.getFilteredByGlob('src/writing/*.md').reverse();
  });

  eleventyConfig.addCollection('photography', function (collectionApi) {
    return collectionApi.getFilteredByGlob('src/photography/*.md').reverse();
  });

  eleventyConfig.addCollection('music', function (collectionApi) {
    return collectionApi.getFilteredByGlob('src/music/*.md').reverse();
  });

  eleventyConfig.addCollection('ai-archive', function (collectionApi) {
  return collectionApi.getFilteredByGlob('src/ai-archive/*.md').reverse();
  });

  // Minify HTML in production builds
  eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
    if (
      process.env.NODE_ENV === 'production' &&
      outputPath &&
      outputPath.endsWith('.html')
    ) {
      return htmlmin.minify(content, {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
      });
    }
    return content;
  });

  return {
    dir: {
      input: 'src',
      output: '_site',
    },
  };
};
