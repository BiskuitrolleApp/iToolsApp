<template>
  <div class="homepage">
    <van-nav-bar
      title="主页"
      fixed
      z-index="3"
      v-show="showNavBarStyle.isShowBar"
    >
      <template #right>
        <van-icon name="search" size="18" @click="toTop" />
      </template>
    </van-nav-bar>
    <div class="topBgc" :style="{ background: baseColor }">
      <p class="title appTitle">主页</p>
      <van-search
        class="searchBox"
        v-model="keyword"
        shape="round"
        background="transparent"
        placeholder="请输入搜索关键词"
      />
    </div>
    <!-- <coo-transfer name="moveUp" type="out">
      <div style="height: 30px; width: 30px; background-color: #ff0000"></div>
    </coo-transfer> -->
    <div class="pageList">
      <div v-for="(lItem, lIndex) in viewList" :key="lIndex">
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
    <coo-tabbar :active="active" @change="tabbarChange">
      <coo-tabbar-item icon="icon-shouye" name="home">标签1</coo-tabbar-item>
      <coo-tabbar-item icon="icon-yinle" name="yinle">标签2</coo-tabbar-item>
      <coo-tabbar-item icon="icon-wode" name="wode">标签3</coo-tabbar-item>
    </coo-tabbar>
  </div>
</template>
<script>
import card from '@/components/card'
import { views } from '@/config/homePageList.js'

import { fileServer, color } from '@/config/mapConfig.js'
import _ from 'lodash'
import { pageToTopFuntion } from '@/common/js/common.js'

export default {
  components: {
    card
  },
  data() {
    return {
      active: 'home',
      views,
      keyword: '',
      baseColor: color.baseColor,
      isMenuOpen: false,

      showNavBarStyle: {
        isShowBar: false,
        scrollHight: 200
      }
    }
  },
  computed: {
    viewList() {
      let data = this.filterTitle(this.keyword, views)
      return data
    }
  },
  mounted() {
    // this.initCordovaPlugin()
    window.addEventListener('scroll', this.showIcon)
  },
  methods: {
    tabbarChange(e) {
      console.log('tabbarChange :>> ', e)
    },
    //点击回到顶部方法
    toTop() {
      pageToTopFuntion()
    },
    //滚动高度触发
    showIcon() {
      let { showNavBarStyle } = this
      if (
        document.documentElement.scrollTop &&
        document.documentElement.scrollTop > showNavBarStyle.scrollHight
      ) {
        //页面高度大于200执行操作;
        showNavBarStyle.isShowBar = true
      } else {
        //页面高度小于200执行操作;
        showNavBarStyle.isShowBar = false
      }
      this.showNavBarStyle = showNavBarStyle
      // console.log("this.showNavBarStyle :>> ", this.showNavBarStyle);
    },
    menuClick() {
      this.isMenuOpen = !this.isMenuOpen
    },
    //过滤主页方法
    filterTitle(keyword, views) {
      let data = []
      if (_.isNil(keyword) || keyword == '') {
        data = views
      } else {
        views.forEach(view => {
          if (!_.isNil(view.title) && view.title.indexOf(keyword) != -1) {
            data.push(view)
          } else if (!_.isNil(view.title) && !_.isNil(view.list)) {
            let tempV = {
              title: view.title,
              list: []
            }
            view.list.forEach(item => {
              if (
                item.title.indexOf(keyword) != -1 ||
                item.subTitle.indexOf(keyword) != -1
              ) {
                tempV.list.push(item)
              }
            })
            if (tempV.list.length > 0) {
              data.push(tempV)
            }
          }
        })
      }
      return data
    },
    bootCordova(callback) {
      return new Promise((resolve, reject) => {
        if (_.isNil(window.cordova)) {
          resolve()
        } else {
          document.addEventListener(
            'deviceready',
            async () => {
              try {
                await callback()
                resolve()
              } catch (err) {
                reject(err)
              }
            },
            false
          )
        }
      })
    },
    jumbToUrl(pageInfo) {
      if (pageInfo.disabled) {
        this.$toast('当前地址无法进入')
        return
      }
      this.$router.push(pageInfo.page)
      // window.location.href = "http://www.baidu.com";
    },
    // async initCordovaPlugin() {
    //   //Caution: This code will be move to cordova dictionary
    //   let that = this
    //   try {
    //     window.httpd = { enable: false }
    //     await that.bootCordova(async () => {
    //       //申请权限
    //       let permissions = cordova.plugins.permissions
    //       permissions.requestPermissions(
    //         [
    //           permissions.INTERNET,
    //           permissions.ACCESS_NETWORK_STATE,
    //           permissions.CAMERA,
    //           permissions.WRITE_EXTERNAL_STORAGE,
    //           permissions.READ_EXTERNAL_STORAGE,
    //           permissions.ACCESS_COARSE_LOCATION,
    //           permissions.ACCESS_FINE_LOCATION
    //         ],
    //         () => {
    //           // GPS.start()
    //         },
    //         () => {}
    //       )

    //       //启动内部服务
    //       let root = $Util.getUrlPath(cordova.file.externalRootDirectory)
    //       console.log('root getUrlPath:>> ', root)
    //       await new Promise((resolve, reject) => {
    //         let httpd = cordova.plugins.CorHttpd
    //         httpd.getURL(url => {
    //           if (url.length > 0) {
    //             window.httpd = {
    //               enable: true,
    //               url
    //             }
    //             resolve()
    //           } else {
    //             httpd.startServer(
    //               {
    //                 www_root: `${root}`,
    //                 port: fileServer.port,
    //                 localhost_only: false
    //               },
    //               url => {
    //                 window.httpd = {
    //                   enable: true,
    //                   url
    //                 }
    //                 httpd.getLocalPath(path => console.log('LOC PATH: ' + path))
    //                 resolve()
    //               },
    //               err => {
    //                 reject(err)
    //               }
    //             )
    //           }
    //         })
    //       })
    //     })
    //   } catch (err) {
    //     alert(err)
    //   }
    // }
  }
}
</script>
<style lang="scss">
@import '../../common/css/menuBtn.scss';
.homepage {
  width: 100vw;
  height: 100%;
  background: #f7f8fa;
  // background: #ccc;
  .home_lable {
    width: 80vw;
    padding: 10px 30px 0px;
    color: rgba(69, 90, 100, 0.6);
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
  }
  .homeNavHeader {
    position: relative;
    z-index: 3;
  }
  .topBgc {
    height: 150px;
    width: 100%;
    border-radius: 0px 0px 20px 20px;
    padding-top: 30px;
    .title {
      height: 60px;
      margin: 30px;
      color: #fff;
    }
    .searchBox {
      height: 50px;
      width: calc(100vw - 20px);
      margin: 0 auto;
    }
    .van-search__content--round {
      border: rgba(25, 137, 250, 0.2) 1px solid;
      background: #fff;
    }
  }
  .pageList {
    margin-top: 30px;
    padding-bottom: 150px;
  }
  .menu {
    position: fixed;
    z-index: 999;
    width: 30px;
    height: 30px;
    top: 20px;
    right: 20px;
  }
}
</style>
