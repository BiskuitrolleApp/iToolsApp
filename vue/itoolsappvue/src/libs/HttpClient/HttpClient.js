const log = require('../JsLogger').getLogger('HttpClient')
const axiosProvider = require('./AxiosProvider')
const Call = require('./Call')
const InterceptorManager = require('./InterceptorManager')
const LogPlugin = require('./LogPlugin')
const JsonParserPlugin = require('./JsonParserPlugin')

const PLUGINS = {
  LogPlugin,
  JsonParserPlugin
}

class HttpClient {
  static Plugins = PLUGINS

  constructor(options) {
    this.requestInterceptorManager = new InterceptorManager()
    this.cacheManager

    this.use(axiosProvider)

    this.Plugins = PLUGINS
  }

  use(plugin) {
    if ('function' === typeof plugin) {
      const pluginProperties = plugin(this)
      this.requestInterceptorManager.apply(pluginProperties.preRequest)
    }
    return this
  }

  async getJson(url, params = {}) {
    return await this.newCall({
      url,
      query: params
    }).execute()
  }

  async putJson(url, body = {}, params = {}, options = {}) {
    return await this.newCall({
      url,
      method: 'put',
      data: body,
      query: params,
      ...options
    }).execute()
  }

  async patchJson(url, body = {}, params = {}, options = {}) {
    return await this.newCall({
      url,
      method: 'patch',
      data: body,
      query: params,
      ...options
    }).execute()
  }

  async postJson(url, body = {}, params = {}, options = {}) {
    return await this.newCall({
      url,
      method: 'post',
      data: body,
      query: params,
      ...options
    }).execute()
  }

  async deleteJson(url, body = {}, params = {}, options = {}) {
    return await this.newCall({
      url,
      method: 'delete',
      data: body,
      query: params,
      ...options
    }).execute()
  }

  uploadJson(url, fromData, params = {}) {
    return this.newCall({
      url,
      method: 'post',
      data: fromData,
      query: params,
      timeout: Infinity
    })
  }

  upload(url, fromData, params = {}, options = {}) {
    options = {
      timeout: Infinity,
      ...options
    }
    return this.newCall({
      url,
      method: 'post',
      data: fromData,
      query: params,
      ...options
    })
  }

  /**
   *
   * @param {*} options
   * @Return Call
   */
  newCall(requestOptions) {
    let config = {
      requestOptions,
      requestInterceptorManager: this.requestInterceptorManager
    }

    return new Call(config)
  }

  newWebsocket(options) {}
}

module.exports = HttpClient
