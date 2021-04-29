<template>
  <div class="photoPreset">
    <div
      :style="{
        width: canvasSize.width + 'vw',
        height: canvasSize.height + 'vw'
      }"
      class="photeBox"
    >
      <canvas
        id="canvasBox"
        :style="{
          width: canvasSize.width + 'vw !important',
          height: canvasSize.height + 'vw !important'
        }"
      ></canvas>
    </div>
  </div>
</template>
<script>
import {
  photoPixelRatioComputedH,
  photoPixelRatioComputedW
} from '@/config/photo/index'
import _ from 'lodash'
import { fabric } from 'fabric'
export default {
  data() {
    return {
      //canvas 编辑区域大小 单位为vw
      canvasSize: {
        width: 80,
        height: 80
      },
      pixelRatio: '4:3'
    }
  },
  mounted() {
    this.initCanvasSize()
    this.initFabricCanvas()
  },
  methods: {
    //初始化高度
    initCanvasSize() {
      let _size = this.canvasSize
      _size = this.resetWH(_size, this.pixelRatio)
      this.canvasSize = _size
    },
    //根据比例计算长高
    resetWH(size, pixelRatio) {
      let _size = _.cloneDeep(size)
      let { height, width } = _.cloneDeep(_size)
      if (_.isNil(height) || _.isNil(width)) {
        return {
          height: 80,
          width: 80
        }
      }
      let tempHeight = _size.width * photoPixelRatioComputedH[pixelRatio]
      if (tempHeight > 80) {
        _size.height = 100
        let tempWidth = _size.height * photoPixelRatioComputedW[pixelRatio]
        _size.width = tempWidth
      } else {
        _size.height = tempHeight
        _size.width = 80
      }
      return _size
    },
    initFabricCanvas() {
      var canvas = new fabric.Canvas('canvasBox')
      var rect = new fabric.Rect({
        top: 50,
        left: 100,
        width: 100,
        height: 60,
        fill: 'red'
      })
      canvas.add(rect)
    }
  }
}
</script>
<style lang="scss">
.photoPreset {
  height: 100vh;
  width: 100vw;
  .photeBox {
    border: 1px #000 dashed;
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translateX(-50%) translateY(-50%);
    -moz-transform: translateX(-50%) translateY(-50%);
    -ms-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    #canvasBox {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
