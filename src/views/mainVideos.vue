<template>
  <div>
    <ul class="tab tab-block">
      <li class="tab-item" id="tab1">
        <router-link :to="{
                    name: 'popular',
                }">
          <unicon name="fire" fill="var(--primary)" />POPULAR
        </router-link>
      </li>
      <!--
      <li class="tab-item" id="tab2">
        <router-link :to="{
                    name: 'top',
                }">TOP</router-link>
      </li>
      -->
      <li class="tab-item" id="tab3">
        <router-link :to="{
                    name: 'trending',
                }">
          <unicon name="chart-line" fill="var(--primary)" />TRENDING
        </router-link>
      </li>
    </ul>
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
        <cardContainer v-else :videoArray="videoArray" />
      </div>
    </div>
  </div>
</template>

<script>
var numeral = require("numeral");
import cardContainer from "../components/cardContainer.vue";
import axios from "axios";
export default {
  name: "mainPage",
  components: {
    cardContainer
  },
  data() {
    return {
      videoArray: [],
      loading: true,
      failed: false
    };
  },
  mounted() {
    this.checkActive();
  },
  created() {
    this.getVideoData();
  },
  methods: {
    reconnect() {
      this.loading = true;
      this.failed = false;
      this.getVideoData();
    },
    getVideoData() {
      var url = "";
      if (this.$route.name == "popular") {
        url = "https://invidious.13ad.de/api/v1/popular";
      } else {
        /*
      else if(this.$route.name == "top"){
        url = "https://invidious.13ad.de/api/v1/top"
      }
      */
        url = "https://invidious.13ad.de/api/v1/trending";
      }
      axios({
        url: url,
        timeout: 1000
      })
        .then(response => {
          var tmpObj = {};
          for (let i = 0; i < response.data.length; i++) {
            tmpObj = response.data[i];
            tmpObj.formattedViews = numeral(response.data[i].viewCount).format(
              "0a"
            );
            if (
              tmpObj.formattedViews.charAt(tmpObj.formattedViews.length - 1) ==
              "m"
            ) {
              var strtmp =
                tmpObj.formattedViews.substr(
                  0,
                  tmpObj.formattedViews.length - 1
                ) + "M";
              tmpObj.formattedViews = strtmp;
            }
            tmpObj.formattedViews += " views";
            this.videoArray.push(tmpObj);
          }
        })
        .catch(() => {
          this.getVideoData();
        })
        .then(() => (this.loading = false));
    },
    checkActive() {
      if (this.$route.name == "popular") {
        document.getElementById("tab1").classList.add("active");
        //document.getElementById("tab2").classList.remove("active");
        document.getElementById("tab3").classList.remove("active");
      } /*else if (this.$route.name == "top") {
        document.getElementById("tab2").classList.add("active");
        document.getElementById("tab1").classList.remove("active");
        document.getElementById("tab3").classList.remove("active");
      }*/ else {
        document.getElementById("tab3").classList.add("active");
        //document.getElementById("tab2").classList.remove("active");
        document.getElementById("tab1").classList.remove("active");
      }
    }
  }
};
</script>

<style scoped>
</style>