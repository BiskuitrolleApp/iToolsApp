const log = require('../JsLogger').getLogger('HttpClient.Plugin.Log')

async function preRequest(request, chain) {
  //console.time("HttpClient.Plugin.Log");
  log.trace(`Begin request url:${request.getUrl()}`)
  let response = await chain(request)
  //console.timeEnd("HttpClient.Plugin.Log");
  return response
}

module.exports = config => {
  return {
    preRequest
  }
}
