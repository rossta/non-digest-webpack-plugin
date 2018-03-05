const path = require('path');
const NonDigestPlugin = require('../../index')
const OUTPUT_DIR = path.join(__dirname, '../webpack-out');

module.exports = {
  entry: {
    app: './app.js',
  },
  context: __dirname,
  output: {
    path: OUTPUT_DIR,
    filename: '[name]-[chunkhash].js',
  },
  plugins: [new NonDigestPlugin()],
};
