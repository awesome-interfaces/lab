const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin("style.css");
module.exports = {
  entry: {
    app: "./src/app.ts",
    style: "./sass/style.sass"
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js"
  },
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", "sass"]
  },
  module: {
    loaders: [
      // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.sass$/,
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
  devServer: {
    contentBase: "./build",
    port: 8080
  },
  plugins: [extractSass]
};
