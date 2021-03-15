class Request {
  constructor(caller, options) {
    this.cancelPromise = caller._cancelPromise
    this._em = caller._em
    this.callee = options.context
    this.name = options.name || ''
    ;(this.data = options.data || {}), (this.url = options.url)
    ;(this.timeout = options.timeout || 5000), (this.query = options.query || {}), (this.header = options.headers || {})
    this.method = options.method || 'get'
    this.cache = options.cache !== undefined ? options.cache : true
    this.options = options
  }

  getHeaders() {
    return this.header
  }

  getData() {
    return this.data
  }

  getUrl() {
    return this.url
  }

  getMethod() {
    return this.method
  }

  getTimeout() {
    return this.timeout
  }

  getUrlQuery() {
    return this.query
  }

  sendUploadProgress(e) {
    this._em.emit('upload.progress', e, this.callee)
  }

  sendDownloadProgress(e) {
    this._em.emit('download.progress', e, this.callee)
  }
  toSerialiable() {
    return this.options
  }
}

module.exports = Request
