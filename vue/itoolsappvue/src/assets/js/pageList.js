const views = [
  {
    title: "摄影",
    list: [
      {
        title: "单独边框",
        subTitle: "摄影单独边框",
        page: "/border/single",
        bgi: "/img/bg/bg1.png",
        disabled: false
      },
      {
        title: "批量边框",
        subTitle: "摄影批量边框",
        page: "/border/batch",
        bgi: "/img/bg/bg2.png",
        disabled: true
      }
    ]
  },
  {
    title: "视频",
    list: [
      {
        title: "视频解析",
        subTitle: "在线视频解析",
        page: "/video",
        bgi: "/img/bg/bg3.png",
        disabled: false
      }
    ]
  },
  {
    title: "地图",
    list: [
      {
        title: "步行者",
        subTitle: "步行打点地图",
        page: "/walker",
        bgi: "/img/bg/bg4.png",
        disabled: false
      }
    ]
  }
];

export { views };
