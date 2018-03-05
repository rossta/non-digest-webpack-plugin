# Non-Digest Webpack Plugin

Webpack plugin to emit both both digest and non-digest assets.

Given a webpack configuration that emits files with filenames with digests,

```javascript
module.exports = {
  // ...
  output: {
    filename: '[name]-[chunkhash].js
  },

  // ...
  plugins: [
    new NonDigestPlugin()

}
```

this plugin is intended to emit the asset with the canonical filename as well.

```bash
                      Asset     Size  Chunks             Chunk Names
app-3618228d7f2beda4fa0b.js  2.72 kB       0  [emitted]  app
                     app.js  2.72 kB          [emitted]
```

## Install

```bash
npm install --save-dev non-digest-webpack-plugin
```

## Usage

In your webpack configuration:

```javascript
const NonDigestPlugin = require('non-digest-webpack-plugin');

module.exports = {
  // ...
  plugins: [
    new NonDigestPlugin()
  ]
}
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/rossta/non-digest-webpack-plugin. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](contributor-covenant.org) code of conduct.

## License

The package is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
