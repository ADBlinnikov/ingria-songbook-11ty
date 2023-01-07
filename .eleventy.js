module.exports = function (eleventyConfig) {
  // Watch CSS files for changes
  eleventyConfig.setBrowserSyncConfig({
    files: "./_site/css/**/*.css",
  });

  // Pass through files
  eleventyConfig.addPassthroughCopy({ "src/_public": "/" });
  eleventyConfig.addPassthroughCopy({ "node_modules/@11ty/is-land/is-land.js": "/is-land.js" });

  // Shortcodes
  eleventyConfig.addPairedShortcode("verse", function (content, heading) {
    const lines = content
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => `<div>${line}</div>`);
    return `<div class="block container">
        <h3 class="subtitle has-text-grey">${heading}</h3>
        ${lines.join("")}
    </div>`;
  });

  // Collections
  eleventyConfig.addCollection("hymnsGroup", function (collectionApi) {
    const col = collectionApi.getFilteredByGlob("src/hymns/*.njk");
    col.sort((a, b) => parseInt(a.data.name) - parseInt(b.data.name));
    // const result = new Map(col.map((i) => [i.data.section, i]));
    const groupedCollection = col.reduce(
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
      input: "src",
      output: "_site",
    },
  };
};
