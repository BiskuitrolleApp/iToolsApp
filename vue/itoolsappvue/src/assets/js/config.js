const color = {
  baseColor: "#1989fa"
};

const onlineDomUrl = [
  {
    name: "天地图",
    icon: "天",
    isCoordtransform: false,
    url:
      "https://t2.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=e0b9067bb1f4c5ac661ae5bc3999535f"
  },
  // {
  //   name: "卫星图",
  //   icon: "卫",
  //   coordtransform: false,
  //   url:
  //     "https://t2.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=e0b9067bb1f4c5ac661ae5bc3999535f"
  // },
  // {
  //   name: "谷歌地图",
  //   icon: "谷",
  //   coordtransform:false,
  //   url: "http://mt0.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}"
  // },
  {
    name: "高德地图",
    icon: "德",
    isCoordtransform: true,
    url:
      "https://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}"
  }
];

const fileServer = {
  port: 7558 // 文件服务端口
};

export { color, onlineDomUrl, fileServer };
