const webpack = require('webpack')
module.exports = {
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve("stream-browserify"),
      url: require.resolve("url")
    },
  }
};