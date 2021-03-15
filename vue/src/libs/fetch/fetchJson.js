// 读取json文件
// const axios = require("axios");
import axios from "axios";

class FetchJsonClass {
  /**
   * 获取本地文件
   * @param {*} filepath  url
   */
  getJson(filepath) {
    return axios
      .get(filepath)
      .then(rsp => {
        if (rsp.status === 200) {
          return rsp.data;
        } else {
          return [];
        }
      })
      .catch(err => {
        return [];
      });
  }
}

const fetchJson = new FetchJsonClass();

export default fetchJson;
