import Vue from 'vue'
import VueRouter from 'vue-router'
import mainPage from '../views/mainVideos.vue'
import videoPage from '../views/video.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "*",
    redirect: "/"
  },
  {
    path: '/',
    name: 'popular',
    component: mainPage
  },
  {
    path: '/top',
    name: 'top',
    component: mainPage
  },
  {
    path: '/trending',
    name: 'trending',
    component: mainPage
  },
  {
    path: '/video/:id',
    name: 'video',
    component: videoPage
  }
]

const router = new VueRouter({
  routes
})

export default router
