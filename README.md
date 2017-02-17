Demo showing use of WallabyJS + Webpack 2 + Typsecript 2 + Vue 1

Status:

Works as long as you have absolute paths to templates!!

Currently throws this error:

```
Error: Cannot find module "/./App.hbs"
at undefined:66

Module not found: Error: Can't resolve '/./App.hbs' in './src/view'Error
```

Notes:

a) Webpack 2 allows es6 but Wallaby defaults to Node 4
  - therefore change the defaule Wallabyjs node version

b) Webpack 2 does not allow adding arbitrary property to webpack.config, so adding `ts` won't work.

c) Webpack 2 allows passing an `env` variable, in which case you're exporting a function so `wallaby.js` needs to call that function:

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
