const axios = require('axios')
// import { attrNameCamel, attrNameSnake } from '@/utils/api.js'

function preRequest(request, chain) {
  let cancel = undefined
  let config = {
    url: request.getUrl(),
    headers: request.getHeaders(),
    params: request.getUrlQuery(),
    data: request.getData(),
    method: request.getMethod(),
    timeout: request.getTimeout(),
    onUploadProgress: e => request.sendUploadProgress(e),
    onDownloadProgress: e => request.sendDownloadProgress(e),
    validateStatus: status => true,
    cancelToken: new axios.CancelToken(cancelExecutor => {
      cancel = cancelExecutor
    })
  }
  request.cancelPromise.then(result => {
    cancel(result)
  })

  return axios.request(config).then(rsp => {
    return {
      // data: attrNameCamel(rsp.data),
      data: rsp.data,
      status: rsp.status,
      statusText: rsp.statusText,
      headers: rsp.headers
    }
  })
}

module.exports = httpConfig => {
  return {
    preRequest
  }
}
