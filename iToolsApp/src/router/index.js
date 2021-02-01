import { createRouter, createWebHistory } from "@ionic/vue-router";
// import { RouteRecordRaw } from "vue-router";
import Tabs from "../views/Tab/Tabs.vue";
import Border from "../views/Border/singleBorder.vue";
import Video from "../views/video/index.vue";
// import Video from "../views/video/addUrl.vue";

const routes = [
  {
    path: "/",
    redirect: "/tabs/home",
  },
  {
    path: "/tabs/",
    component: Tabs,
    children: [
      {
        path: "",
        redirect: "/tabs/home",
      },
      {
        path: "home",
        component: () => import("@/views/Tab/home.vue"),
      },
      {
        path: "me",
        component: () => import("@/views/Tab/me.vue"),
      },
    ],
  },
  {
    path: "/border/",
    component: Border,
    children: [
      {
        path: "",
        redirect: "/border/single",
      },
      {
        path: "single",
        component: () => import("@/views/Border/singleBorder.vue"),
      },
      {
        path: "batch",
        component: () => import("@/views/Border/batchBorder.vue"),
      },
    ],
  },
  {
    path: "/video",
    component: Video,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
