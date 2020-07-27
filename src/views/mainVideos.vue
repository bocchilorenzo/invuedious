<template>
  <div class="container2">
    <div v-if="loading" class="loading loading-lg"></div>
    <div v-else>
      <div class="columns">
        <div
          v-for="video in videoArray"
          :key="video.videoId"
          class="column col-xs-12 col-sm-6 col-md-3 col-2"
        >
          <div class="card">
            <div class="card-image">
              <img :src="video.videoThumbnails[4].url" class="img-responsive" />
            </div>
            <div class="card-header">
              <div class="card-title h6">{{ video.title }}</div>
              <div class="card-subtitle text-gray">{{ video.author }}</div>
            </div>
            <div class="card-body">
              Published: {{video.publishedText}}
              <br />
              Views: {{ video.formattedViews }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var numeral = require("numeral");
import axios from "axios";
export default {
  name: "mainPage",
  data() {
    return {
      videoArray: [],
      loading: true
    };
  },
  created() {
    this.getVideoData();
    this.$emit("checkActive");
  },
  methods: {
    getVideoData() {
      var url = ""
      if(this.$route.name == "popular"){
        url = "https://invidio.us/api/v1/popular"
      }
      /*
      else if(this.$route.name == "top"){
        url = "https://invidio.us/api/v1/top"
      }
      */
      else{
        url = "https://invidio.us/api/v1/trending"
      }
      axios({
        url: url
      })
        .then(response => {
          var tmpObj = {};
          for (let i = 0; i < response.data.length; i++) {
            tmpObj = response.data[i];
            tmpObj.formattedViews = numeral(response.data[i].viewCount).format(
              "0a"
            );
            this.videoArray.push(tmpObj);
          }
          console.log(this.videoArray);
        })
        .catch(error => console.log(error))
        .then(() => (this.loading = false));
    }
  }
};
</script>

<style scoped>
.card-title {
  overflow: hidden;
  white-space: nowrap; /* Don't forget this one */
  text-overflow: ellipsis;
}
.card {
  background-color: black;
  border: none;
}
.card .h6 {
  color: var(--primary);
}
.card-body {
  color: darkgray;
}
@media screen and (max-width: 480px) {
  .card {
    max-width: 320px;
    margin: 0 auto;
  }
}
.container2 {
  padding: 1em 0.8em 0;
}
@media screen and (min-width: 1000px) {
  .container2 {
    width: 90%;
    margin: 0 auto;
  }
}
.column {
  margin-bottom: 1em;
}
</style>
