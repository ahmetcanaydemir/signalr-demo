var webpack = require('webpack');
var path = require('path');
module.exports = {
  context: path.resolve(__dirname,"app"),
  entry: "./app.js",
  output: { path: path.resolve("app/dist/"), publicPath: 'dist/',filename: "bundle.js" },
  devtool: 'source-map',
  devServer:{
    contentBase: 'app',
    hot:true,
    watchOptions: {
      poll: true
  },
  inline:true,

    watchContentBase: true
},
plugins: [
  new webpack.HotModuleReplacementPlugin(),
],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: ["babel-loader"] },
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.(jpg|jpeg|png)$/, loader: 'url-loader?limit=100000' },
      { test: /\.(woff|woff2)$/, loader: "url-loader?prefix=font/&limit=5000" },
      { test: /\.ttf$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
      { test: /\.svg$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
      { test: /\.eot$/, loader: "file-loader" }
    ]
  }
};
