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
            The request to the indvidious instance took too long, or the video
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
  props: {
    reload: Boolean,
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
    async getVideo() {
      await fetch(
        this.$store.state.selected + "/api/v1/videos/" + this.videoId,
        {
          signal: AbortSignal.timeout(10000),
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          this.videoInfo = response;
          document.title = this.videoInfo.title + " - Invuedious";
          this.videoInfo.thumb = this.videoInfo.videoThumbnails[0].url;
          for (let i = 0; i < this.videoInfo.formatStreams.length; i++) {
            this.videoInfo.formatStreams[i].qualityLabel =
              this.videoInfo.formatStreams[i].qualityLabel.substring(
                0,
                this.videoInfo.formatStreams[i].qualityLabel.length - 1
              );
            if (this.videoInfo.formatStreams[i].qualityLabel == "720") {
              this.videoInfo.thumb = this.videoInfo.videoThumbnails[1].url;
            }
          }
					console.log(this.videoInfo.title);
          this.videoInfo.formattedViews = numeral(
            response.viewCount
          ).format("0a");
          if (
            this.videoInfo.formattedViews.charAt(
              this.videoInfo.formattedViews.length - 1
            ) == "m"
          ) {
            var strtmp =
              this.videoInfo.formattedViews.substr(
                0,
                this.videoInfo.formattedViews.length - 1
              ) + "M";
            this.videoInfo.formattedViews = strtmp;
          }
        })
        .catch(() => {
          this.failed = true;
        })
        .then(() => (this.loading = false));
      //.then(() => this.downloadCaptions());
    },
    async downloadCaptions() {
      this.videoInfo.downloadedCaptions = [];
      for (let i = 0; i < this.videoInfo.captions.length; i++) {
        await fetch(this.$store.state.selected + this.videoInfo.captions[i].url)
          .then((res) => {
            this.videoInfo.downloadedCaptions.push({
              src: res,
              url: this.videoInfo.captions[i].url,
              label: this.videoInfo.captions[i].label,
              languageCode: this.videoInfo.captions[i].languageCode,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
      this.loading = false;
    },
  },
  watch: {
    reload() {
      if (this.reload) {
        this.loading = true;
        this.videoInfo = [];
        this.reconnect();
      }
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
    box-sizing: content-box;
  }
}
#content {
  display: flex;
  justify-content: center;
}
</style>
