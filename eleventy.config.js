module.exports = (config) => {
  /*
   * Setup collections
   * https://www.11ty.dev/docs/collections/
   */
  config.addCollection("places", function(collectionApi) {
    return collectionApi.getFilteredByGlob("_data/places/*.md");
  });

  config.addCollection("organizers", function(collectionApi) {
    return collectionApi.getFilteredByGlob("_data/organizers/*.md");
  });

  config.addCollection("sponsors", function(collectionApi) {
    return collectionApi.getFilteredByGlob("_data/sponsors/*.md");
  });

  config.addCollection("presenters", function(collectionApi) {
    return collectionApi.getFilteredByGlob("_data/presenters/*.md");
  });

  /*
   * Setup passthrough file copy
   * https://www.11ty.dev/docs/copy/
   */
  config.addPassthroughCopy('assets/img/**/*');

  /*
   * Custom watch targets
   * https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets
   */
  config.addWatchTarget("/assets/js/");

  /*
   * Template aliases
   */
  config.addLayoutAlias('default', 'default.html');

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