const { handleLocalFile } = require("@/libs/fetch");

const DEFAULT_OPTIONS = {
  initDir: ["itools/walker/", "itools/video/"]
};
async function _loadLocalConfigAsync() {
  // await this._loadDefaultConfig()
  try {
    let initDir = DEFAULT_OPTIONS.initDir;
    setTimeout(() => {
      for (let i = 0; i < initDir.length; i++) {
        const iDir = initDir[i];
        console.log("_loadLocalConfigAsync :>> ");
        handleLocalFile.createDirectory(iDir); // 初始化文件目录
      }
    }, 2000);
  } catch (error) {
    console.log("error :>> ", error);
  }
}

export { _loadLocalConfigAsync };
