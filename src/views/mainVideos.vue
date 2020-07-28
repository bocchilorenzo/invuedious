<template>
  <div>
    <ul class="tab tab-block">
      <li class="tab-item" id="tab1">
        <router-link :to="{
                    name: 'popular',
                }"><unicon name="fire" fill="var(--primary)" />POPULAR</router-link>
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
                }"><unicon name="chart-line" fill="var(--primary)" />TRENDING</router-link>
      </li>
    </ul>
    <div class="container2">
      <div v-if="loading" class="loading loading-lg"></div>
      <div v-else>
        <cardContainer :videoArray="videoArray" />
      </div>
    </div>
  </div>
</template>

<script>
var numeral = require("numeral");
import cardContainer from "../components/cardContainer";
import axios from "axios";
export default {
  name: "mainPage",
  components: {
    cardContainer
  },
  data() {
    return {
      videoArray: [],
      loading: true
    };
  },
  mounted(){
    this.checkActive()
  },
  created() {
    this.getVideoData();
  },
  methods: {
    getVideoData() {
      var url = "";
      if (this.$route.name == "popular") {
        url = "https://invidio.us/api/v1/popular";
      } else {
        /*
      else if(this.$route.name == "top"){
        url = "https://invidio.us/api/v1/top"
      }
      */
        url = "https://invidio.us/api/v1/trending";
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
        })
        .catch(error => console.log(error))
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
  .tab{
    margin: 0 auto;
  }
  @media screen and (min-width: 768px) {
    .tab{
      width: 50%!important;
    }
  }
</style>