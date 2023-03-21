import Vue from 'vue'
import VueRouter from 'vue-router'
import homeLayer from '@/layout/homepage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/demoComponents'
  },
  {
    path: '/home',
    name: 'home',
    component: homeLayer,
    children: [
      {
        path: '',
        name: 'homepage',
        component: () => import('../views/home/index.vue')
      }
    ]
  }
  // {
  //   path: "/video",
  //   name: "video",
  //   component: () => import("@/views/video/index.vue")
  // },
  // {
  //   path: "/walker",
  //   name: "walker",
  //   component: () => import("@/views/walker/index.vue")
  // },
  // {
  //   /**
  //    * 图片预设页面
  //    */
  //   path: "/photo",
  //   component: defaultLayer,
  //   name: "photo",
  //   children: [{
  //     meta: {
  //       title: "编辑图片",
  //       back: "/"
  //     },
  //     path: "",
  //     name: "photoPreset",
  //     component: () => import("@/views/photoPreset/index.vue")
  //   }]
  // }
]

// 批量导入路由，和views里面每个模块里面的config/router.js 有关
const requireModule = require.context('@/views/', true, /router\/index\.js/)
requireModule.keys().forEach(fileName => {
  let invalidPath = [
    '.',
    '..',
    'router',
    'views',
    'components',
    'config',
    'index.js'
  ]
  let fileNameList = fileName
    .split('/')
    .filter(item => invalidPath.indexOf(item) < 0)
  console.log('routes fileNameList', fileName, fileNameList)
  let router = {
    path: '/' + fileNameList.join('/'),
    name: fileNameList.join('-')
  }
  const module = requireModule(fileName)
  if (module.default) {
    router = { ...router, ...module.default }
  }
  routes.push(router)
})

console.log('routes', routes)

const router = new VueRouter({
  routes
})

export default router
