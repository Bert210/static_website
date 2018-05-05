const path = require("path");
const glob = require("glob");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

const extractPug = new ExtractTextPlugin({
  filename: "[name].html",
  disable: process.env.NODE_ENV === "development"
});

const extractSass = new ExtractTextPlugin({
  filename: "[name].css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = {
  // mode: "development",

  entry: glob.sync("./src/pug/*.pug"),
  // output: {
  //   path: path.resolve(__dirname, "dist"),
  //   filename: "bundle.js"
  // },
  // your config settings ...
  module: {
    rules: [
      //Pug
      {
        test: /\.pug$/,
        use: extractPug.extract({
          use: [
            {
              loader: "html-loader"
            },
            {
              loader: "pug-html-loader"
            }
          ]
        })
      },
      //Sass
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "sass-loader"
            }
          ],
          // use style-loader in development
          fallback: "style-loader"
        })
      }
    ]
  },
  plugins: [
    extractPug,
    extractSass,
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      // ./public directory is being served
      host: "localhost",
      port: 8000,
      server: { baseDir: ["dist"] }
    })
  ]
};
