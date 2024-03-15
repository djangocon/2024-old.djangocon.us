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
  config.addPassthroughCopy('src/assets/img/**/*');

  /*
   * Custom watch targets
   * https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets
   */
  config.addWatchTarget("src/assets/js/");

  /*
   * Misc config
  */

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
