const color = {
  baseColor: "#1989fa"
};

const onlineDomUrl = [
  {
    name: "天地图地图",
    icon: "天",
    url:
      "https://t2.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=e0b9067bb1f4c5ac661ae5bc3999535f" //me：e0b9067bb1f4c5ac661ae5bc3999535f，flision：83b36ded6b43b9bc81fbf617c40b83b5
  },
  // {
  //   name: "谷歌地图",
  //   icon: "谷",
  //   url: "http://mt0.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}"
  // },
  {
    name: "高德地图",
    icon: "德",
    url:
      "https://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}"
  }
];

const fileServer = {
  port: 7558 // 文件服务端口
};

export { color, onlineDomUrl, fileServer };
