const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './src/js/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img',
              limit: 10000,
            },
          },
          'img-loader',
        ],
      },
      // {
      //   test: /\.(jpe?g|png|gif|svg)$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {}
      //     }
      //   ]
      // },
      {
        test: /\.hbs$/,
        exclude: /node_modules/,
        use: 'handlebars-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin('build'),
    new HtmlWebpackPlugin({
      inject: true,
      hash: true,
      template: './src/index.html',
    }),
  ],
  devServer: {
    publicPath: '/',
    historyApiFallback: true,
    noInfo: false,
    quiet: false,
    stats: 'errors-only',
    clientLogLevel: 'warning',
    compress: true,
    port: 9000,
  },
};