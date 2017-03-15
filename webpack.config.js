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
          use: 'css-loader!sass-loader',
          fallback: 'style-loader?importLoaders=1'
        })
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new ExtractText('./../styles.css')
  ],
  externals: {
    async: 'commonjs async'
  }
}