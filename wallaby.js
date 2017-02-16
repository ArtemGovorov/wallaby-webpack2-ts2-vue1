const wallabyWebpack = require('wallaby-webpack');
const webpackConfig = require('./webpack.config')();

console.log({webpackConfig})

module.exports = function (wallaby) {
  console.log({wallaby})
  const wallabyPostprocessor = wallabyWebpack(webpackConfig);
  return {
    files: [
      {pattern: 'tsconfig.json', load: false},
      {pattern: 'src/**/*.ts', load: false}
    ],

    env: {
      type: 'browser'
    },

    tests: [
      //{pattern: 'src/**/*.spec.ts', load: false}, // interspersing tests in code
      {pattern: 'test/**/*.spec.ts', load: false},
    ],

    postprocessor: wallabyPostprocessor,

    setup: function () {
      window.__moduleBundler.loadTests();
    },

    hints: {
      ignoreCoverage: /ignore coverage/
    },

    debug: true
  };
};
