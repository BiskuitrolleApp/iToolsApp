import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/layout/default.vue"),
    children: [
      {
        path: "",
        name: "homepage",
        component: () => import("../views/home/index.vue")
      }
    ]
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
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
    path: "/iframe",
    name: "iframe",
    component: () => import("@/views/iframe/index.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
