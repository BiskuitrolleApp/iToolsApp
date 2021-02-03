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

// import { onlineDomUrl } from "@/assets/js/config";

export default {
  props: ["isStart"],
  // props: {
  //   isStart: {
  //     type: Boolean
  //   }
  // },
  computed: {
    ...mapGetters("map", ["getOnlineMapUrl", "getCurrentPostion"])
    // domurl() {
    //   return this.getOnlineMapUrl;
    // }
  },
  data() {
    return {
      onlineDomUrl: "",
      map: null,
      onlineRasterSource: null
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
    }
  },
  mounted() {
    let that = this;
    let center = [113.32053, 23.12504];

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
    var walkLineVector = new VectorLayer({
      source: walkLineSource,
      style: new Style({
        fill: new Fill({
          color: "rgba(255, 255, 255, 0.2)"
        }),
        stroke: new Stroke({
          color: "#ffcc33",
          width: 2
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: "#ffcc33"
          })
        })
      })
    });

    //用户位置
    var iconFeature = new Feature({
      geometry: new Point(center),
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
      layers: [onlineRaster, walkLineVector, iconLayer],
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

    this.$bus.$on("panTo", function(coordinate) {
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
    });
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
