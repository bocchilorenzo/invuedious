import Vue from 'vue'
import VueRouter from 'vue-router'
import mainPage from '../views/mainVideos.vue'
import searchPage from '../views/search.vue'
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
  },
  {
    path: '/search/:q',
    name: 'search',
    component: searchPage
  }
]

const router = new VueRouter({
  routes
})

export default router
