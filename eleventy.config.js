const Image = require('@11ty/eleventy-img');
const path = require('path');

module.exports = (eleventyConfig) => {
  /*
    Setup collections
    https://www.11ty.dev/docs/collections/
  */
  eleventyConfig.addCollection("places", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/places/*.md");
  });

  eleventyConfig.addCollection("presenters", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/presenters/*.md");
  });

  eleventyConfig.addCollection("organizers", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/organizers/*.md").filter(item => !item.data.hidden);
  });

  eleventyConfig.addCollection("sponsors", function(collectionApi) {
    // TODO: Return these organized by level
    return collectionApi.getFilteredByGlob("src/content/sponsors/*.md");
  });

  /*
    Setup passthrough file copy
    https://www.11ty.dev/docs/copy/
  */
  eleventyConfig.addPassthroughCopy("src/assets/img/**/*");
  eleventyConfig.addPassthroughCopy("src/assets/favicons/");

  /*
    Setup watch targets
    https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets
  */
  eleventyConfig.addWatchTarget("src/assets/js/");

  /*
    Shortcodes
  */
  eleventyConfig.addLiquidShortcode("year", () => `${new Date().getFullYear()}`);

  // TODO: Accept widths or support different widths
  eleventyConfig.addLiquidShortcode("image", async function(
    src,
    outputDir,
    urlPath,
    alt,
    sizes,
    classes = "") {
      let metadata = await Image(src, {
        widths: [300, 600],
        formats: ["webp"],
        outputDir,
        urlPath,
        filenameFormat: function (id, src, width, format, options) {
          // Get the original filename without the extension
          const originalFilename = path.basename(src, path.extname(src));

          return `${originalFilename}-${width}.${format}`;
        },
      });

      let imageAttributes = {
        class: classes,
        alt,
        sizes,
        loading: "lazy",
        decoding: "async",
      };

    return Image.generateHTML(metadata, imageAttributes);
  });

  return {
    dir: {
      input: "src",
      output: "dist",
      layouts:  '_layouts',
    },

    // Use Liquid for templating
    // https://www.11ty.dev/docs/languages/liquid/
    htmlTemplateEngine: "liquid",
    markdownTemplateEngine: "liquid"
  }
};
