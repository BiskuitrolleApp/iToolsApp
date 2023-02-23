const modules = {}

const requireModule = require.context('./', true, /index\.js/)
requireModule.keys().forEach(fileName => {
  const path = fileName.replace(/\/index\.js/, '')
  const module = requireModule(fileName)
  let moduleName = module.default.name
  if (module.default && module.default.name) {
    modules[moduleName] = module.default
  }
})

export default modules

// import CooButton from './button'
// import CooTabbar from './tabbar'
// import CooTabberItem from './tabberItem'
// import CooIcon from './icon'
// import CooTransfer from './transfer'
// import CooDialog from './dialog'
// import CooOverlay from './overlay'

// export { CooButton, CooTabbar, CooTabberItem, CooIcon, CooTransfer, CooDialog,CooOverlay }
