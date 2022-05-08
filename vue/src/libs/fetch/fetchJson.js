// 读取json文件
import axios from 'axios'

class FetchJsonClass {
  /**
   * 获取本地文件
   * @param {*} filepath  url
   */
  getJson(filepath) {
    return axios
      .get(filepath)
      .then(rsp => {
        if (rsp.status === '1') {
          return rsp.data
        } else {
          throw new Error('')
        }
      })
      .catch(err => {
        throw new Error(err)
      })
  }
}

const fetchJson = new FetchJsonClass()

export default fetchJson
