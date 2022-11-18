import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./css/index.css";
import "spectre.css"
import VuePlyr from "@skjnldsv/vue-plyr";
import "@skjnldsv/vue-plyr/dist/vue-plyr.css";
import Unicon from "vue-unicons";
import {
  uniThumbsUp,
  uniSetting,
  uniThumbsDown,
  uniAngleDown,
  uniFire,
  uniChartLine,
  uniTvRetroSlash,
  uniTvRetro,
  uniHeart,
  uniImageTimes,
  uniFrown,
  uniYoutube,
  uniCircleLayer,
  uniSadDizzy,
  uniAngleUp,
  uniVideo,
  uniChannel,
  uniInfoCircle,
} from "vue-unicons/dist/icons";
Unicon.add([
  uniThumbsUp,
  uniSetting,
  uniThumbsDown,
  uniAngleDown,
  uniFire,
  uniChartLine,
  uniImageTimes,
  uniTvRetroSlash,
  uniTvRetro,
  uniHeart,
  uniFrown,
  uniYoutube,
  uniCircleLayer,
  uniSadDizzy,
  uniAngleUp,
  uniVideo,
  uniChannel,
  uniInfoCircle,
]);

createApp(App)
  .use(store)
  .use(router)
  .use(VuePlyr, {
    plyr: {
      fullscreen: { enabled: true },
      quality: { default: 720, options: [720, 360] },
      settings: ["quality", "speed", "captions", "loop"],
      captions: { active: false, language: "auto" },
    },
    emit: ["ended"],
  })
  .use(Unicon)
  .mount("#app");
