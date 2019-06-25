const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./client/src"),
  output: {
    path: path.resolve(__dirname, "./client/dist"),
    filename: "bundle.js"
  },
	module: {
		rules: [{
        test: /\.js[x]?/,
        exclude: /node_modules/,
        use:{
          loader: "babel-loader",
          options: {
            "presets": [
              [
                "@babel/preset-env",
                {
                  "targets": {
                    "browsers": [
                      ">0.25%",
                      "not ie 11",
                      "not op_mini all"
                    ]
                  }
                }
              ],
              "@babel/preset-react"
            ],
            "plugins": [
              "@babel/plugin-transform-runtime"
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
      }]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	}
}