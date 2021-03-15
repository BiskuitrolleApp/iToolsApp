import apiOffline from "../apiCordova";

export default {
  listEstate: async fileName => {
    return await apiOffline.walker.listEstate(fileName);
  },
  save: async (fileName, data) => {
    return await apiOffline.walker.saveLine(fileName, data);
  }
};
