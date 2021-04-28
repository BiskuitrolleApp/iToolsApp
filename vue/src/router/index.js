import Vue from "vue";
import VueRouter from "vue-router";
import homeLayer from '@/layout/homepage.vue'
import defaultLayer from '@/layout/default.vue'

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "home",
    component: homeLayer,
    children: [{
      path: "",
      name: "homepage",
      component: () => import("../views/home/index.vue")
    }]
  },
  {
    path: "/video",
    name: "video",
    component: () => import("@/views/video/index.vue")
  },
  {
    path: "/walker",
    name: "walker",
    component: () => import("@/views/walker/index.vue")
  },
  {
    /**
     * 图片预设页面
     */
    path: "/photo",
    component: defaultLayer,
    name: "photo",
    children: [{
      meta: {
        title: "编辑图片",
        back: "/"
      },
      path: "",
      name: "photoPreset",
      component: () => import("@/views/photoPreset/index.vue")
    }]
  }
];

const router = new VueRouter({
  routes
});

export default router;