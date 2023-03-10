import LocalForage from "localforage";
import CordovaSQLiteDriver from "localforage-cordovasqlitedriver";
export default class Storage {
  constructor() {
    this.dbPromise = new Promise((resolve, reject) => {
      let db;

      let config = {
        name: "_vuestorage",
        storeName: "_vuekv",
        driverOrder: ["sqlite", "indexeddb", "websql", "localstorage"],
      };

      LocalForage.defineDriver(CordovaSQLiteDriver)
        .then(() => {
          db = LocalForage.createInstance(config);
        })
        .then(() => db.setDriver(this.getDriverOrder(config.driverOrder)))
        .then(() => {
          resolve(db);
        })
        .catch((reason) => reject(reason));
    });
  }
  ready() {
    return this.dbPromise;
  }

  getDriverOrder(driverOrder) {
    return driverOrder.map((driver) => {
      switch (driver) {
        case "sqlite":
          return CordovaSQLiteDriver._driver;
        case "indexeddb":
          return LocalForage.INDEXEDDB;
        case "websql":
          return LocalForage.WEBSQL;
        case "localstorage":
          return LocalForage.LOCALSTORAGE;
      }
    });
  }

  get(key) {
    return this.dbPromise.then((db) => db.getItem(key));
  }

  set(key, value) {
    return this.dbPromise.then((db) => db.setItem(key, value));
  }

  remove(key) {
    return this.dbPromise.then((db) => db.removeItem(key));
  }

  clear() {
    return this.dbPromise.then((db) => db.clear());
  }
}

//使用方法

/**
 * import Storage from "@/services/storage.js";
 * const storage = new Storage();
 * storage.get("subreddit").then((value) => {
      if (value === null) {
        value = "gifs";
      }
      this.val = value;
    });

    storage.set("subreddit", subreddit);
 */
