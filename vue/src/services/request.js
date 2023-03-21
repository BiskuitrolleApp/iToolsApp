import axios from 'axios'
import store from '@/store/index'
import { config } from 'localforage'
const requestTimeout = 60 // 设定超时时间

axios.defaults.baseURL = 'reqUrl'
// 设置请求超时
// 通过axios.defaults.timeout设置默认的请求超时时间。例如超过了60s，就会告知用户当前请求超时，请刷新等。
axios.defaults.timeout = 1000 * requestTimeout

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断vuex中是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = store.state.token
    token && (config.headers.Authorization = token)
    return config
  },
  error => {
    return Promise.error(error)
  }
)
// 响应拦截器
axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    return Promise.reject(error.response)
  }
)

/**
 *
 * @param {*} error 错误信息
 * @param {*} pure 是否为纯净模式
 * @returns
 */
function errorHandler(error, pure = false) {
  if (pure) {
    return
  }
  // 服务器状态码不是2开头的的情况
  // 这里可以跟你们的后台开发人员协商好统一的错误状态码
  // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
  // 下面列举几个常见的操作，其他需求可自行扩展
  if (error.response.status) {
    switch (error.response.status) {
      // 401: 未登录
      // 未登录则跳转登录页面，并携带当前页面的路径
      // 在登录成功后返回当前页面，这一步需要在登录页操作。
      case 401:
        this.$router.replace({
          path: '/login',
          query: {
            redirect: this.$router.currentRoute.fullPath
          }
        })
        break
      // 403 token过期
      // 登录过期对用户进行提示
      // 清除本地token和清空vuex中token对象
      // 跳转登录页面
      case 403:
        this.$cooToast({
          message: '登录过期，请重新登录',
          duration: 1000,
          type: 'fail'
        })
        // 清除token
        // localStorage.removeItem('token')
        // store.commit('loginSuccess', null)
        // // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
        // setTimeout(() => {
        //   router.replace({
        //     path: '/login',
        //     query: {
        //       redirect: router.currentRoute.fullPath
        //     }
        //   })
        // }, 1000)
        break

      // 404请求不存在
      case 404:
        this.$cooToast({
          message: '网络请求不存在',
          duration: 1000,
          type: 'fail'
        })
        break
      // 其他错误，直接抛出错误提示
      default:
        this.$cooToast({
          message: error.response.data.message,
          duration: 1500,
          type: 'fail'
        })
    }
  }
}

// 是否开启全局loading
function globalLoading(loading = true) {
  if (loading) {
    // 全局loadding
    this.$cooToast({
      // id: 'tempToast',
      content: '加载中',
      type: 'loading',
      duration: 1000 * requestTimeout
    })
  }
}

function getRequestUrl(url, fullUrl = false) {
  if (fullUrl) {
    return url
  } else {
    return 'reqUrl' + url
  }
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} option [请求时选项配置]
 *  << pure 是否纯净模式错误信息直接返回不做处理(默认为false)；
 *  loading 是否纯开启全局loading(默认为true)；
 *  fullUrl 是否是完整url，外部url，不走内部服务(默认为false)；>>
 */
export function get(
  url,
  params,
  option = {
    pure: false,
    loading: true,
    fullUrl: false
  }
) {
  return new Promise((resolve, reject) => {
    globalLoading(option.loading) // 开启loading
    axios
      .get(getRequestUrl(url, config.fullUrl), {
        params: params
      })
      .then(res => {
        resolve(res.data)
        this.$cooToastHide() // 结束关闭loading
      })
      .catch(err => {
        errorHandler(err, option.pure)
        reject(err.data)
        this.$cooToastHide() // 结束关闭loading
      })
  })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} option [请求时选项配置]
 *  << pure 是否纯净模式错误信息直接返回不做处理(默认为false)；
 *  loading 是否纯开启全局loading(默认为true)；
 *  fullUrl 是否是完整url，外部url，不走内部服务(默认为false)；>>
 */
export function post(
  url,
  params,
  option = {
    pure: false,
    loading: true,
    fullUrl: false
  }
) {
  return new Promise((resolve, reject) => {
    globalLoading(option.loading) // 开启loading
    axios
      .post(getRequestUrl(url, config.fullUrl), JSON.stringify(params))
      .then(res => {
        resolve(res.data)
        this.$cooToastHide() // 结束关闭loading
      })
      .catch(err => {
        errorHandler(err, option.pure)
        reject(err.data)
        this.$cooToastHide() // 结束关闭loading
      })
  })
}
