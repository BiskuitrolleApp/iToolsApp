const state = {
  mapUrl: {
    name: "高德地图",
    icon: "德",
    url:
      "https://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}"
  },
  currentPostion: [113.32053, 23.12504],
  mapCurrentStatus: "stop" //stop,pause,start
};

const getters = {
  getOnlineMapUrl: state => state.mapUrl,
  getCurrentPostion: state => state.currentPostion,
  getMapCurrentStatus: state => state.mapCurrentStatus
};

const mutations = {
  setOnlineMapUrl(state, payload) {
    state.mapUrl = payload;
  },
  setCurrentPostion(state, payload) {
    state.currentPostion = payload;
  },
  setCurrentStatus(state, payload) {
    state.mapCurrentStatus = payload;
  }
};

const actions = {
  setCurrMapUrl({ commit }, data) {
    commit("setOnlineMapUrl", data);
  },
  setWalkerStatus({ commit }, data) {
    commit("setCurrentStatus", data);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
