import apiOffline from "../apiCordova";

export default {
  save: async (fileName, data) => {
    return await apiOffline.walker.saveLine(fileName, data);
  }
};
