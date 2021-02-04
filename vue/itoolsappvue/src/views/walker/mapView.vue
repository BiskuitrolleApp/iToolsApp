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
// import { Draw, Modify, Snap } from "ol/interaction";
import { Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { defaults as defaultControls } from "ol/control";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Draw, Modify, Snap } from "ol/interaction";
import { LineString } from "ol/geom";
import { transform } from "ol/proj";

// import { onlineDomUrl } from "@/assets/js/config";

export default {
  props: ["isStart"],
  // props: {
  //   isStart: {
  //     type: Boolean
  //   }
  // },
  computed: {
    ...mapGetters("map", [
      "getOnlineMapUrl",
      "getCurrentPostion",
      "getMapCurrentStatus"
    ])
    // domurl() {
    //   return this.getOnlineMapUrl;
    // }
  },
  data() {
    return {
      onlineDomUrl: "",
      map: null,
      onlineRasterSource: null,
      draw: null,
      walkLineLayer: null
    };
  },
  watch: {
    //点击更新当前地图
    getOnlineMapUrl: {
      handler(newVal) {
        this.onlineDomUrl = newVal.url;
        console.log("onlineDomUrl :>> ", this.onlineDomUrl);
        this.onlineRasterSource.clear();
        this.onlineRasterSource.setUrl(this.onlineDomUrl);
        this.onlineRasterSource.changed();
      },
      deep: true
    },
    getMapCurrentStatus(newVal) {
      if (newVal == "start") {
        this.drawWalkerLine();
      }
    }
  },
  mounted() {
    let that = this;
    let center = [113.32053, 23.12504];

    let markLabelStyle = new Style({
      text: new Text({
        font: "17px Calibri,sans-serif",
        overflow: true,
        fill: new Fill({
          color: "rgba(255, 0, 0,1)",
          width: 0.2
        }),
        stroke: new Stroke({
          color: "rgba(255,255,255, 0.6)",
          width: 4
        }),
        offsetY: -20
      })
    });
    let marksStyle = new Style({
      fill: new Fill({
        color: "rgba(255, 255, 0, 1)"
      }),
      stroke: new Stroke({
        color: "#ffcc33",
        width: 10
      }),
      image: new CircleStyle({
        radius: 7,
        fill: new Fill({
          color: "#ffcc33"
        })
      })
    });
    let styleWalkLine = [marksStyle, markLabelStyle];

    that.onlineDomUrl = that.getOnlineMapUrl.url;
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
      // style: function(feature) {
      //   //根据这个字段显示label
      //   markLabelStyle.getText().setText(feature.get("name"));
      //   let reStyle = styleWalkLine;
      //   return reStyle;
      // }
      style: marksStyle
    });

    //用户位置
    var iconFeature = new Feature({
      // geometry: new Point(center),
      geometry: new Point([114.32053, 23.12504]),
      name: "whereami",
      population: 4000,
      rainfall: 500
    });

    var iconSource = new VectorSource({
      features: [iconFeature]
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

    let view = new View({
      projection: "EPSG:4326",
      center: center,
      zoom: 17,
      maxZoom: 19,
      minZoom: 4
    });
    that.map = new Map({
      controls: defaultControls({
        zoom: false
      }),
      layers: [onlineRaster, that.walkLineLayer, iconLayer],
      target: "openLayers",
      view: view
    });
    // bus.$on(Events.MY_POSITION, () => {
    //   let myPosition = this.gpsPosition;
    //   if (myPosition.longitude !== 0 && myPosition.latitude !== 0) {
    //     view.animate({
    //       zoom: 19,
    //       center: [myPosition.longitude, myPosition.latitude]
    //     });
    //   }
    // });
    function setUserPostionCenter(coordinate) {
      let myCenter = view.getCenter();
      myCenter[0] = coordinate[0];
      myCenter[1] = coordinate[1];
      center = myCenter;
      view.animate({
        center: center,
        zoom: 10,
        duration: 1000
      });
      iconFeature.setGeometry(new Point(myCenter));
    }

    this.$bus.$on("panTo", function(coordinate) {
      setUserPostionCenter(coordinate);
    });
  },
  methods: {
    //划线
    drawFeatureToLayer(layer, features) {
      let that = this;
      console.log("drawFeatureToLayer :>> ", features);
      let reSource = new VectorSource({
        features: [features]
      });
      that.walkLineLayer.setSource(reSource);
      that.walkLineLayer.getSource().changed();
      console.log(
        "that.walkLineLayer :>> ",
        that.walkLineLayer.getSource().getFeatures()
      );
    },

    //获得线feature
    drawWalkerLine() {
      let that = this;
      console.log("drawWalkerLine start :>> ");
      let itemout = 0;
      let center = [113.32053, 23.12504];
      let lineGeometry = new LineString(center);
      var feature = new Feature({
        geometry: lineGeometry
      });
      var interval = setInterval(() => {
        console.log("setInterval:>> ", itemout);
        if (itemout == 5) {
          clearInterval(interval);
        } else {
          center[0] += 0.1;
          center[1] += 0.1;
          itemout++;
          lineGeometry.appendCoordinate(center);
          feature.setGeometry(lineGeometry);
          that.drawFeatureToLayer(that.walkLineLayer, feature);
          // let geo2 = feature.getGeometry();
          // console.log("geo2 :>> ", JSON.stringify(feature));
        }
      }, 1500);
      console.log("drawWalkerLine end :>> ");
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
