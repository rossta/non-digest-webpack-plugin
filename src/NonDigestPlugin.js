// Emits assets with hashed filenames as non-digest filenames as well
//
// Adding to end of plugins list ensures that all previously emitted hashed
// assets will be registered prior to executing the NonDigestAssetsPlugin.

function NonDigestPlugin() {}

const CHUNKHASH_REGEX = /(-[a-z0-9]{20}\.{1}){1}/;

NonDigestPlugin.prototype.apply = function(compiler) {
  const emit = (compilation, callback) => {
    // Explore each compiled asset in build output:
    Object.entries(compilation.assets).forEach(([filename, asset]) => {
      if (!CHUNKHASH_REGEX.test(filename)) return;

      // only for filenames matching CHUNKHASH_REGEX
      const nonDigestFilename = filename.replace(CHUNKHASH_REGEX, '.');
      compilation.assets[nonDigestFilename] = asset;
    });

    callback();
  }

  if (compiler.hooks) { // Webpack 4
    compiler.hooks.emit.tapAsync('NonDigestPlugin', emit)
  } else { // Webpack 3
    compiler.plugin('emit', emit);
  }
};

module.exports = NonDigestPlugin;
