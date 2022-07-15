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
      .map((line) => `<p>${line}</p>`);
    return `<div class="columns is-mobile is-multiline m-2">
      <div class="column has-text-right has-text-left-mobile is-12-mobile">
        <h3 class="subtitle has-text-grey">${heading}</h3>
      </div>
      <div class="column has-text-left is-12-mobile">
        <span class="has-text-dark">${lines.join("")}</span>
      </div>
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
