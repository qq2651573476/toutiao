// vue.config.js
const path = require('path')
const themePaht = path.join(__dirname, './src/themw.less')

module.exports = {
  publicPath: './',
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 直接覆盖变量
          // 'nav-bar-background-color': '#007bff'
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          hack: `true; @import "${themePaht}";`
        }
      }
    }
  }
}
