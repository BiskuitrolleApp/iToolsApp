const STORAGE_EXPRESS = 100 // 存储过期code
const STORAGE_NULL = 101 // 存储为空code
/**
 * 基于 localStorage 的存储
 */
function Storage() {
  /**
   * 设置数据存储日期 内部方法，外部无法调用
   * @param {*} data 需要存储的数据
   * @param {*} expirationTime 存储的时间(天)
   * @param {number} options 其余设置选项
   *  expirationTimeType 有效期类型，默认为day（几天过期），可以为ms（几ms后过期），也可以为截止时间戳timestamp（到什么时候过期）
   * @returns
   */
  var setexpirationTime = (
    data,
    expirationTime,
    options = { expirationTimeType: 'day' }
  ) => {
    let currentTime = Date.parse(new Date())
    let etime = currentTime
    if (options.expirationTimeType == 'timestamp') {
      etime = expirationTime
    } else if (options.expirationTimeType == 'ms') {
      etime = currentTime + expirationTime
    } else {
      etime = currentTime + expirationTime * 86400000
    }
    let storageData = {
      expirationTime: etime,
      value: data
    }
    return storageData
  }

  /**
   * 存储行为函数
   * @param {string} key 存储的数据的key
   * @param {object} value 存储数据的value
   * @param {number} expirationTime  数据有效期 默认为2，时间是天
   * @param {number} options 其余设置选项
   *  expirationTimeType 有效期类型，默认为day（几天过期），可以为ms（几ms后过期），也可以为截止时间戳timestamp（到什么时候过期）
   */
  this.setStorage = (
    key,
    value,
    expirationTime = 1,
    options = { expirationTimeType: 'day' }
  ) => {
    let nValue = value
    if (!key) {
      throw 'Key is notdefined'
    }
    console.log('expirationTime', value)
    if (typeof expirationTime != 'number') {
      throw 'The expiration time must be a number '
    }
    nValue = setexpirationTime(nValue, expirationTime, options)
    console.log('expirationTime nValue', nValue)
    localStorage.setItem(key,JSON.stringify(nValue))
  }

  /**
   * 获取存储数据行为函数
   * @param {string} key 存储的数据的key
   * @param {boolean} naviteData 是否做超时判断，是否获取带有过期时间戳的元数据，如果此参数为否则直接返回存储的数据
   * @returns
   */
  this.getStorage = (key, naviteData = false) => {
    return new Promise((resolve, reject) => {
      if (!key) {
        console.log('key is notdefined')
        reject('需要提供key才可以进行查询')
      }
      if (localStorage.getItem(key)) {
        if (!naviteData) {
          let { expirationTime, value } = JSON.parse(localStorage.getItem(key))
          if (expirationTime > Date.parse(new Date())) {
            console.log('数据未过期')
            if (value != undefined) {
              resolve(value)
            }
          } else {
            reject({ code: STORAGE_EXPRESS, message: '数据已过期' })
          }
        } else {
          resolve(JSON.parse(localStorage.getItem(key)))
        }
      } else {
        reject({ code: STORAGE_NULL, message: '数据不存在' })
      }
    })
  }

  /**
   * 删除指定数据
   * @param {string} key 存储的数据的key
   */
  this.deleteStorage = key => {
    localStorage.removeItem(key)
  }
}

var storage = new Storage()

export default storage
