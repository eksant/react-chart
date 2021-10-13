const fs = require('fs');
const path = require('path');
const lessToJS = require('less-vars-to-js');
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
} = require('customize-cra');

const defaultStyle = lessToJS(
  fs.readFileSync('./src/assets/styles/default.less', 'utf8')
);
const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    lessOptions: { javascriptEnabled: true, modifyVars: defaultStyle },
  }),
  addWebpackAlias({ '@': resolve('src') })
);
