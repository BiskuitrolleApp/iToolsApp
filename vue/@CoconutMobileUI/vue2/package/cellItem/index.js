import CellItem from '../cell/src/cellItem'

/* istanbul ignore next */
CellItem.install = function (Vue) {
  Vue.component(CellItem.name, CellItem)
}

export default CellItem
