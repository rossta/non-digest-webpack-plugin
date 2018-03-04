const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const _ = require('lodash');
const NonDigestPlugin = require('../index');

const assert = require('chai').assert;
const OUTPUT_DIR = path.join(__dirname, './webpack-out');

const webpackCompile = (config, done) => {
  const defaultConfig = {
    entry: {
      app: './fixtures/app.js',
    },
    context: __dirname,
    output: {
      path: OUTPUT_DIR,
      filename: '[name]-[chunkhash].js',
    },
    plugins: [new NonDigestPlugin()],
  };
  const compiler = webpack(_.merge(defaultConfig, config));

  compiler.run(function(err, stats) {
    assert.isNotOk(err);
    assert.isFalse(stats.hasErrors());
    done(stats);
  });
};

describe('NonDigestPlugin', function() {
  it('exists', function() {
    assert.exists(NonDigestPlugin);
  });

  it('emits nondigest filenames of chunkhash assets', function(done) {
    const config = {
      entry: {
        app: './fixtures/app.js',
      },
    };
    webpackCompile(config, function(stats) {
      const files = ['app.js', `app-${stats.compilation.chunks[0].renderedHash}.js`];
      const contents = files.map(filename =>
        fs.readFileSync(path.join(OUTPUT_DIR, filename)).toString(),
      );
      assert.equal(...contents);
      done();
    });
  });

  afterEach(function() {
    fs.readdir(OUTPUT_DIR, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join(OUTPUT_DIR, file), err => {
          if (err) throw err;
        });
      }
    });
  })
});
