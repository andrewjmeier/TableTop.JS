var webpack = require("webpack");

module.exports = {
    entry: "./src/monopoly.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    plugins: [
    new webpack.DefinePlugin({
      // Force HTMLtoJSX to use the in-browser `document` object rather than
      // require the Node-only "jsdom" package.
      IN_BROWSER: true,

      // Expose the version to embed in the final file.
      TURBO_REACT_VERSION: JSON.stringify(require("./package.json").version)
    })
  ],
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};
