// Emits assets with hashed filenames as non-digest filenames as well
//
// Adding to end of plugins list ensures that all previously emitted hashed
// assets will be registered prior to executing the NonDigestAssetsPlugin.

function NonDigestPlugin() {}

const CHUNKHASH_REGEX = /(-[a-z0-9]{20}\.{1}){1}/;

NonDigestPlugin.prototype.apply = function(compiler) {
  compiler.plugin('emit', function(compilation, callback) {
    // Explore each compiled asset in build output:
    Object.entries(compilation.assets).forEach(function([filename, asset]) {
      if (!CHUNKHASH_REGEX.test(filename)) return;

      // only for filenames matching CHUNKHASH_REGEX
      const nonDigestFilename = filename.replace(CHUNKHASH_REGEX, '.');
      compilation.assets[nonDigestFilename] = asset;
    });

    callback();
  });
};

module.exports = NonDigestPlugin;
