import Vue from 'vue'
import VueRouter from 'vue-router'
import mainPage from '../views/mainVideos.vue'

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
  }
]

const router = new VueRouter({
  routes
})

export default router
