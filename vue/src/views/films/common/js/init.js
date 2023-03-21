import photoLogo from '../json/database_photoLogo.json'
import _ from 'lodash'
import storage from '@/services/storage'
import { post } from '@/services/request'

// 获得配置信息，从数据库中请求
function getPhotoConfigListByDB() {
  let tempPhotoLogo = photoLogo
  tempPhotoLogo = _.sortBy(tempPhotoLogo, function(o) {
    return o.sort_key
  })
  storage.setStorage(
    'itools-config-logoList',
    {
      version: '-1',
      content: tempPhotoLogo
    },
    10
  )
  return tempPhotoLogo
}

// 获得配置信息
export const getPhotoConfigList = function() {
  let photoConfigData = []
  return new Promise((resolve, reject) => {
    try {
      let data = storage.getStorage({
        key: 'itools-config-logoList'
      })
      if (data.content && data.content.length > 0) {
        photoConfigData = _.sortBy(data.content, function(o) {
          return o.sort_key
        })
      } else {
        photoConfigData = getPhotoConfigListByDB()
      }
      resolve(photoConfigData)
    } catch (error) {
      photoConfigData = getPhotoConfigListByDB()
      reject(photoConfigData)
    }
  })
}

function getRequestListConfigItem(item = {}) {
  post(item.url, { pure: true, fullUrl: true })
    .then(res => {
      console.log('request', res.data)
      storage.setStorage(
        'itools-config-' + item.name,
        {
          version: item.version, // 过期时间为10天
          url: item.url,
          content: res.data
        },
        10
      )
    })
    .error(err => {
      storage.setStorage(
        'itools-config-' + item.name,
        {
          version: '-1',
          url: item.url,
          content: null
        },
        10
      )
    })
  // uni.request({
  //   url: item.url,
  //   success: res => {
  //     console.log('request', res.data)
  //     uni.setStorageSync('itools-config-' + item.name, {
  //       version: item.version, // 过期时间为10天
  //       url: item.url,
  //       content: res.data
  //     })
  //     // uni.hideLoading()
  //   },
  //   fail: err => {
  //     uni.setStorageSync('itools-config-' + item.name, {
  //       version: '-1',
  //       url: item.url,
  //       content: null
  //     })
  //     // uni.hideLoading()
  //   }
  // })
}

function getRequestListConfig(list = []) {
  for (let index = 0; index < list.length; index++) {
    const item = list[index]
    storage.getStorage({
      key: 'itools-config-' + item.name,
      success: function({ data }) {
        if (!data.version) {
          // 当前版本过去
          getRequestListConfigItem(item)
        } else if (
          data.version &&
          item.version &&
          item.version > data.version
        ) {
          // 存在内容有新版本
          getRequestListConfigItem(item)
        } else {
          // 无需更新
        }
      },
      fail: () => {
        getRequestListConfigItem(item)
      }
    })
  }
}

/**
 * 重新请求index配置信息
 * @param {*} callback
 */
function getRequestMainConfig(callback) {
  // uni.showLoading({
  //   title: '初始化...',
  //   duration: 60000,
  //   mask: true
  // })
  try {
    let res = post(
      'https://gitee.com/KevinJZheng/itools-oss/raw/master/index.json',
      { pure: true, fullUrl: true }
    )
    storage.setStorage(
      'itools-config',
      {
        data: res.data
      },
      10
    )
    getRequestListConfig(res.data)
    if (callback && typeof callback == 'function') {
      callback()
    }
  } catch (error) {
    if (callback && typeof callback == 'function') {
      callback()
    }
  }
}

/**
 * 初始化配置信息
 * @param {*} refresh 是否强制刷新
 * @param {*} callback 完成后回调
 */
export const initMainConfig = function(refresh = false, callback) {
  console.log('initMainConfig')
  if (refresh) {
    getRequestMainConfig(callback)
  } else {
    try {
      let data = storage.getStorage({
        key: 'itools-config'
      })
      let time = new Date().getTime()
      if (data.expirationTime && time < data.expirationTime) {
        if (callback && typeof callback == 'function') {
          callback()
        }
      } else {
        getRequestMainConfig(callback)
      }
    } catch (error) {
      console.log('initMainConfig error', error)
      getRequestMainConfig(callback)
    }
  }
}
