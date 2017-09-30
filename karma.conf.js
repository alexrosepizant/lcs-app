module.exports = function(config) {
  config.set({

    basePath: "",
    browsers: ["PhantomJS"],
    frameworks: ["browserify", "jasmine"],
    reporters: ["mocha"],

    port: 9876,
    colors: true,
    logLevel: config.LOG_WARN,
    autoWatch: true,
    singleRun: false,

    files: [
      "test/init.js",
      "node_modules/angular-mocks/angular-mocks.js",
      "test/**/test.js",
    ],

    exclude: [],

    preprocessors: {
      "test/init.js": ["browserify"],
      "node_modules/angular-mocks/angular-mocks.js": ["browserify"],
      "test/**/*test.js": ["browserify"],
    },

    browserify: {
      debug: true,
      transform: ["babelify", "stringify"],
    },
  })
}