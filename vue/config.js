const PRO_STATUS = process.env.PRO_STATUS

console.log('当前环境：', PRO_STATUS == 'temp' ? '本地开发环境' : PRO_STATUS == 'sit' ? '手机测试环境' : '部署环境')

const tempConfig = {
    localFileUrl: 'http://localhost:8080',
    requestUrl: 'http://localhost:3000',
    useSdcard: false,
}
const sitConfig = {
    localFileUrl: 'http://localhost:8080',
    requestUrl: 'http://localhost:3000',
    useSdcard: true,
}
const prodConfig = {
    localFileUrl: 'http://localhost:8080',
    requestUrl: 'http://localhost:3000',
    useSdcard: true,
}

/** 项目配置 */
const config = PRO_STATUS == 'temp' ? tempConfig : PRO_STATUS == 'sit' ? sitConfig : prodConfig
console.log('项目配置', config)
module.exports = config