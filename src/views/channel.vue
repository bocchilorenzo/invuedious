<template>
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
          The request to the indvidious instance took too long, or the channel
          doesn't exist.
          <br />Check your connection and try again.
        </p>
        <div class="empty-action">
          <button class="btn btn-primary" @click="reconnect()">RETRY</button>
        </div>
      </div>
    </div>
    <channelHeader :dataArray="dataArray" />
    <ul class="tab tab-block">
      <li class="tab-item" id="tab1" @click="setActive(1)">
        <router-link
          :to="{
            name: 'channel',
          }"
        >
          <unicon name="video" fill="var(--primary)" />VIDEOS
        </router-link>
      </li>
      <li class="tab-item" id="tab2" @click="setActive(2)">
        <router-link
          :to="{
            name: 'channel',
          }"
        >
          <unicon name="tv-retro" fill="var(--primary)" />CHANNELS
        </router-link>
      </li>
      <li class="tab-item" id="tab3" @click="setActive(3)">
        <router-link
          :to="{
            name: 'channel',
          }"
        >
          <unicon name="info-circle" fill="var(--primary)" />ABOUT
        </router-link>
      </li>
    </ul>
    <div v-if="innerLoading" class="loading loading-lg"></div>
    <div v-else>
      <div class="container2" v-if="mode == 'videos'">
        <div v-if="videoArray.length != 0">
          <cardContainer :videoArray="videoArray" />
          <div v-if="!stop" class="loading loading-lg"></div>
        </div>
        <div v-else>
          <div class="empty">
            <div class="empty-icon">
              <unicon
                name="image-times"
                fill="var(--primary)"
                width="50px"
                height="50px"
              />
            </div>
            <p class="empty-title h5">No videos found</p>
          </div>
        </div>
      </div>
      <div class="container2" v-else>
        <div v-if="mode == 'channels'">
          <roundedCardContainer
            :dataArray="dataArray[0].relatedChannels"
            :mode="'channelInfo'"
            v-if="dataArray[0].relatedChannels.length != 0"
          />
          <div v-else>
            <div class="empty">
              <div class="empty-icon">
                <unicon
                  name="tv-retro-slash"
                  fill="var(--primary)"
                  width="50px"
                  height="50px"
                />
              </div>
              <p class="empty-title h5">No related channels</p>
            </div>
          </div>
        </div>
        <div v-else id="channelDescription">
          <div v-html="dataArray[0].descriptionHtml" id="descriptionText"></div>
          <div>
            <p>
              Joined:
              <span style="color: white">{{ dataArray[0].dateJoined }}</span>
            </p>
            <p>{{ dataArray[0].formattedViews }}</p>
            <p>{{ dataArray[0].formattedSubs }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
var numeral = require("numeral");
import cardContainer from "../components/cardContainer.vue";
import roundedCardContainer from "../components/roundedCardContainer.vue";
import channelHeader from "../components/channelHeader.vue";
export default {
  name: "channelPage",
  data() {
    return {
      loading: true,
      innerLoading: true,
      mode: "videos",
      dataArray: [],
      videoArray: [],
      id: this.$route.params.id,
      page: 1,
      stop: false,
      bottom: false,
      failed: false,
    };
  },
  props: {
    reload: Boolean,
  },
  components: {
    cardContainer,
    roundedCardContainer,
    channelHeader,
  },
  created() {
    this.getChannelData();
    this.getChannelVideos();
    window.addEventListener("scroll", () => {
      this.bottom = this.bottomVisible();
    });
  },
  methods: {
    reconnect() {
      this.loading = true;
      this.innerLoading = true;
      this.mode = "videos";
      this.dataArray = [];
      this.videoArray = [];
      this.page = 1;
      this.stop = false;
      this.bottom = false;
      this.failed = false;
      this.getChannelData();
      this.getChannelVideos();
    },
    getChannelData() {
      var url =
        this.$store.state.selected + "/api/v1/channels/" + this.id;
      axios({
        url: url,
        timeout: 10000,
      })
        .then((response) => {
          document.title = response.data.author + " - Invuedious";
          let tmpObj = {};
          tmpObj = response.data;
          tmpObj.formattedSubs = numeral(response.data.subCount).format("0a");
          if (
            tmpObj.formattedSubs.charAt(tmpObj.formattedSubs.length - 1) == "m"
          ) {
            var strtmp =
              tmpObj.formattedSubs.substr(0, tmpObj.formattedSubs.length - 1) +
              "M";
            tmpObj.formattedSubs = strtmp;
          }
          tmpObj.dateJoined = this.timeConverter(response.data.joined);
          tmpObj.formattedViews = response.data.totalViews + " views";
          this.dataArray.push(tmpObj);
        })
        .catch(() => {
          this.failed = true;
        })
        .then(() => (this.loading = false))
        .then(() => this.setActive(1));
    },
    getChannelVideos() {
      var url =
        this.$store.state.selected +
        "/api/v1/channels/videos/" +
        this.id +
        "?page=" +
        this.page;
      axios({
        url: url,
        timeout: 10000,
      })
        .then((response) => {
          let tmpObj = {};
          let tmp = false;
          this.stop = false;
          if (response.data.length < 60) {
            this.stop = true;
          }
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
            tmp = this.checkDouble(response.data[i].videoId, "video");
            if (tmp == false) {
              this.videoArray.push(tmpObj);
            }
          }
        })
        .catch(() => {
          this.failed = true;
        })
        .then(() => (this.page += 1))
        .then(() => (this.innerLoading = false));
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
    timeConverter(tmp) {
      var a = new Date(tmp * 1000);
      var year = a.getFullYear();
      var month =
        a.getMonth() + 1 < 10 ? "0" + (a.getMonth() + 1) : a.getMonth() + 1;
      var date = a.getDate() < 10 ? "0" + a.getDate() : a.getDate();
      var time = month + "-" + date + "-" + year;
      return time;
    },
    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight - 400;
      const bottomOfPage = visible + scrollY >= pageHeight;
      return bottomOfPage || pageHeight < visible;
    },
    setActive(tab) {
      if (tab == 1) {
        if (this.mode != "videos") {
          this.mode = "videos";
        }
        document.getElementById("tab1").classList.add("active");
        document.getElementById("tab2").classList.remove("active");
        document.getElementById("tab3").classList.remove("active");
      } else if (tab == 2) {
        if (this.mode != "channels") {
          this.mode = "channels";
        }
        document.getElementById("tab2").classList.add("active");
        document.getElementById("tab1").classList.remove("active");
        document.getElementById("tab3").classList.remove("active");
      } else {
        if (this.mode != "about") {
          this.mode = "about";
        }
        document.getElementById("tab3").classList.add("active");
        document.getElementById("tab2").classList.remove("active");
        document.getElementById("tab1").classList.remove("active");
      }
    },
  },
  watch: {
    bottom(bottom) {
      if (bottom && !this.loading) {
        if (this.mode == "videos") {
          this.getChannelVideos();
        }
      }
    },
    reload() {
      if (this.reload) {
        this.reconnect();
      }
    },
  },
};
</script>

<style scoped>
p {
  color: var(--secondary);
}
</style>
