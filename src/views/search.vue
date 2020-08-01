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
      <div v-else>
        <cardContainer :videoArray="videoArray" />
        <div class="loading loading-lg"></div>
      </div>
    </div>
  </div>
</template>

<script>
var numeral = require("numeral");
import cardContainer from "../components/cardContainer";
import axios from "axios";
export default {
  name: "searchPage",
  components: {
    cardContainer
  },
  data() {
    return {
      videoArray: [],
      loading: true,
      page: 1,
      bottom: false,
      failed: false
    };
  },
  created() {
    this.getVideoData();
    window.addEventListener("scroll", () => {
      this.bottom = this.bottomVisible();
    });
  },
  destroyed() {
    window.removeEventListener("scroll", () => {
      this.bottom = this.bottomVisible();
    });
  },
  methods: {
    reconnect() {
      this.loading = true;
      this.failed = false;
      this.getVideoData();
    },
    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight - 400;
      const bottomOfPage = visible + scrollY >= pageHeight;
      return bottomOfPage || pageHeight < visible;
    },
    getVideoData() {
      var url =
        "https://invidio.us/api/v1/search?q=" +
        this.$route.params.q +
        "&page=" +
        this.page;
      axios({
        url: url,
        timeout: 10000
      })
        .then(response => {
          var tmpObj = {};
          var tmp = false;
          for (let i = 0; i < response.data.length; i++) {
            tmpObj = response.data[i];
            tmpObj.formattedViews = numeral(response.data[i].viewCount).format(
              "0a"
            );
            tmp = this.checkDouble(response.data[i].videoId);
            if (tmp == false) {
              this.videoArray.push(tmpObj);
            }
          }
        })
        .catch(error => {
          if (error.code == "ECONNABORTED") {
            this.failed = true;
          }
          console.log(error.code);
        })
        .then(() => (this.page += 1))
        .then(() => (this.loading = false));
    },
    checkDouble(videoId) {
      var found = false;
      for (var j = 0; j < this.videoArray.length; j++) {
        if (this.videoArray != null) {
          if (this.videoArray[j] != undefined) {
            if (this.videoArray[j].videoId == videoId) {
              found = true;
            }
          }
        }
      }
      return found;
    }
  },
  watch: {
    bottom(bottom) {
      if (bottom && !this.loading) {
        this.getVideoData();
      }
    }
  }
};
</script>

<style scoped>
</style>