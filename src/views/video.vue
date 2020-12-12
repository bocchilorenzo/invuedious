<template>
  <div class="container2">
    <div v-if="loading" class="loading loading-lg"></div>
    <div v-else>
      <div v-if="failed">
        <div class="empty">
          <div class="empty-icon">
            <unicon
              name="sad-dizzy"
              fill="var(--primary)"
              width="50px"
              height="50px"
            />
          </div>
          <p class="empty-title h5">Connection error</p>
          <p class="empty-subtitle">
            The request to indvidio.us servers took too long, or the video
            doesn't exist.
            <br />Check your connection and try again.
          </p>
          <div class="empty-action">
            <button class="btn btn-primary" @click="reconnect()">RETRY</button>
          </div>
        </div>
      </div>
      <div v-else>
        <div id="content" class="columns">
          <div class="column col-lg-12 col-9">
            <videoplayer :videoInfo="videoInfo" />
            <videoinfo :videoInfo="videoInfo" />
            <comments :videoId="videoId" v-if="myWidth > 960" />
          </div>
          <div class="column col-lg-12 col-2 customMargin">
            <recommended :videoInfo="videoInfo" />
          </div>
          <div class="column col-12">
            <comments :videoId="videoId" v-if="myWidth <= 960" />
          </div>
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
    comments,
  },
  data() {
    return {
      videoId: this.$route.params.id,
      loading: true,
      myWidth: 0,
      myHeight: 0,
      videoInfo: [],
      failed: false,
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
        url: "https://invidious.fdn.fr/api/v1/videos/" + this.videoId,
        timeout: 10000,
      })
        .then((response) => {
          this.videoInfo.push(response.data);
          document.title = this.videoInfo[0].title + " - Invuedious";
          this.videoInfo[0].thumb = this.videoInfo[0].videoThumbnails[2].url;
          for (let i = 0; i < this.videoInfo[0].formatStreams.length; i++) {
            this.videoInfo[0].formatStreams[
              i
            ].qualityLabel = this.videoInfo[0].formatStreams[
              i
            ].qualityLabel.substring(
              0,
              this.videoInfo[0].formatStreams[i].qualityLabel.length - 1
            );
            if (this.videoInfo[0].formatStreams[i].qualityLabel == "720") {
              this.videoInfo[0].thumb = this.videoInfo[0].videoThumbnails[1].url;
            }
          }
          this.videoInfo[0].formattedViews = numeral(
            response.data.viewCount
          ).format("0a");
          if (
            this.videoInfo[0].formattedViews.charAt(
              this.videoInfo[0].formattedViews.length - 1
            ) == "m"
          ) {
            var strtmp =
              this.videoInfo[0].formattedViews.substr(
                0,
                this.videoInfo[0].formattedViews.length - 1
              ) + "M";
            this.videoInfo[0].formattedViews = strtmp;
          }
        })
        .catch(() => {
          this.failed = true;
        })
        .then(() => (this.loading = false));
    },
  },
};
</script>

<style scoped>
#resizer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
}
@media (min-width: 961px) {
  .customMargin {
    padding-left: 50px;
  }
}
#content {
  display: flex;
  justify-content: center;
}
</style>
