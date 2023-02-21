<template>
  <div>
    <div id="openLayers"></div>
    <div class="centerModal" v-if="getMapSettings.centerModal">
      <p v-for="(item, index) in centerListArray" :key="index">
        {{ item[0] }},{{ item[1] }}
      </p>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

import 'ol/ol.css'
import Map from 'ol/Map'
import XYZ from 'ol/source/XYZ'
import View from 'ol/View'
import { Circle as CircleStyle, Fill, Stroke, Style, Icon } from 'ol/style'
import { Vector as VectorSource } from 'ol/source'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import { defaults as defaultControls } from 'ol/control'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
// import { Draw, Modify, Snap } from "ol/interaction";
import { LineString } from 'ol/geom'
import GeoJSON from 'ol/format/GeoJSON'

import { dateFormat } from '@/libs/format/timeFormat.js'
import api from '@/libs/api'
import _ from 'lodash'
import { Notify, Toast } from 'vant'

import coordtransform from '@/libs/format/coordtransform.js'

export default {
  props: ['isStart'],
  computed: {
    ...mapGetters('map', [
      'getOnlineMapUrl',
      'getCurrentPostion',
      'getMapCurrentStatus',
      'getMapSettings'
    ])
  },
  data() {
    return {
      onlineDomUrl: '',
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
      startIconFeature: null,
      walkerIconFeature: null,
      iconLayer: null,
      startIconLayer: null,
      walkerIconLayer: null,
      gpsCenter: [113.324159319, 23.1061471625], //gps获得的中心点
      computedCenter: [113.324159319, 23.1061471625], //计算后的中心店
      centerListArray: [[113.324159319, 23.1061471625]],
      startPoint: [0, 0]
    }
  },
  watch: {
    //点击更新当前地图
    getOnlineMapUrl: {
      handler(newVal) {
        this.onlineDomUrl = newVal.url
        this.isCoordtransform = newVal.isCoordtransform
        this.setCenterToNowPostion()
        this.onlineRasterSource.clear()
        this.onlineRasterSource.setUrl(this.onlineDomUrl)
        this.onlineRasterSource.changed()
        if (this.isCoordtransform) {
          this.map.removeLayer(this.poiRaster)
        } else {
          this.map.removeLayer(this.poiRaster)
          this.map.addLayer(this.poiRaster)
        }
        // this.setCenterToNowPostion();
      },
      deep: true
    },
    getMapCurrentStatus(newVal) {
      // console.log("newVal :>> ", newVal);
      if (newVal == 'start') {
        // console.log("暂停 :>> ", newVal);
      } else if (newVal == 'end') {
        // console.log("this.saveFeature :>> ", this.saveFeature);
        this.setMapSettingsItem({ centerModal: false })
        clearInterval(this.interval)
        this.interval = null
        this.saveWalkerLineFeature(this.saveFeature)
      } else if (newVal == 'pause') {
        this.iconLayer.setVisible(false)
        this.startIconLayer.setVisible(true)
        this.walkerIconLayer.setVisible(true)
        // console.log("开始 :>> ", newVal);
        this.setMapSettingsItem({ centerModal: true })
        this.setCenterToNowPostion()
        this.startIconFeature.setGeometry(new Point(this.computedCenter))
        this.walkerIconFeature.setGeometry(new Point(this.computedCenter))
        if (this.interval == null) {
          this.drawWalkerLine()
        }
      }
    }
  },
  mounted() {
    let that = this
    that.setCenterToNowPostion()

    let marksStyle = new Style({
      fill: new Fill({
        color: 'rgba(255, 255, 0, 1)'
      }),
      stroke: new Stroke({
        color: '#ffcc33',
        width: 4
      }),
      image: new CircleStyle({
        radius: 2,
        fill: new Fill({
          color: '#ffcc33'
        })
      })
    })

    that.onlineDomUrl = that.getOnlineMapUrl.url

    that.poiRaster = new TileLayer({
      source: new XYZ({
        url:
          'http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=e0b9067bb1f4c5ac661ae5bc3999535f'
      })
    })

    // 在线栅格地图
    that.onlineRasterSource = new XYZ({
      url: that.onlineDomUrl,
      maxZoom: 21
    })
    let onlineRaster = new TileLayer({
      source: that.onlineRasterSource
    })

    //行走线段
    var walkLineSource = new VectorSource()
    that.walkLineLayer = new VectorLayer({
      title: 'walkLineLayer',
      source: walkLineSource,
      style: marksStyle
    })

    //用户位置
    that.iconFeature = new Feature({
      geometry: new Point([114.32053, 23.12504]),
      name: 'whereami',
      population: 4000,
      rainfall: 500
    })
    var iconSource = new VectorSource({
      features: [that.iconFeature]
    })
    that.iconLayer = new VectorLayer({
      source: iconSource,
      style: new Style({
        image: new Icon({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: 'img/mapicon/local.png',
          scale: 0.12
        })
      })
    })

    //开始点
    that.startIconFeature = new Feature({
      geometry: new Point([0, 0]),
      name: 'startpiont',
      population: 4000,
      rainfall: 500
    })
    var startIconSource = new VectorSource({
      features: [that.startIconFeature]
    })
    that.startIconLayer = new VectorLayer({
      source: startIconSource,
      style: new Style({
        image: new Icon({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: 'img/mapicon/start.png',
          scale: 0.3
        })
      })
    })

    //行人icon
    that.walkerIconFeature = new Feature({
      geometry: new Point([0, 0]),
      name: 'walkerpiont',
      population: 4000,
      rainfall: 500
    })
    var walkerIconSource = new VectorSource({
      features: [that.walkerIconFeature]
    })
    that.walkerIconLayer = new VectorLayer({
      source: walkerIconSource,
      style: new Style({
        image: new Icon({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: 'img/mapicon/walker.png',
          scale: 0.3
        })
      })
    })

    that.view = new View({
      projection: 'EPSG:4326',
      center: that.computedCenter,
      zoom: 10,
      maxZoom: 19,
      minZoom: 1
    })
    that.map = new Map({
      controls: defaultControls({
        zoom: false
      }),
      layers: [
        onlineRaster,
        // poiRaster,
        that.walkLineLayer,
        that.iconLayer,
        that.startIconLayer,
        that.walkerIconLayer
      ],
      target: 'openLayers',
      view: that.view
    })

    that.$bus.$on('panTo', function(coordinate) {
      that.panToPoints(coordinate)
      that.iconLayer.setVisible(true)
      that.iconFeature.setGeometry(new Point(that.computedCenter))
    })
    that.iconLayer.setVisible(false)
    that.startIconLayer.setVisible(false)
    that.walkerIconLayer.setVisible(false)
    // that.drawWalkerLine();
  },
  methods: {
    ...mapMutations('map', ['setMapSettingsItem']),
    initMap() {
      this.gpsCenter = [113.324159319, 23.1061471625] //gps获得的中心点
      this.computedCenter = [113.324159319, 23.1061471625] //计算后的中心店
      this.walkLineLayer.getSource(this.walkLineFeature)
      this.centerListArray = []
      this.startPoint = [0, 0]
      this.walkLineFeature = null

      this.saveFeature = null
      this.gpsLineGeometry = null
      this.computedLineGeometry = null
      this.setCenterToNowPostion()
    },
    //设置用户位置到中心+标记用户位置
    panToPoints(coordinate) {
      let newCoor = coordinate
      if (this.isCoordtransform) {
        newCoor = coordtransform.wgs84togcj02(coordinate[0], coordinate[1])
      }
      // console.log("this.center :>> ", this.isCoordtransform, newCoor);
      this.computedCenter = newCoor
      this.setUserPostionCenter(this.computedCenter)
    },

    //设置用户位置到中心
    setUserPostionCenter(coordinate, zoom) {
      let that = this
      if (zoom === undefined) {
        zoom = 16
      }
      let newCoor = coordinate
      let myCenter = that.view.getCenter()
      myCenter[0] = newCoor[0]
      myCenter[1] = newCoor[1]
      that.computedCenter = newCoor
      that.view.animate({
        center: that.computedCenter,
        zoom: zoom,
        duration: 1000
      })
    },

    //划线
    drawFeatureToLayer(layer, features) {
      let reSource = new VectorSource({
        features: [features]
      })
      layer.setSource(reSource)
      layer.getSource().changed()
    },

    //获得线feature
    drawWalkerLine() {
      let that = this
      // let itemout = 0;
      let gpsCenter = _.cloneDeep(that.gpsCenter) //要保存的gps获得的中心点
      let computedCenter = _.cloneDeep(that.computedCenter) //绘制的获得的中心点

      let gpsLineGeometry = new LineString([gpsCenter]) //要保存的gps获得的线段
      let computedLineGeometry = new LineString([computedCenter]) //绘制的获得的线段

      that.walkLineFeature = new Feature({
        geometry: computedLineGeometry
      })
      that.saveFeature = new Feature({
        geometry: gpsLineGeometry
      })
      // let data = 0.0001;

      that.interval = setInterval(async () => {
        if (that.getMapCurrentStatus == 'pause') {
          try {
            let position = await window.$GPS.getPosition()

            // position.longitude += data;
            // position.latitude += data;
            // data += 0.0001;

            if (position.latitude && position.longitude && gpsCenter != []) {
              gpsCenter = [position.longitude, position.latitude]
              that.gpsCenter = gpsCenter
              that.computedCenter = coordtransform.wgs84togcj02(
                position.longitude,
                position.latitude
              )
              that.setCenterListArray(gpsCenter)
            }
          } catch (error) {
            that.drawOnError(error)
          }

          that.setUserPostionCenter(that.computedCenter, 18)

          gpsLineGeometry.appendCoordinate(gpsCenter)
          computedLineGeometry.appendCoordinate(that.computedCenter)

          that.saveFeature.setGeometry(gpsLineGeometry)
          that.walkLineFeature.setGeometry(computedLineGeometry)

          that.drawFeatureToLayer(that.walkLineLayer, that.walkLineFeature)
          that.walkerIconFeature.setGeometry(new Point(that.computedCenter))
          // }
        }
      }, that.getMapSettings.timeInterval)
      // console.log("drawWalkerLine end :>> ", feature);
    },

    //定位数据获取失败响应
    drawOnError(error) {
      console.log('error :>> ', error)
      clearInterval(this.interval)
      this.interval = null
      this.saveWalkerLineFeature(this.saveFeature)
      Notify({ type: 'danger', message: '无gps信号，请开启gps信号' })
    },

    //保存
    saveWalkerLineFeature(featrue) {
      const convertor = new GeoJSON()
      let _featrue = _.cloneDeep(featrue)
      let createTime = new Date()
      let fileName = 'walkerLine' + dateFormat('YYmmdd', createTime)
      let dataName = 'walkerLine' + dateFormat('YYmmddHHMMSS', createTime)

      _featrue.set('name', dataName)
      let featureGeoJson = convertor.writeFeatureObject(_featrue)
      let _walkerLineParams = {
        name: dataName,
        create_on: createTime.getTime(),
        geojson: featureGeoJson
      }
      // console.log("saveWalkerLineFeature :>> ", dataName, _walkerLineParams);
      api.walker.save(fileName, _walkerLineParams)
      this.initMap()
    },

    //设置当前位置
    async setCenterToNowPostion() {
      let that = this
      Toast.loading({
        message: '校准位置中...',
        forbidClick: true
      })
      let nowPostion = []
      // let nowPostion = this.getNowPostion();
      // console.log("nowPostion :>> ", );
      try {
        let position = await window.$GPS.getPosition()
        nowPostion = [position.longitude, position.latitude]
        if (
          nowPostion == [] ||
          !_.isNumber(nowPostion[0]) ||
          !_.isNumber(nowPostion[1])
        ) {
          Toast.fail({
            message: '校准失败,请手动校准'
          })
        } else {
          that.gpsCenter = nowPostion
          that.panToPoints(that.gpsCenter)
        }
      } catch (error) {
        Toast.fail({
          message: '校准失败,请手动校准'
        })
        that.drawOnError(error)
      }
    },

    //添加路径点列表
    setCenterListArray(position) {
      if (this.centerListArray.length > 10) {
        this.centerListArray.pop()
      }
      this.centerListArray.unshift(position)
    }
  }
}
</script>
<style lang="scss" scoped>
#openLayers {
  width: 100%;
  height: 100%;
}
.ol-overlaycontainer-stopevent {
  display: none;
}
.centerModal {
  position: fixed;
  z-index: 3;
  height: 150px;
  width: 300px;
  background-color: rgba(0, 0, 0, 0.3);
  top: 60px;
  left: 10px;
  border-radius: 5px;
  color: #fff;
  padding: 10px;
  overflow: hidden;
  text-align: center;
}
</style>
