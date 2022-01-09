const webpack = require('webpack')
 

   module.exports = function override(config, env) {
   
console.log('webpack config overrides')
    
      config.resolve.fallback = {
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "os": require.resolve("os-browserify/browser"),
        "url": require.resolve("url"),
        "assert": require.resolve("assert/"),
      };
      config.plugins = [...config.plugins, new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"]
        ,
        process: "process/browser",
      }) ]
      return config
  };
