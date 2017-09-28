const path = require("path")
const Webpack = require("webpack")
const DashboardPlugin = require("webpack-dashboard/plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const postcssImport = require("postcss-import")
const postcssUrl = require("postcss-url")
const postcssCssnext = require("postcss-cssnext")

const isProduction = (process.env.NODE_ENV === "production")
const host = process.env.APP_HOST || "localhost"
const entryPath = path.resolve(__dirname, "src/app/", "app.js")
const buildDirectory = "/dist"
const buildPath = path.resolve(__dirname, "dist")

const config = {
  devtool: (isProduction) ? "source-map" : "eval",
  entry: (isProduction) ? entryPath :[
    // For hot style updates
    "webpack/hot/dev-server",
    // The script refreshing the browser on none hot updates
    "webpack-dev-server/client?http://" + host + ":3001",
    // Our application
    entryPath,
  ],
  devServer : {
    publicPath: buildDirectory,
    contentBase: "./src/",
    hot: true,
    quiet: false,
    noInfo: true,
    stats: {
      colors: true,
    },
    proxy: {
      "/lcs-api": {
        target: "http://localhost:3000",
        pathRewrite: {"^/lcs-api" : ""},
        secure: false,
      },
      "/public": {
        target: "http://localhost:3000",
        secure: false,
      },
      "/socket.io": {
        target: "http://localhost:3000",
        secure: false,
      },
      "/upload": {
        target: "http://localhost:3000",
        secure: false,
      },
      "/download": {
        target: "http://localhost:3000",
        secure: false,
      },
    },
  },
  output: {
    path: buildPath,
    filename: "script.js",
    publicPath: (isProduction) ? buildDirectory : "/",
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: [
          /(node_modules|unitTest)/,
          path.resolve(__dirname, "src/app/libs/"),
        ],
        loader: "eslint",
      },
    ],
    loaders: [
      // Js
      {
        test: /\.js$/,
        exclude: [
          /(node_modules|unitTest)/,
        ],
        loaders: ["ng-annotate", "babel?compact=false"],
      },
      // Json
      {
        test: /\.json$/,
        loaders: [
          "json",
        ],
      },
      // Css
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          "style",
          "css",
          "postcss?from=src/assets/stylesheets/*.css"),
      },
      // Html
      {
        test: /\.html$/,
        loader: "html?" + JSON.stringify({
          attrs: ["img:src", "img:ng-src"],
        }),
      },
      // Fonts
      {
        test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader : "file",
      },
      // Images
      {
        test: /\.(ico|jpe?g|png|gif)$/,
        loader: "file",
      },
    ],
  },
  postcss: (loader) => {
    return [
      postcssImport({
        addDependencyTo: loader,
      }),
      postcssUrl,
      postcssCssnext,
    ]
  },
}

if (isProduction) {
  config.plugins = [
    new Webpack.optimize.DedupePlugin(),
    new Webpack.optimize.UglifyJsPlugin({
      minimize: true,
      mangle: false,
    }),
    new ExtractTextPlugin("style.css"),
    new DashboardPlugin(),
  ]
} else {
  config.plugins = [
    new ExtractTextPlugin("style.css", {disable: !isProduction}),
    new Webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin(),
  ]
}

module.exports = config
