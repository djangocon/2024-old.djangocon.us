const Image = require('@11ty/eleventy-img');
const path = require('path');

module.exports = (config) => {
  /*
   * Setup collections
   * https://www.11ty.dev/docs/collections/
   */
  config.addCollection("places", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/places/*.md");
  });

  config.addCollection("presenters", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/presenters/*.md");
  });

  config.addCollection("organizers", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/organizers/*.md");
  });

  config.addCollection("sponsors", function(collectionApi) {
    // TODO: Return these organized by level
    return collectionApi.getFilteredByGlob("src/content/sponsors/*.md");
  });

  /*
   * Setup passthrough file copy
   * https://www.11ty.dev/docs/copy/
   */
  config.addPassthroughCopy("src/assets/img/**/*");
  //config.addPassthroughCopy({"src/content/organizers/*.+(jpg|jpeg|png|webp)": "organizers/"});

  /*
   * Custom watch targets
   * https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets
   */
  config.addWatchTarget("src/assets/js/");

  /*
   * Misc config
  */
  config.addLiquidShortcode("image", async function(
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

          // Return the new filename
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
