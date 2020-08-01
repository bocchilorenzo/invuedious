<template>
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
    <header
      class="channelBanner"
      :style="{'background': 'url(' + dataArray[0].authorBanners[1].url + ')'}"
    >
      <div v-if="myWidth > 900" class="bannerContent">
        <figure class="avatar avatar-xxl">
          <img :src="dataArray[0].authorThumbnails[2].url" alt="..." />
        </figure>
        <div>
          <h1 class="channelTitle">{{dataArray[0].author}}</h1>
          <h5 class="channelSubtitle">Subscribers: {{dataArray[0].formattedSubs}}</h5>
        </div>
      </div>
    </header>
    <div v-if="myWidth <= 900" class="bannerContent">
      <figure class="avatar avatar-xxl">
        <img :src="dataArray[0].authorThumbnails[2].url" alt="..." />
      </figure>
      <div>
        <h3 class="channelTitle">{{dataArray[0].author}}</h3>
        <h6 class="channelSubtitle">Subscribers: {{dataArray[0].formattedSubs}}</h6>
      </div>
    </div>
    <ul class="tab tab-block">
      <li class="tab-item" id="tab1" @click="setActive(1)">
        <router-link :to="{
                    name: 'channel',
                }">
          <unicon name="video" fill="var(--primary)" />VIDEOS
        </router-link>
      </li>
      <li class="tab-item" id="tab2" @click="setActive(2)">
        <router-link :to="{
                    name: 'channel',
                }">
          <unicon name="channel" fill="var(--primary)" />CHANNELS
        </router-link>
      </li>
      <li class="tab-item" id="tab3" @click="setActive(3)">
        <router-link :to="{
                    name: 'channel',
                }">
          <unicon name="info-circle" fill="var(--primary)" />ABOUT
        </router-link>
      </li>
    </ul>
    <div v-if="innerLoading" class="loading loading-lg"></div>
    <div v-else>
      <div class="container2" v-if="mode == 'videos'">
        <cardContainer :videoArray="videoArray" />
        <div v-if="!stop" class="loading loading-lg"></div>
      </div>
      <div class="container2" v-else>
        <roundedCardContainer
          :dataArray="dataArray[0].relatedChannels"
          :mode="'channelInfo'"
          v-if="mode == 'channels'"
        />
        <!--DESCRIPTION-->
        <div v-else id="channelDescription">
          <div v-html="dataArray[0].descriptionHtml" id="descriptionText"></div>
          <div>
            <p>Joined {{dataArray[0].dateJoined}}</p>
            <p>{{dataArray[0].formattedViews}}</p>
            <p>{{dataArray[0].formattedSubs}}</p>
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
      myWidth: 0,
      myHeight: 0,
      page: 1,
      stop: false,
      bottom: false,
      failed: false
    };
  },
  components: {
    cardContainer,
    roundedCardContainer
  },
  created() {
    this.getChannelData();
    this.displayWindowSize();
    window.onresize = this.displayWindowSize;
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
    displayWindowSize() {
      this.myWidth = window.innerWidth;
      this.myHeight = window.innerHeight;
    },
    getChannelData() {
      var url = "https://invidio.us/api/v1/channels/" + this.id;
      axios({
        url: url,
        timeout: 10000
      })
        .then(response => {
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
          tmpObj.formattedSubs += " subscribers";
          tmpObj.dateJoined = this.timeConverter(response.data.joined);
          tmpObj.formattedViews = response.data.totalViews + " views";
          this.dataArray.push(tmpObj);
        })
        .catch(error => {
          if (error.code == "ECONNABORTED") {
            this.failed = true;
          }
          console.log(error.code);
        })
        .then(() => (this.loading = false))
        .then(() => this.setActive(1));
    },
    getChannelVideos() {
      var url =
        "https://invidio.us/api/v1/channels/videos/" +
        this.id +
        "?page=" +
        this.page;
      axios({
        url: url,
        timeout: 10000
      })
        .then(response => {
          let tmpObj = {};
          let tmp = false;
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
        .catch(error => {
          if (error.code == "ECONNABORTED") {
            this.failed = true;
          }
          console.log(error.code);
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
    }
  },
  watch: {
    bottom(bottom) {
      if (bottom && !this.loading) {
        if (this.mode == "videos") {
          this.getChannelVideos();
        }
      }
    }
  }
};
</script>

<style scoped>
.channelBanner {
  height: calc(100vw / 6);
  box-shadow: inset 0 -120px 100px -10px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  align-content: flex-end;
  background-position: center !important;
  background-repeat: no-repeat !important;
  background-size: contain !important;
}
.bannerContent {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  align-content: flex-end;
  padding: 0.5rem 1rem 1rem 1rem;
}
@media screen and (max-width: 900px) {
  .bannerContent {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    padding: 0.5rem 1rem 1rem 1rem;
    margin-top: -2.4em;
  }
}
@media screen and (max-width: 1080px) {
  .channelBanner {
    box-shadow: inset 0 -80px 60px -10px rgba(0, 0, 0, 0.4);
  }
  .avatar-xxl {
    width: 3rem !important;
    height: 3rem !important;
  }
}
@media screen and (max-width: 900px) {
  .channelBanner {
    box-shadow: none;
  }
}
@media screen and (max-width: 700px) {
  .avatar-xxl {
    width: 2.5rem !important;
    height: 2.5rem !important;
  }
}
.avatar-xxl {
  width: 4rem;
  height: 4rem;
}
.channelTitle,
.channelSubtitle {
  color: var(--primary);
  margin-left: 1rem;
  margin-bottom: 0;
}
.channelSubtitle {
  color: white;
}
p {
  color: var(--secondary);
}
</style>