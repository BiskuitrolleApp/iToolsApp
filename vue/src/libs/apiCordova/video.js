import { handleLocalFile, fetchJson } from "../fetch";
import { fileServer } from "@/config/mapConfig.js";

import { Notify } from "vant";

const dataPath = "itools/video/";

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
  listEstate: async fileName => {
    return await fetchJson.getJson(
      `http://localhost:${fileServer.port}/${dataPath}${fileName}.json`
    );
  },
  save: async (fileName, data) => {
    // let oldUpdate = [];
    try {
      // const Files = await handleLocalFile.getFilePaths(dataPath);
      // if (findKeyInFiles(Files, fileName)) {
      //   oldUpdate = await fetchJson.getJson(
      //     `http://localhost:${fileServer.port}/${dataPath}${fileName}.json`
      //   );
      // }
      // console.log("saveLine Files end:>> ", oldUpdate, Files);

      // console.log("createAndWriteFile start:>> ");
      // oldUpdate.push(data);
      // let writeFile = await handleLocalFile.createAndWriteFile(
      //   dataPath,
      //   `${fileName}.json`,
      //   oldUpdate
      // );
      let writeFile = await handleLocalFile.createAndWriteFile(
        dataPath,
        `${fileName}.json`,
        data
      );
      // console.log("createAndWriteFile end:>> ", writeFile);
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
