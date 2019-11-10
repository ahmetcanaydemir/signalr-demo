const karmaWebpack = require("karma-webpack");
const webpackConfig = require("./webpack.config");
module.exports = function(config) {
  config.set({
    basePath: "./app",
    files: [
      "../node_modules/angular/angular.js",
      "../node_modules/angular-resource/angular-resource.js",
      "../node_modules/angular-resource/angular-messages.js",
      "../node_modules/angular-route/angular-route.js",
      "../node_modules/angular-mocks/angular-mocks.js",
      "**/*.module.js",
      "*!(.module|.spec).js",
      "**/*.spec.js"
    ],

    autoWatch: true,

    frameworks: ["jasmine"],

    browsers: ["Chrome", "Firefox"],

    preprocessors: {
      "**/*.spec.js": ["webpack"]
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
      stats: "verbose"
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    singleRun: false,
    concurrency: Infinity
  });
};
