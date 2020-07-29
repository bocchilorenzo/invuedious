<template>
  <div>
    <h5><unicon name="circle-layer" fill="darkgray" />Recommended videos</h5>
    <div class="columns">
      <div
        class="column col-xs-12 col-sm-6 col-md-4 col-lg-3 col-12"
        v-for="video in videoInfo[0].recommendedVideos"
        :key="video.videoId"
      >
        <card :video="video" :mode="'recommended'" />
      </div>
    </div>
  </div>
</template>

<script>
import card from "./card";
export default {
  name: "recommended",
  props: {
    videoInfo: Array
  },
  components: {
    card
  }
};
</script>

<style scoped>
h5 {
  color: darkgray;
}
</style>