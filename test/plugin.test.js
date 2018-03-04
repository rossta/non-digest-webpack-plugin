const webpack = require('webpack')
const plugin = require('../index')

const assert = require('chai').assert

describe('NonDigestPlugin', function() {
  it('exists', function() {
    assert.exists(plugin)
  })
})
