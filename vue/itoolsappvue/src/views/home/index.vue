<template>
  <div class="homepage">
    <van-nav-bar title="主页" />
    <div v-for="(lItem, lIndex) in views" :key="lIndex">
      <div>
        <h2 class="home_lable">{{ lItem.title }}</h2>
      </div>
      <span v-for="(pItem, pIndex) in lItem.list" :key="pIndex">
        <card
          :title="pItem.title"
          :subtitle="pItem.subTitle"
          :bg="pItem.bgi"
          :disabled="pItem.disabled"
          @click.native="jumbToUrl(pItem)"
        ></card>
      </span>
    </div>
  </div>
</template>
<script>
import card from "@/components/card";
import { views } from "@/assets/js/pageList.js";

import { fileServer } from "@/assets/js/config.js";
import _ from "lodash";

export default {
  components: {
    card
  },
  data() {
    return {
      active: 0,
      views
    };
  },
  mounted() {
    this.initCordovaPlugin();
  },
  methods: {
    bootCordova(callback) {
      return new Promise((resolve, reject) => {
        if (_.isNil(window.cordova)) {
          resolve();
        } else {
          document.addEventListener(
            "deviceready",
            async () => {
              try {
                await callback();
                resolve();
              } catch (err) {
                reject(err);
              }
            },
            false
          );
        }
      });
    },
    jumbToUrl(pageInfo) {
      if (pageInfo.disabled) {
        this.$toast("当前地址无法进入");
        return;
      }
      this.$router.push(pageInfo.page);
      // window.location.href = "http://www.baidu.com";
    },
    async initCordovaPlugin() {
      //Caution: This code will be move to cordova dictionary
      let that = this;
      try {
        window.httpd = { enable: false };
        await that.bootCordova(async () => {
          //申请权限
          let permissions = cordova.plugins.permissions;
          permissions.requestPermissions(
            [
              permissions.INTERNET,
              permissions.ACCESS_NETWORK_STATE,
              permissions.CAMERA,
              permissions.WRITE_EXTERNAL_STORAGE,
              permissions.READ_EXTERNAL_STORAGE,
              permissions.ACCESS_COARSE_LOCATION,
              permissions.ACCESS_FINE_LOCATION
            ],
            () => {
              // GPS.start()
            },
            () => {}
          );

          //启动内部服务
          let root = $Util.getUrlPath(cordova.file.externalRootDirectory);
          console.log('root getUrlPath:>> ', root);
          await new Promise((resolve, reject) => {
            let httpd = cordova.plugins.CorHttpd;
            httpd.getURL(url => {
              if (url.length > 0) {
                window.httpd = {
                  enable: true,
                  url
                };
                resolve();
              } else {
                httpd.startServer(
                  {
                    www_root: `${root}`,
                    port: fileServer.port,
                    localhost_only: false
                  },
                  url => {
                    window.httpd = {
                      enable: true,
                      url
                    };
                    httpd.getLocalPath(path =>
                      console.log("LOC PATH: " + path)
                    );
                    resolve();
                  },
                  err => {
                    reject(err);
                  }
                );
              }
            });
          });
        });
      } catch (err) {
        alert(err);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.homepage {
  width: 100vw;
  height: calc(100vh + 120px);
  // background: #ccc;
}
.home_lable {
  width: 80vw;
  padding: 10px 30px 0px;
  color: rgba(69, 90, 100, 0.6);
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
}
</style>
