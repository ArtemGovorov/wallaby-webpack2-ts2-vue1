Demo showing use of WallabyJS + Webpack 2 + Typsecript 2 + Vue 1

Currently not working!

a) Webpack 2 allows es6 but Wallaby defaults to Node 4

b) Webpack 2 does not allow adding arbitrary property to webpack.config

c) Webpack's loaders do not seem to be working with this demo:
 - unable to resolve `.hbs` files 
 - unable to parse `.hbs` files

NOTE the `()` at the end of this line in `wallaby.js`:
```es6
const webpackConfig = require('./webpack.config')();
```

because we're using the new feature on webpack2 whereby you can pass in an environment variable:
```es6

module.exports = function (env = {}) {

  const isProduction = env.production === true

  return {
    target: 'web',
    devtool: isProduction ? 'eval' : 'cheap-eval-source-map',
    context: __dirname,
    entry: {
   
   etc.
 ```
