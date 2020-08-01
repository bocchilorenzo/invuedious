import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "spectre.css"
import VuePlyr from 'vue-plyr'
import Unicon from 'vue-unicons'
import { uniThumbsUp, uniThumbsDown, uniAngleDown, uniFire, uniChartLine, uniFrown, uniYoutube, uniCircleLayer, uniSadDizzy, uniAngleUp, uniVideo, uniChannel, uniInfoCircle } from 'vue-unicons/src/icons'

Unicon.add([uniThumbsUp, uniThumbsDown, uniAngleDown, uniFire, uniChartLine, uniFrown, uniYoutube, uniCircleLayer, uniSadDizzy, uniAngleUp, uniVideo, uniChannel, uniInfoCircle])
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
  render: h => h(App)
}).$mount('#app')
