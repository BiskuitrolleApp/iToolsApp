const EventEmitter = require('eventemitter3')
const log = require('../JsLogger').getLogger('HttpClient.Call')
const Request = require('./Request')

class Call {
  constructor(options) {
    this._em = new EventEmitter()
    this._cancel = undefined
    this._canceled = false
    this._cancelPromise = new Promise(resolve => {
      this._cancel = resolve
    })
    this._executed = false

    this._request = new Request(this, options.requestOptions)
    // let callee = options.requestOptions.context;
    // let request = {
    //   getHeaders:()=>options.requestOptions.headers || {},
    //   getData:()=>options.requestOptions.data,
    //   getUrl:()=>options.requestOptions.url,
    //   getMethod:()=> options.requestOptions.method || 'get',
    //   getTimeout:()=>5000,
    //   getUrlQuery:()=>options.requestOptions.query || {},
    //   cancelPromise: this._cancelPromise,
    //   sendUploadProgress:(e)=>{this._em.emit("upload.progress",e,callee)},
    //   sendDownloadProgress:(e)=>{this._em.emit("download.progress",e,callee)}
    // }

    // this._request = request;
    this._requestInterceptorManager = options.requestInterceptorManager
  }

  cancel(result) {
    this._canceled = true
    this._cancel(result || '操作已取消')
  }

  isCanceled() {
    return this._canceled
  }

  isExecuted() {
    return this._executed
  }

  async execute() {
    this._executed = true
    return await this._requestInterceptorManager.execute(this._request)
  }

  onDownload(fn) {
    this._em.on('download.progress', fn)
  }
  onUpload(fn) {
    this._em.on('upload.progress', fn)
  }
}

module.exports = Call
