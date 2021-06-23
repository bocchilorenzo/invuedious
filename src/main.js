import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "spectre.css"
import VuePlyr from '@skjnldsv/vue-plyr'
import '@skjnldsv/vue-plyr/dist/dist/vue-plyr.css'
import Unicon from 'vue-unicons'
import { uniThumbsUp, uniSetting, uniThumbsDown, uniAngleDown, uniFire, uniChartLine, uniTvRetroSlash, uniTvRetro, uniHeart, uniImageTimes, uniFrown, uniYoutube, uniCircleLayer, uniSadDizzy, uniAngleUp, uniVideo, uniChannel, uniInfoCircle } from 'vue-unicons/src/icons'
import store from './store'

Unicon.add([uniThumbsUp, uniSetting, uniThumbsDown, uniAngleDown, uniFire, uniChartLine, uniImageTimes, uniTvRetroSlash, uniTvRetro, uniHeart, uniFrown, uniYoutube, uniCircleLayer, uniSadDizzy, uniAngleUp, uniVideo, uniChannel, uniInfoCircle])
Vue.use(Unicon)

// The second argument is optional and sets the default config values for every player.
Vue.use(VuePlyr, {
  plyr: {
    fullscreen: { enabled: true },
    quality: { default: 720, options: [720, 360] },
    settings: ['quality', 'speed', 'captions', 'loop'],
    captions: { active: false, language: 'auto' },
  },
  emit: ['ended']
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
