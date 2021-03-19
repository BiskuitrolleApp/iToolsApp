import apiOffline from "../apiCordova";

export default {
  getWalker: async fileName => {
    return await apiOffline.walker.getWalker(fileName);
  },
  save: async (fileName, data) => {
    return await apiOffline.walker.saveLine(fileName, data);
  },
  getFileList: async () => {
    return await apiOffline.walker.getFileListByPath();
  }
};
