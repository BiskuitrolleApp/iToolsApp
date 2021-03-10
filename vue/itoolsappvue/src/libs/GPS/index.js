import EventEmittor from "eventemitter3";
import _ from "lodash";
// import proj from "./proj";
// import proj2 from "./proj2";

class SimplePositionFilter {
  constructor() {
    this.longitude = 0;
    this.latitude = 0;
    this.delta = 0.00001;
  }

  filter(position, callback) {
    let dx = Math.abs(position.longitude - this.longitude);
    let dy = Math.abs(position.latitude - this.latitude);

    if (dx >= this.delta || dy >= this.delta) {
      this.longitude = position.longitude;
      this.latitude = position.latitude;
      callback(position);
    }
  }
}

function projPosition(position) {
  const { coords, timestamp } = position;
  let {
    latitude,
    longitude,
    altitude,
    accuracy,
    altitudeAccuracy,
    heading,
    speed
  } = coords;

  // let projResult = proj2.gcj2wgs(latitude,longitude)
  // longitude = projResult.lng;
  // latitude = projResult.lat;

  // longitude = projResult[0]
  // latitude = projResult[1]

  altitude = _.isNumber(altitude) ? altitude : 0;
  heading = _.isNumber(heading) ? heading : 0;
  speed = _.isNumber(speed) ? speed : 0;

  return { timestamp, latitude, longitude, altitude, accuracy, heading, speed };
}

class Gps {
  constructor() {
    this._ee = new EventEmittor();
    this._lastWatchId = undefined;

    this.setting = {
      maxAccuracy: 1000,
      tolerance: 10 //过滤阈值
    };

    this.positionFilter = new SimplePositionFilter();
  }

  setOptions(options) {
    this.setting = { ...this.setting, ...options };
  }

  start() {
    // console.log('this.isWatching :>> ', this.isWatching)
    if (this.isWatching) {
      this.stop();
    }

    this._beginWatchPosition();
  }

  getPosition(
    options = {
      // maximumAge: 3600,
      //timeout: 5000,
      enableHighAccuracy: true,
      coorType: "GCJ02"
    }
  ) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position, extra) => {
          resolve(projPosition(position));
        },
        error => {
          reject(error);
        },
        options
      );
    });
  }

  _beginWatchPosition() {
    this._lastWatchId = navigator.geolocation.watchPosition(
      position => {
        let realPosition = projPosition(position);
        // const {maxAccuracy} = this.setting;
        // if(accuracy > maxAccuracy) return;

        // this._ee.emit('position', realPosition)
        this.positionFilter.filter(realPosition, value => {
          // 过滤掉相差小于0.00001的数据
          this._ee.emit("position", value);
        });
      },
      error => {
        this._ee.emit("error", error);
      },
      {
        maximumAge: 3600,
        //timeout: 5000,
        enableHighAccuracy: true,
        coorType: "GCJ02"
      }
    );
    console.log(
      "_beginWatchPosition this._lastWatchId :>> ",
      this._lastWatchId
    );
  }

  get isWatching() {
    return this._lastWatchId !== undefined;
  }

  stop() {
    console.log("stop this._lastWatchId :>> ", this._lastWatchId);
    navigator.geolocation.clearWatch(this._lastWatchId);
    this._lastWatchId = undefined;
  }

  onPosition(fn) {
    return this._ee.on("position", fn);
  }

  onError(fn) {
    return this._ee.on("error", fn);
  }

  off(fn) {}
}

const gps = new Gps();

export default gps;
