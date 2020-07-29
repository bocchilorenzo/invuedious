<template>
  <div class="container2">
    <div v-if="loading" class="loading loading-lg"></div>
    <div class="columns" v-else>
      <div class="column col-lg-12 col-10">
        <videoplayer :videoInfo="videoInfo" />
        <videoinfo :videoInfo="videoInfo" />
        <comments :videoId="videoId" v-if="myWidth > 960" />
      </div>
      <div class="column col-lg-12 col-2">
        <recommended :videoInfo="videoInfo" />
      </div>
      <div class="column col-12">
        <comments :videoId="videoId" v-if="myWidth <= 960" />
      </div>
    </div>
  </div>
</template>

<script>
var numeral = require("numeral");
import axios from "axios";
import videoplayer from "../components/videoplayer";
import videoinfo from "../components/videoinfo";
import recommended from "../components/recommended";
import comments from "../components/comments";

export default {
  name: "videoPage",
  created() {
    this.getVideo();
    this.displayWindowSize();
    window.onresize = this.displayWindowSize;
  },
  components: {
    videoplayer,
    videoinfo,
    recommended,
    comments
  },
  data() {
    return {
      videoId: this.$route.params.id,
      loading: true,
      myWidth: 0,
      myHeight: 0,
      videoInfo: []
    };
  },
  methods: {
    displayWindowSize() {
      this.myWidth = window.innerWidth;
      this.myHeight = window.innerHeight;
    },
    getVideo() {
      axios({
        url: "https://invidio.us/api/v1/videos/" + this.videoId
      })
        .then(response => {
          this.videoInfo.push(response.data);
          for (var i = 0; i < this.videoInfo[0].formatStreams.length; i++) {
            this.videoInfo[0].formatStreams[
              i
            ].qualityLabel = this.videoInfo[0].formatStreams[
              i
            ].qualityLabel.substring(
              0,
              this.videoInfo[0].formatStreams[i].qualityLabel.length - 1
            );
          }
          this.videoInfo[0].formattedViews = numeral(
            response.data.viewCount
          ).format("0a");
        })
        .catch(error => console.log(error))
        .then(() => (this.loading = false));
    }
  }
};
</script>

<style scoped>
#resizer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
}
</style>