<template>
  <div id="openLayers"></div>
</template>
<script>
import { mapGetters } from "vuex";

import "ol/ol.css";
import Map from "ol/Map";
import XYZ from "ol/source/XYZ";
import View from "ol/View";
import { Circle as CircleStyle, Fill, Stroke, Style, Icon } from "ol/style";
import { Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { defaults as defaultControls } from "ol/control";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
// import { Draw, Modify, Snap } from "ol/interaction";
import { LineString } from "ol/geom";
import GeoJSON from "ol/format/GeoJSON";

import { dateFormat } from "@/libs/format/timeFormat.js";
import api from "@/libs/api";
import _ from "lodash";
import { Notify, Toast } from "vant";

import coordtransform from "@/libs/format/coordtransform.js";

export default {
  props: ["isStart"],
  computed: {
    ...mapGetters("map", [
      "getOnlineMapUrl",
      "getCurrentPostion",
      "getMapCurrentStatus",
      "getMapSettings"
    ])
  },
  data() {
    return {
      onlineDomUrl: "",
      poiRaster: null, //地名地址
      isCoordtransform: true,
      map: null,
      onlineRasterSource: null,
      draw: null,
      walkLineLayer: null,
      walkLineFeature: null,
      saveFeature: null, //gps获得的真实保存feature
      interval: null, //计时器
      view: null,
      iconFeature: null,
      gpsCenter: [113.324159319, 23.1061471625], //gps获得的中心点
      computedCenter: [113.324159319, 23.1061471625] //计算后的中心店
    };
  },
  watch: {
    //点击更新当前地图
    getOnlineMapUrl: {
      handler(newVal) {
        this.onlineDomUrl = newVal.url;
        this.isCoordtransform = newVal.isCoordtransform;
        this.setCenterToNowPostion();
        this.onlineRasterSource.clear();
        this.onlineRasterSource.setUrl(this.onlineDomUrl);
        this.onlineRasterSource.changed();
        if (this.isCoordtransform) {
          this.map.removeLayer(this.poiRaster);
        } else {
          this.map.removeLayer(this.poiRaster);
          this.map.addLayer(this.poiRaster);
        }
        // this.setCenterToNowPostion();
      },
      deep: true
    },
    getMapCurrentStatus(newVal) {
      // console.log("newVal :>> ", newVal);
      if (newVal == "start") {
        // console.log("暂停 :>> ", newVal);
      } else if (newVal == "end") {
        // console.log("this.saveFeature :>> ", this.saveFeature);
        clearInterval(this.interval);
        this.interval = null;
        this.saveWalkerLineFeature(this.saveFeature);
      } else if (newVal == "pause") {
        // console.log("开始 :>> ", newVal);
        this.setCenterToNowPostion();
        if (this.interval == null) {
          this.drawWalkerLine();
        }
      }
    }
  },
  mounted() {
    let that = this;
    that.setCenterToNowPostion();

    let marksStyle = new Style({
      fill: new Fill({
        color: "rgba(255, 255, 0, 1)"
      }),
      stroke: new Stroke({
        color: "#ffcc33",
        width: 4
      }),
      image: new CircleStyle({
        radius: 2,
        fill: new Fill({
          color: "#ffcc33"
        })
      })
    });

    that.onlineDomUrl = that.getOnlineMapUrl.url;

    that.poiRaster = new TileLayer({
      source: new XYZ({
        url:
          "http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=e0b9067bb1f4c5ac661ae5bc3999535f"
      })
    });

    // 在线栅格地图
    that.onlineRasterSource = new XYZ({
      url: that.onlineDomUrl,
      maxZoom: 21
    });
    let onlineRaster = new TileLayer({
      source: that.onlineRasterSource
    });

    //行走线段
    var walkLineSource = new VectorSource();
    that.walkLineLayer = new VectorLayer({
      title: "walkLineLayer",
      source: walkLineSource,
      style: marksStyle
    });

    //用户位置
    that.iconFeature = new Feature({
      geometry: new Point([114.32053, 23.12504]),
      name: "whereami",
      population: 4000,
      rainfall: 500
    });

    var iconSource = new VectorSource({
      features: [that.iconFeature]
    });
    var iconLayer = new VectorLayer({
      source: iconSource,
      style: new Style({
        image: new Icon({
          anchor: [0.5, 46],
          anchorXUnits: "fraction",
          anchorYUnits: "pixels",
          src: "img/local.png",
          scale: 0.12
        })
      })
    });

    that.view = new View({
      projection: "EPSG:4326",
      center: that.computedCenter,
      zoom: 10,
      maxZoom: 19,
      minZoom: 1
    });
    that.map = new Map({
      controls: defaultControls({
        zoom: false
      }),
      layers: [
        onlineRaster,
        // poiRaster,
        that.walkLineLayer,
        iconLayer
      ],
      target: "openLayers",
      view: that.view
    });

    that.$bus.$on("panTo", function(coordinate) {
      that.panToPoints(coordinate);
    });

    // that.drawWalkerLine();
  },
  methods: {
    //设置用户位置到中心+标记用户位置
    panToPoints(coordinate) {
      let newCoor = coordinate;
      if (this.isCoordtransform) {
        newCoor = coordtransform.wgs84togcj02(coordinate[0], coordinate[1]);
      }
      // console.log("this.center :>> ", this.isCoordtransform, newCoor);
      this.computedCenter = newCoor;
      this.setUserPostionCenter(this.computedCenter);
      this.iconFeature.setGeometry(new Point(this.computedCenter));
    },

    //设置用户位置到中心
    setUserPostionCenter(coordinate, zoom) {
      let that = this;
      if (zoom === undefined) {
        zoom = 16;
      }
      let newCoor = coordinate;
      let myCenter = that.view.getCenter();
      myCenter[0] = newCoor[0];
      myCenter[1] = newCoor[1];
      that.computedCenter = newCoor;
      that.view.animate({
        center: that.computedCenter,
        zoom: zoom,
        duration: 1000
      });
    },

    //划线
    drawFeatureToLayer(layer, features) {
      // let that = this;
      let reSource = new VectorSource({
        features: [features]
      });
      layer.setSource(reSource);
      layer.getSource().changed();
      // console.log("that.walkLineLayer :>> ", layer.getSource().getFeatures());
    },

    //获得线feature
    drawWalkerLine() {
      let that = this;
      // let itemout = 0;
      let gpsCenter = _.cloneDeep(that.gpsCenter); //要保存的gps获得的中心点
      let computedCenter = _.cloneDeep(that.computedCenter); //绘制的获得的中心点

      let gpsLineGeometry = new LineString([gpsCenter]); //要保存的gps获得的线段
      let computedLineGeometry = new LineString([computedCenter]); //绘制的获得的线段

      that.walkLineFeature = new Feature({
        geometry: computedLineGeometry
      });
      that.saveFeature = new Feature({
        geometry: gpsLineGeometry
      });

      that.interval = setInterval(() => {
        if (that.getMapCurrentStatus == "pause") {
          navigator.geolocation.getCurrentPosition(function(position) {
            if (
              position.coords.latitude &&
              position.coords.longitude &&
              gpsCenter != []
            ) {
              gpsCenter = [position.coords.longitude, position.coords.latitude];
              that.gpsCenter = gpsCenter;
              that.computedCenter = coordtransform.wgs84togcj02(
                gpsCenter[0],
                gpsCenter[1]
              );
            }
          }, that.drawOnError);

          that.setUserPostionCenter(computedCenter, 18);

          gpsLineGeometry.appendCoordinate(gpsCenter);
          computedLineGeometry.appendCoordinate(computedCenter);

          that.saveFeature.setGeometry(gpsLineGeometry);
          that.walkLineFeature.setGeometry(computedLineGeometry);

          that.drawFeatureToLayer(that.walkLineLayer, that.walkLineFeature);
          // }
        }
      }, that.getMapSettings.timeInterval);
      // console.log("drawWalkerLine end :>> ", feature);
    },

    //定位数据获取失败响应
    drawOnError(error) {
      // console.log("error :>> ", error);
      clearInterval(this.interval);
      this.interval = null;
      this.saveWalkerLineFeature(this.saveFeature);
      Notify({ type: "danger", message: "无gps信号，请开启gps信号" });
    },

    //保存
    saveWalkerLineFeature(featrue) {
      const convertor = new GeoJSON();
      let _featrue = _.cloneDeep(featrue);
      let createTime = new Date();
      let fileName = "walkerLine" + dateFormat("YYmmdd", createTime);
      let dataName = "walkerLine" + dateFormat("YYmmddHHMMSS", createTime);

      _featrue.set("name", dataName);
      let featureGeoJson = convertor.writeFeatureObject(_featrue);
      let _walkerLineParams = {
        name: dataName,
        create_on: createTime.getTime(),
        geojson: featureGeoJson
      };
      // console.log("saveWalkerLineFeature :>> ", dataName, _walkerLineParams);
      api.walker.save(fileName, _walkerLineParams);
    },

    //设置当前位置
    setCenterToNowPostion() {
      let that = this;
      Toast.loading({
        message: "校准位置中...",
        forbidClick: true
      });
      let nowPostion = [];
      // let nowPostion = this.getNowPostion();
      // console.log("nowPostion :>> ", nowPostion);

      navigator.geolocation.getCurrentPosition(
        function(position) {
          nowPostion = [position.coords.longitude, position.coords.latitude];
          // console.log("nowPostion :>> ", nowPostion);
          if (
            nowPostion == [] ||
            !_.isNumber(nowPostion[0]) ||
            !_.isNumber(nowPostion[1])
          ) {
            Toast.fail({
              message: "校准失败,请手动校准"
            });
            // this.setCenterToNowPostion();
          } else {
            that.gpsCenter = nowPostion;
            that.panToPoints(that.gpsCenter);
          }
        },
        function(err) {
          Toast.fail({
            message: "校准失败,请手动校准"
          });
          that.drawOnError(err);
        }
      );
    }
  }
};
</script>
<style lang="scss" scoped>
#openLayers {
  width: 100%;
  height: 100%;
}
.ol-overlaycontainer-stopevent {
  display: none;
}
</style>
