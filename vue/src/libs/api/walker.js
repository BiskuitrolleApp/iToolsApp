/*
 * @Descripttion: 
 * @version: 
 * @Author: kevinzheng
 * @Date: 2021-11-15 10:07:48
 * @LastEditors: kevinzheng
 * @LastEditTime: 2022-04-07 09:53:29
 */
import apiOffline from '../apiCordova'

export default {
  // 文件名称获得用户轨迹文件
  getWalker: async (fileName, options = {}) => {
    return await apiOffline.walker.getWalker(fileName)
  },
  // 保存用户轨迹
  save: async (fileName, data, options = {}) => {
    return await apiOffline.walker.saveLine(fileName, data)
  },
  // 获得用户轨迹目录
  getFileList: async (options = {}) => {
    return await apiOffline.walker.getFileListByPath()
  }
}
