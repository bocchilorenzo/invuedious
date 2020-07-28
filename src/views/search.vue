<template>
  <div class="container2">
    <div v-if="loading" class="loading loading-lg"></div>
    <div v-else>
      <cardContainer :videoArray="videoArray" />
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
      bottom: false
    };
  },
  created() {
    this.getVideoData();
    window.addEventListener("scroll", () => {
      this.bottom = this.bottomVisible();
    });
  },
  methods: {
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
        url: url
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
        .catch(error => console.log(error))
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

<style>
</style>