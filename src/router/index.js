import Vue from 'vue'
import VueRouter from 'vue-router'
import mainPage from '../views/mainVideos.vue'
import searchPage from '../views/search.vue'
import videoPage from '../views/video.vue'
import channelPage from '../views/channel.vue'

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
    path: '/search/videos/:q',
    name: 'searchVideo',
    component: searchPage
  },
  {
    path: '/search/channels/:q',
    name: 'searchChannel',
    component: searchPage
  },
  {
    path: '/channel/:id',
    name: 'channel',
    component: channelPage
  }
]

const router = new VueRouter({
  routes
})

export default router
