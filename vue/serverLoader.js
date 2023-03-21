const config = require('./config')

module.exports = function (source) {
  /** 静态资源地址 */
  return `
    ${source
      // .replace(/\@image/ig, config.imageUrl)
      .replace(/localFileUrl/ig, config.localFileUrl)
      .replace(/reqUrl/ig, config.requestUrl)
      .replace(/useSdcard/ig, config.useSdcard)
    }
  `
}