const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),
  devServer: {
    contentBase: path.resolve(__dirname, "./public"),
    historyApiFallback: true
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader", "file-loader"]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  output: {
    filename: "bundle.js"
  }
};
