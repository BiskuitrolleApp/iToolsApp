/*
 * @Descripttion: 
 * @version: 
 * @Author: kevinzheng
 * @Date: 2022-04-06 16:44:36
 * @LastEditors: kevinzheng
 * @LastEditTime: 2022-04-06 17:23:20
 */
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