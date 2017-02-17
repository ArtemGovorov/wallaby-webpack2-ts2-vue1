const webpack = require('webpack');
const path = require('path');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require("webpack/lib/LoaderOptionsPlugin")
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
//const autoprefixer = require('autoprefixer');
const UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin")


module.exports = function (env = {}) {

  console.log({env})
  const isProduction = env.production === true

  return {
    target: 'web',
    devtool: isProduction ?  'source-map': 'cheap-module-source-map',
    context: __dirname,
    entry: {
      main: './src/main.ts'
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'awesome-typescript-loader',
          //use: 'ts-loader',
          exclude: [/\.(spec|e2e)\.ts$/, /node_modules$/]
        },
        {
          // support for .html as raw text 
          // NB: also sending hbs through here so that it DOES NOT interpret it (that would also need hbs-loader) 
          test: /\.(html|hbs)$/,
          use: 'raw-loader',
          exclude: ['src/index.html', /node_modules$/]
        },
        {
          test: /\.css$/,
          exclude: [/node_modules$/],
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.less$/,
          exclude: [/node_modules$/],
          use: [
            "style-loader",
            "css-loader",
            "less-loader"
          ]
        },
        {
          test: /\.(woff2?|ttf|eot|svg)$/,
          use: 'url?limit=10000',
          exclude: [/node_modules$/]
        },
      ]
    }
    ,
    resolve: {
      extensions: ['.ts', '.js', '.json', '.css', '.less', '.scss', '.sass', '.html']
    }
    ,
    resolveLoader: {
      // fallback: [path.join(__dirname, './node_modules')]
    },
    plugins: [
      new CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module) {
          return module.context && module.context.indexOf('node_modules') !== -1;
        }
      }),
      // static assets
      new CopyWebpackPlugin([
        {from: 'src/assets', to: 'assets'},
      ]),
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      }),
      new ProvidePlugin({
        Vue: 'vue'
      }),
      new DefinePlugin({
        'process.env': {
          'production': isProduction,
          'build_timestamp': JSON.stringify(new Date().toString())
        }
      }),
      new LoaderOptionsPlugin({
        minimize: isProduction,
        debug: !isProduction
      }),
      new UglifyJsPlugin({
        compress: {
          warnings: true,
        },
        output: {
          comments: false
        },
        sourceMap: !isProduction
      }),
    ],
    //stats: 'verbose',
    devServer: {
      compress: true,
      contentBase: path.join(__dirname, "src"),
      historyApiFallback: true,
      hot: true,
      port: 8081,
      publicPath: '/',
      watchOptions: {
        aggregateTimeout: 300, poll: 1000
      }
    }
  }
}
