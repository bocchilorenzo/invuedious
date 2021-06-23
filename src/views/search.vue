<template>
  <div>
    <ul class="tab tab-block">
      <li class="tab-item" id="tab1">
        <router-link
          :to="{
            name: 'searchVideo',
            params: { q: query },
          }"
        >
          <unicon name="video" fill="var(--primary)" />VIDEOS
        </router-link>
      </li>
      <li class="tab-item" id="tab2">
        <router-link
          :to="{
            name: 'searchChannel',
            params: { q: query },
          }"
        >
          <unicon name="tv-retro" fill="var(--primary)" />CHANNELS
        </router-link>
      </li>
    </ul>
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
              The request to the indvidious instance took too long.
              <br />Check your connection and try again.
            </p>
            <div class="empty-action">
              <button class="btn btn-primary" @click="reconnect()">
                RETRY
              </button>
            </div>
          </div>
        </div>
        <div v-else>
          <div v-if="dataArray.length == 0">
            <div class="empty">
              <div class="empty-icon">
                <unicon
                  name="frown"
                  fill="var(--primary)"
                  width="50px"
                  height="50px"
                />
              </div>
              <p class="empty-title h5">No results found</p>
            </div>
          </div>
          <div v-else>
            <cardContainer
              :videoArray="dataArray"
              v-if="mode == 'searchVideo'"
            />
            <roundedCardContainer :dataArray="dataArray" v-else />
            <div v-if="!stop" class="loading loading-lg"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var numeral = require("numeral");
import cardContainer from "../components/cardContainer.vue";
import roundedCardContainer from "../components/roundedCardContainer.vue";
import axios from "axios";
export default {
  name: "searchPage",
  components: {
    cardContainer,
    roundedCardContainer,
  },
  props: {
    reload: Boolean,
  },
  data() {
    return {
      dataArray: [],
      loading: true,
      query: this.$route.params.q,
      mode: this.$route.name,
      page: 1,
      bottom: false,
      failed: false,
      stop: false,
    };
  },
  mounted() {
    this.checkActive();
  },
  created() {
    document.title = this.query + " - Invuedious";
    if (this.mode == "searchVideo") {
      this.getVideoData();
    } else {
      this.getChannelsData();
    }
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
    checkActive() {
      if (this.$route.name == "searchVideo") {
        document.getElementById("tab1").classList.add("active");
        document.getElementById("tab2").classList.remove("active");
      } else {
        document.getElementById("tab2").classList.add("active");
        document.getElementById("tab1").classList.remove("active");
      }
    },
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
        this.$store.state.selected +
        "/api/v1/search?q=" +
        this.query +
        "&page=" +
        this.page;
      axios({
        url: url,
        timeout: 10000,
      })
        .then((response) => {
          if (!this.stop) {
            let tmpObj = {};
            let tmp = false;
            for (let i = 0; i < response.data.length; i++) {
              tmpObj = response.data[i];
              tmpObj.formattedViews = numeral(
                response.data[i].viewCount
              ).format("0a");
              if (
                tmpObj.formattedViews.charAt(
                  tmpObj.formattedViews.length - 1
                ) == "m"
              ) {
                var strtmp =
                  tmpObj.formattedViews.substr(
                    0,
                    tmpObj.formattedViews.length - 1
                  ) + "M";
                tmpObj.formattedViews = strtmp;
              }
              tmpObj.formattedViews += " views";
              tmp = this.checkDouble(response.data[i].videoId, "video");
              if (tmp == false) {
                this.dataArray.push(tmpObj);
              }
            }
            if (response.data.length < 20) {
              this.stop = true;
            }
          }
        })
        .catch(() => {
          this.failed = true;
        })
        .then(() => (this.page += 1))
        .then(() => (this.loading = false));
    },
    getChannelsData() {
      var url =
        this.$store.state.selected +
        "/api/v1/search?q=" +
        this.query +
        "&type=channel&page=" +
        this.page;
      axios({
        url: url,
        timeout: 10000,
      })
        .then((response) => {
          if (!this.stop) {
            let tmpObj = {};
            let tmp = false;
            for (let i = 0; i < response.data.length; i++) {
              tmpObj = response.data[i];
              tmpObj.formattedSubs = numeral(response.data[i].subCount).format(
                "0a"
              );
              if (
                tmpObj.formattedSubs.charAt(tmpObj.formattedSubs.length - 1) ==
                "m"
              ) {
                var strtmp =
                  tmpObj.formattedSubs.substr(
                    0,
                    tmpObj.formattedSubs.length - 1
                  ) + "M";
                tmpObj.formattedSubs = strtmp;
              }
              tmp = this.checkDouble(response.data[i].authorId, "channel");
              if (tmp == false) {
                this.dataArray.push(tmpObj);
              }
            }
            if (response.data.length < 20) {
              this.stop = true;
            }
          }
        })
        .catch(() => {
          this.failed = true;
        })
        .then(() => (this.page += 1))
        .then(() => (this.loading = false));
    },
    checkDouble(id, mode) {
      var found = false;
      for (var j = 0; j < this.dataArray.length; j++) {
        if (this.dataArray != null) {
          if (this.dataArray[j] != undefined) {
            if (mode == "video") {
              if (this.dataArray[j].videoId == id) {
                found = true;
              }
            } else {
              if (this.dataArray[j].authorId == id) {
                found = true;
              }
            }
          }
        }
      }
      return found;
    },
  },
  watch: {
    reload() {
      if (this.reload) {
        this.loading = true;
        this.dataArray = [];
        this.page = 1;
        this.bottom = false;
        this.failed = false;
        this.stop = false;
        this.reconnect();
      }
    },
    bottom(bottom) {
      if (bottom && !this.loading) {
        if (this.mode == "searchVideo") {
          this.getVideoData();
        } else {
          this.getChannelsData();
        }
      }
    },
  },
};
</script>

<style scoped></style>
