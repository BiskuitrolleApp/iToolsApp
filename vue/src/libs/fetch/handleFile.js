// 处理json文件读写
class HandleLocalFileClass {
  /**
   * 打开或创建文件夹,创建文件并写入内容
   * @param {*} path 文件夹路径 'fdyt/projects/'
   * @param {*} fileName 文件名
   * @param {*} dataObj 数据obj
   */
  createAndWriteFile(path, fileName, dataObj) {
    return new Promise((resolve, reject) => {
      try {
        console.log("fileName :>> ", fileName);
        console.log("createAndWriteFile dataObj :>> ", dataObj);
        let root = cordova.file.externalRootDirectory;
        // let fullPath = root + 'fdyt/projects/'
        let fullPath = root + path;
        console.log("fullPath :>> ", fullPath);
        window.resolveLocalFileSystemURL(
          fullPath,
          function(dirEntry) {
            console.log(
              "file system open: " + JSON.stringify(dirEntry),
              fileName,
              dataObj
            );
            resolve(createFile(dirEntry, fileName, dataObj, "JSON"));
          },
          onErrorLoadFs
        );
      } catch (error) {
        reject(error);
        console.log("error :>> ", error);
      }
    });
  }

  //   /**
  //    * 打开或创建文件夹,创建文件并写入图片
  //    * @param {*} path
  //    * @param {*} fileName
  //    * @param {*} dataObj
  //    */
  //   createAndWriteImage(path, fileName, dataObj) {
  //     return new Promise((resolve, reject) => {
  //       try {
  //         let root = cordova.file.externalRootDirectory;
  //         // let fullPath = root + 'fdyt/projects/'
  //         let fullPath = root + path;
  //         window.resolveLocalFileSystemURL(
  //           fullPath,
  //           function(dirEntry) {
  //             // console.log('file system open: ' + dirEntry.name)
  //             resolve(createFile(dirEntry, fileName, dataObj, "BLOB"));
  //           },
  //           onErrorLoadFs
  //         );
  //       } catch (error) {
  //         reject(error);
  //         console.log("error :>> ", error);
  //       }
  //     });
  //   }

  /**
   * 指定目录文件,读取JSON格式文件内容
   * @param {*} path 目录路径
   * @param {*} fileName 文件名
   */
  getAndReadJSONFile(path, fileName) {
    return new Promise((resolve, reject) => {
      try {
        let root = cordova.file.externalRootDirectory;
        let fullPath = root + path;
        window.resolveLocalFileSystemURL(
          fullPath,
          function(dirEntry) {
            dirEntry.getFile(
              fileName,
              { create: false, exclusive: false },
              function(fileEntry) {
                // console.log('file system open: ' + fileEntry.name)
                resolve(readJSONFile(fileEntry));
              }
            );
          },
          onErrorLoadFs
        );
      } catch (error) {
        reject(error);
        console.log("error :>> ", error);
      }
    });
  }

  /**
   * 指定目录文件,读取未知格式文件内容，直接返回文本，压缩前读取用
   * @param {*} path 目录路径
   * @param {*} fileName 文件名
   */
  getAndReadFile(path, fileName) {
    return new Promise((resolve, reject) => {
      try {
        let root = cordova.file.externalRootDirectory;
        let fullPath = root + path;
        window.resolveLocalFileSystemURL(
          fullPath,
          function(dirEntry) {
            dirEntry.getFile(
              fileName,
              { create: false, exclusive: false },
              function(fileEntry) {
                // console.log('file system open: ' + fileEntry.name)
                resolve(readFile(fileEntry));
              }
            );
          },
          onErrorLoadFs
        );
      } catch (error) {
        reject(error);
        console.log("error :>> ", error);
      }
    });
  }

  /**
   * 创建文件夹
   * @param {*} path 于根目录的目录例子'fdyt/projects'
   */
  createDirectory(path) {
    return new Promise((resolve, reject) => {
      try {
        // console.log('cordova.file :>> ', cordova.file)
        let root = cordova.file.externalRootDirectory;
        window.resolveLocalFileSystemURL(root, function(dirEntry) {
          createDir(dirEntry, path.split("/"));
        });
      } catch (error) {
        reject(error);
        console.log("error :>> ", error);
      }
    });
  }

  /**
   * 删除文件
   * @param {*} path 目录
   * @param {*} fileName 文件名
   */
  handleDeleteFile(path, fileName) {
    return new Promise((resolve, reject) => {
      try {
        let root = cordova.file.externalRootDirectory;
        let fullPath = root + path;
        window.resolveLocalFileSystemURL(
          fullPath,
          function(dirEntry) {
            dirEntry.getFile(
              fileName,
              { create: false, exclusive: false },
              function(fileEntry) {
                // console.log('file system delete: ' + fileEntry.name)
                resolve(deleteFile(fileEntry));
              }
            );
          },
          onErrorLoadFs
        );
      } catch (error) {
        reject(error);
        console.log("error :>> ", error);
      }
    });
  }

  //   handleMoveFile(oldPath, newPath, fileName) {
  //     return new Promise((resolve, reject) => {
  //       try {
  //         let root = cordova.file.externalRootDirectory;
  //         let oldFullPath = root + oldPath + fileName;
  //         let newFullPath = root + newPath;
  //         window.resolveLocalFileSystemURL(
  //           oldFullPath,
  //           function(fileEntry) {
  //             window.resolveLocalFileSystemURL(
  //               newFullPath,
  //               function(dirEntry) {
  //                 // move the file to a new directory and rename it
  //                 fileEntry.moveTo(
  //                   dirEntry,
  //                   fileName,
  //                   function(fileEntry) {
  //                     resolve(fileEntry.fullPath);
  //                     // console.log('移动文件成功：' + fileEntry.fullPath)
  //                   },
  //                   onErrorLoadFs
  //                 );
  //               },
  //               onErrorLoadFs
  //             );
  //           },
  //           onErrorLoadFs
  //         );
  //       } catch (error) {
  //         reject(error);
  //         console.log("error :>> ", error);
  //       }
  //     });
  //   }
  /**
   * 获取目录下的文件夹列表
   * @param {*} path 目录
   */
  getFolderPaths(path) {
    return new Promise((resolve, reject) => {
      try {
        let root = cordova.file.externalRootDirectory;
        let fullPath = root + path;
        // let fullPath = "file:///storage/emulated/0";
        window.resolveLocalFileSystemURL(
          fullPath,
          function(dirEntry) {
            dirEntry.createReader().readEntries(function(entry_array) {
              let folders = [];
              for (let i = 0; i < entry_array.length; i++) {
                const element = entry_array[i];
                if (!element.isFile) {
                  let pushData = {
                    name: element.name,
                    fullPath: element.fullPath.slice(1), // 返回没有前面的'/'
                    nativeURL: element.nativeURL
                  };
                  folders.push(pushData);
                }
              }
              resolve(folders);
            });
          },
          onErrorLoadFs
        );
      } catch (error) {
        reject(error);
        console.log("error :>> ", error);
      }
    });
  }

  /**
   * 获取目录下的文件列表
   * @param {*} path 目录
   */
  getFilePaths(path) {
    return new Promise((resolve, reject) => {
      try {
        let root = cordova.file.externalRootDirectory;
        let fullPath = root + path;
        let files = [];
        window.resolveLocalFileSystemURL(
          fullPath,
          function(dirEntry) {
            dirEntry.createReader().readEntries(function(entry_array) {
              for (let i = 0; i < entry_array.length; i++) {
                const element = entry_array[i];
                if (element.isFile) {
                  let pushData = {
                    name: element.name,
                    fullPath: element.fullPath.slice(1), // 返回没有前面的'/'
                    nativeURL: element.nativeURL
                  };
                  files.push(pushData);
                }
              }
              resolve(files);
            });
          },
          onErrorLoadFs
        );
      } catch (error) {
        reject(error);
        console.log("getFilePaths error :>> ", error);
      }
    });
  }
}

const handleLocalFile = new HandleLocalFileClass();

/**
 * 递归创建文件夹
 * @param {*} rootDirEntry root下的DirEntry
 * @param {*} folders 文件夹数组
 */
function createDir(rootDirEntry, folders) {
  if (folders[0] === "." || folders[0] === "") {
    folders = folders.slice(1);
  }
  if (folders.length === 0) {
    return;
  }
  console.log("createDir :>> ", rootDirEntry, folders[0] + "/", folders);
  rootDirEntry.getDirectory(
    folders[0] + "/",
    { create: true, exclusive: false },
    function(dirEntry) {
      // console.info(dirEntry.fullPath)
      if (folders.length) {
        createDir(dirEntry, folders.slice(1));
      }
    },
    onErrorGetDir
  );
}

//将内容数据写入到文件中
function writeFile(fileEntry, dataObj) {
  // Create a FileWriter object for our FileEntry (log.txt).
  return new Promise((resolve, reject) => {
    try {
      fileEntry.createWriter(function(fileWriter) {
        fileWriter.onwriteend = function() {
          // console.log('Successful file write...')
          resolve({
            success: true
          });
          // readFile(fileEntry)
        };
        fileWriter.onerror = function(e) {
          reject(e);
          // console.log('Failed file write: ' + e.toString())
        };
        // If data object is not passed in,
        // create a new Blob instead.
        if (!dataObj) {
          dataObj = new Blob([JSON.stringify(dataObj)], {
            type: "application/json"
          });
        }
        fileWriter.write(dataObj);
      });
    } catch (error) {
      reject(error);
    }
  });
}

//将BLOB内容数据写入到文件中
function writeBlobFile(fileEntry, dataObj) {
  // Create a FileWriter object for our FileEntry (log.txt).
  return new Promise((resolve, reject) => {
    try {
      fileEntry.createWriter(function(fileWriter) {
        fileWriter.onwriteend = function() {
          // console.log('Successful file write...')
          resolve({
            success: true
          });
          // readFile(fileEntry)
        };
        fileWriter.onerror = function(e) {
          reject(e);
          // console.log('Failed file write: ' + e.toString())
        };
        // If data object is not passed in,
        // create a new Blob instead.
        // if (!dataObj) {
        //   dataObj = new Blob([JSON.stringify(dataObj)], { type: 'application/json' })
        // }
        fileWriter.write(dataObj);
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * 创建文件
 * @param {*} dirEntry 文件夹目录路径
 * @param {*} fileName 文件名
 * @param {*} dataObj obj数据
 */
function createFile(dirEntry, fileName, dataObj, type) {
  // Creates a new file or returns the file if it already exists.
  return new Promise((resolve, reject) => {
    try {
      dirEntry.getFile(
        fileName,
        { create: true, exclusive: false },
        function(fileEntry) {
          console.log("createFile fileEntry:>> ", fileEntry);
          if (type === "JSON") {
            resolve(writeFile(fileEntry, dataObj));
          } else if (type === "BLOB") {
            resolve(writeBlobFile(fileEntry, dataObj));
          }
        },
        onErrorCreateFile
      );
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * 读取JSON格式文件，返回obj对象
 * @param {*} fileEntry fileEntry对象
 */
function readJSONFile(fileEntry) {
  return new Promise((resolve, reject) => {
    try {
      fileEntry.file(function(file) {
        let reader = new FileReader();
        reader.onloadend = function() {
          // console.log('Successful file read: ' + this.result)
          // console.log('fileEntry.fullPath :>> ', fileEntry.fullPath)
          let reData = this.result;
          try {
            reData = JSON.parse(reData);
          } catch (error) {
            console.log("error :>> ", error);
            reData = {};
          }
          resolve({
            success: true,
            data: reData
          });
          // displayFileData(fileEntry.fullPath + ': ' + this.result)
        };
        reader.onerror = function(e) {
          reject(e);
        };
        reader.readAsText(file);
      }, onErrorReadFile);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * 读取格式文件，直接返回文本
 * @param {*} fileEntry fileEntry对象
 */
function readFile(fileEntry) {
  return new Promise((resolve, reject) => {
    try {
      fileEntry.file(function(file) {
        let reader = new FileReader();
        reader.onloadend = function() {
          // console.log('Successful file read: ' + this.result)
          // console.log('fileEntry.fullPath :>> ', fileEntry.fullPath)
          let reData = this.result;
          resolve({
            success: true,
            data: reData
          });
          // displayFileData(fileEntry.fullPath + ': ' + this.result)
        };
        reader.onerror = function(e) {
          reject(e);
        };
        reader.readAsText(file);
      }, onErrorReadFile);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * 删除文件
 * @param {*} fileEntry fileEntry
 */
function deleteFile(fileEntry) {
  return new Promise((resolve, reject) => {
    try {
      fileEntry.remove(
        function() {
          resolve({
            success: true
          });
        },
        function(err) {
          console.error(err);
          reject(err);
        },
        function() {
          console.log("file not exist");
          reject("file not exist");
        }
      );
    } catch (error) {
      reject(error);
    }
  });
}

//FileSystem加载失败回调
function onErrorLoadFs(error) {
  console.log("error :>> ", error);
  console.log("文件系统加载失败！");
  throw "文件系统加载失败！";
}

//文件夹创建失败回调
function onErrorGetDir(error) {
  console.log("error :>> ", error);
  console.log("文件夹创建失败！");
  throw "文件夹创建失败！";
}

//文件创建失败回调
function onErrorCreateFile(error) {
  console.log("error :>> ", error);
  console.log("文件创建失败！");
  throw "文件创建失败！";
}

//读取文件失败响应
function onErrorReadFile(error) {
  console.log("error :>> ", error);
  console.log("文件读取失败!");
  throw "文件读取失败!";
}

export default handleLocalFile;
