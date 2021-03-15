import apiOffline from "../apiCordova";

export default {
  listEstate: async fileName => {
    return await apiOffline.video.listEstate(fileName);
  },
  save: async (fileName, data) => {
    return await apiOffline.video.save(fileName, data);
  }
};
