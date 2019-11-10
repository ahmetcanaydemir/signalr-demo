module.exports = {
  context: __dirname + "/app",
  entry: "./app.js",
  output: { path: __dirname + "/app/dist", filename: "bundle.js" },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: "babel-loader" },
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
