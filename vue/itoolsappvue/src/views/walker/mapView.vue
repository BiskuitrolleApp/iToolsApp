<template>
  <div id="openLayers"></div>
</template>
<script>
import "ol/ol.css";
import Map from "ol/Map";
import XYZ from "ol/source/XYZ";
import View from "ol/View";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
// import { Draw, Modify, Snap } from "ol/interaction";
import { Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { defaults as defaultControls } from "ol/control";

export default {
  // props: ["onlineDomUrl", "isStart"],
  props: ["start"],
  data() {
    return {
      onlineDomUrl:
        "http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}",
      map: null,
      onlineRasterSource: null
    };
  },
  mounted() {
    let that = this;
    // 在线栅格地图
    that.onlineRasterSource = new XYZ({
      url: that.onlineDomUrl,
      maxZoom: 22
    });

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

    let onlineRaster = new TileLayer({
      source: that.onlineRasterSource
    });
    that.map = new Map({
      controls: defaultControls({
        zoom: false
      }),
      layers: [onlineRaster, walkLineVector],
      target: "openLayers",
      view: new View({
        projection: "EPSG:4326",
        center: [113.32053, 23.12504],
        zoom: 18
      })
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
