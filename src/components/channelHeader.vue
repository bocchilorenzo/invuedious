<template>
  <div>
    <header
      v-if="dataArray[0].authorBanners.length != 0"
      class="channelBanner"
      :style="{'background': 'url(' + dataArray[0].authorBanners[1].url + ')'}"
    >
      <div v-if="myWidth > 900" class="bannerContent">
        <figure class="avatar avatar-xxl" :data-initial="dataArray[0].author.charAt(0)">
          <img :src="dataArray[0].authorThumbnails[2].url" :alt="dataArray[0].author" />
        </figure>
        <div>
          <h1 class="channelTitle">{{dataArray[0].author}}</h1>
          <h5 class="channelSubtitle">Subscribers: {{dataArray[0].formattedSubs}}</h5>
        </div>
      </div>
    </header>
    <header v-else class="channelBanner">
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
  </div>
</template>

<script>
export default {
  name: "channelHeader",
  props: {
    dataArray: Array
  },
  data() {
    return {
      myWidth: 0
    };
  },
  created() {
    this.displayWindowSize();
    window.onresize = this.displayWindowSize;
  },
  methods: {
    displayWindowSize() {
      this.myWidth = window.innerWidth;
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
</style>