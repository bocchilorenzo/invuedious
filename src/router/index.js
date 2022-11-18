import { createRouter, createWebHistory } from "vue-router";
import mainPage from "../views/mainVideos.vue";

const routes = [
  {
    path: "/",
    name: "popular",
    component: mainPage,
  },
  {
    path: "/top",
    name: "top",
    component: mainPage,
  },
  {
    path: "/trending",
    name: "trending",
    component: mainPage,
  },
  {
    path: "/watch/:id",
    name: "video",
    component: function () {
      return import(/* webpackChunkName: "video" */ "../views/video.vue");
    },
  },
  {
    path: "/search/videos/:q",
    name: "searchVideo",
    component: function () {
      return import(/* webpackChunkName: "search" */ "../views/search.vue");
    },
  },
  {
    path: "/search/channels/:q",
    name: "searchChannel",
    component: function () {
      return import(/* webpackChunkName: "search" */ "../views/search.vue");
    },
  },
  {
    path: "/channel/:id",
    name: "channel",
    component: function () {
      return import(/* webpackChunkName: "channel" */ "../views/channel.vue");
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
