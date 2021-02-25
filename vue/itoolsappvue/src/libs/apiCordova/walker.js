import { handleLocalFile } from "../fetch";
import { fileServer } from "@/assets/js/config.js";

import { Notify } from "vant";

const dataPath = "itools/walker/";

function findKeyInFiles(projectIdFiles, fileName) {
  let isFind = false;
  for (let p = 0; p < projectIdFiles.length; p++) {
    const pjf = projectIdFiles[p];
    if (pjf.name.indexOf(fileName) !== -1) {
      isFind = true;
    }
  }
  return isFind;
}

export default {
  saveLine: async (fileName, data) => {
    let oldUpdate = [];
    try {
      console.log("saveLine Files start:>> ");
      const Files2 = await handleLocalFile.getFolderPaths("");
      console.log("saveLine Files2 :>> ", Files2);

      const Files = await handleLocalFile.getFilePaths(dataPath);
      console.log("saveLine Files :>> ", Files);

      if (findKeyInFiles(Files, fileName)) {
        oldUpdate = await fetchJson.getJson(
          `http://localhost:${fileServer.port}/${dataPath}${fileName}.json`
        );
      }
      console.log("saveLine Files end:>> ", oldUpdate, Files);

      console.log("createAndWriteFile start:>> ");
      oldUpdate.push(data);
      let writeFile = await handleLocalFile.createAndWriteFile(
        dataPath,
        `${fileName}.json`,
        oldUpdate
      );
      console.log("createAndWriteFile end:>> ", writeFile);
      if (writeFile.success) {
        Notify({ type: "success", message: "保存成功" });
      } else {
        Notify({ type: "danger", message: "保存失败" });
        return undefined;
      }
    } catch (error) {
      console.log("error :>> ", error);
      Notify({ type: "danger", message: "保存失败" });
      return undefined;
    }
  }
};
