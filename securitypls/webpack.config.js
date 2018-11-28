const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.min.js',
    publicPath: './'
  },
  module: {
    rules: [
        {
          test: /\.(jpg|png)$/, // load images from css, below this 25000 limit it converts into base64, otherwise it only is referer into the file. 
          use: {
            loader: "url-loader",
            options: {
              limit: 25000,
            },
          },
        },
        {
          test: /inline.scss$/, // build up the file into the html file
          use: ['style-loader','css-loader', 'sass-loader']
        },
        {
          test: /main.scss$/,
          use: ExtractTextPlugin.extract({ // build up scss into css and setting up the reference into the html file
            fallback: "style-loader",
            use: ['css-loader', 'sass-loader'],
            publicPath: "/dist"
          })
        }
      ]
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: 'src/scripts', to:'scripts' }, //copy refered files into dist/assets folder
        { from: 'src/assets', to:'assets' },
        { from:'src/server.js', to:'server.js' },
        { from:'src/manifest.json', to:'manifest.json' },
        { from:'src/robots.txt', to:'robots.txt' },
        { from:'src/service-worker.js', to:'service-worker.js' },
        { from:'src/favicon.ico', to:'favicon.ico' }
      ]),
      new HtmlWebpackPlugin({ // extract the html file
      title: 'Security Pls',
      minify: {
        collapseWhitespace: true
      },
      hash: true,
      template: 'src/index.html'
      }),
      new ExtractTextPlugin({ // extract the appended files into the html
        filename: "style.css",
        disable: false,
        allChunks: true
      }),
      new UglifyJsPlugin({
        parallel: true,
        uglifyOptions: {
        ie8: false,
        ecma: 6,
        warnings: true,
        mangle: true,
        output: {
          comments: false,
          beautify: false
          }
        },
        sourceMap: true
    })
  ]
};

module.exports = config;
