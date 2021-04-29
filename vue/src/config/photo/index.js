//相机像素比例，根据宽度计算
const photoPixelRatioComputedH = {
  '16:9': 0.563,
  '9:16': 1.778,
  '1:1': 1,
  '4:3': 0.75,
  '3:4': 1.333,
  '3:4': 1.333,
  '2:3': 1.5,
  '3:2': 0.667
}
//相机像素比例，根据宽度计算
const photoPixelRatioComputedW = {
  '9:16': 0.563,
  '16:9': 1.778,
  '1:1': 1,
  '3:4': 0.75,
  '4:3': 1.333,
  '2:3': 0.667,
  '3:2': 1.5
}

export { photoPixelRatioComputedH, photoPixelRatioComputedW }
