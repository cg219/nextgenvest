const path = require('path');
const ExtractText = require('extract-text-webpack-plugin');

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'public/js/')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: ExtractText.extract({
          use: 'sass-loader'
          fallback: 'css-loader'
        })
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new ExtractText('styles.css')
  ],
  externals: {
    async: 'commonjs async'
  }
}