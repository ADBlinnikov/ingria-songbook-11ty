module.exports = function (eleventyConfig) {
  // Watch CSS files for changes
  eleventyConfig.setBrowserSyncConfig({
    files: "./_site/css/**/*.css",
  });

  // Pass through files
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("scripts");

  // Shortcodes
  eleventyConfig.addPairedShortcode("verse", function (content, heading) {
    const lines = content
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => `<div>${line}</div>`);
    return `<div class="block container is-fluid">
        <h3 class="subtitle has-text-grey">${heading}</h3>
        ${lines.join("")}
    </div>`;
  });

  // Collections
  eleventyConfig.addCollection("hymnsGroup", function (collectionApi) {
    var collection = collectionApi.getFilteredByGlob("src/hymns/*.njk");
    const groupedCollection = collection.reduce(
      (entryMap, e) =>
        entryMap.set(e.data.section, [
          ...(entryMap.get(e.data.section) || []),
          e,
        ]),
      new Map()
    );
    return groupedCollection;
  });

  return {
    dir: {
      input: 'src',
      output: '_site'
    }
  };
};
