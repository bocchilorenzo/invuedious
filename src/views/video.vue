<template>
  <div class="container2">
    <div v-if="loading" class="loading loading-lg"></div>
    <div v-else>
      <div v-if="failed">
        <div class="empty">
          <div class="empty-icon">
            <unicon name="sad-dizzy" fill="var(--primary)" width="50px" height="50px" />
          </div>
          <p class="empty-title h5">Connection error</p>
          <p class="empty-subtitle">
            The request to indvidio.us servers took too long.
            <br />Check your connection and try again.
          </p>
          <div class="empty-action">
            <button class="btn btn-primary" @click="reconnect()">RETRY</button>
          </div>
        </div>
      </div>
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
  </div>
</template>

<script>
var numeral = require("numeral");
import axios from "axios";
import videoplayer from "../components/videoplayer.vue";
import videoinfo from "../components/videoinfo.vue";
import recommended from "../components/recommended.vue";
import comments from "../components/comments.vue";

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
      videoInfo: [],
      failed: false
    };
  },
  methods: {
    reconnect() {
      this.loading = true;
      this.failed = false;
      this.getVideo();
    },
    displayWindowSize() {
      this.myWidth = window.innerWidth;
      this.myHeight = window.innerHeight;
    },
    getVideo() {
      axios({
        url: "https://invidio.us/api/v1/videos/" + this.videoId,
        timeout: 10000
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
        .catch(error => {
          if (error.code == "ECONNABORTED") {
            this.failed = true;
          }
          console.log(error.code);
        })
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