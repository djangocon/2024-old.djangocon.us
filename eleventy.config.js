const path = require('path');

const Image = require('@11ty/eleventy-img');
const markdownIt = require("markdown-it");

module.exports = (eleventyConfig) => {
  /*
    Setup collections
    https://www.11ty.dev/docs/collections/
  */
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/posts/*.md");
  });

  eleventyConfig.addCollection("places", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/places/*.md");
  });

  eleventyConfig.addCollection("presenters", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/presenters/*.md");
  });

  eleventyConfig.addCollection("organizers", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/organizers/*.md").filter(item => !item.data.hidden);
  });

  eleventyConfig.addCollection("sponsorsByLevel", function(collectionApi) {
    const sponsors = collectionApi.getFilteredByGlob("src/content/sponsors/*.md");

    const visibleSponsors = sponsors.filter(sponsor => !sponsor.data.hidden);

    // TODO: Sort sponsors by date, ascending
    return visibleSponsors.reduce((acc, sponsor) => {
      const level = sponsor.data.level;
      if (!acc[level]) {
        acc[level] = [];
      }
      acc[level].push(sponsor);
      return acc;
    }, {});
  });

  /*
    Setup passthrough file copy
    https://www.11ty.dev/docs/copy/
  */
  eleventyConfig.addPassthroughCopy("src/assets/img/**/*");
  eleventyConfig.addPassthroughCopy("src/assets/favicons/");
  eleventyConfig.addPassthroughCopy({ "src/content/sponsors/*.{png,jpg,jpeg,svg}": "sponsors/" });

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

  /*
    Filters
  */
  eleventyConfig.addFilter("markdown", function(content = "") {
    let markdown = markdownIt({
      html: true,
      breaks: true,
      linkify: true
    });

    return markdown.render(content);
  });

  /*
    Misc configuration
  */
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->"
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
