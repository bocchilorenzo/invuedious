<template>
  <div>
    <h5>Recommended</h5>
    <div class="columns">
      <div
        class="column col-xs-12 col-sm-6 col-md-4 col-lg-3 col-12"
        v-for="video in videoInfo.recommendedVideos"
        :key="video.videoId"
      >
        <card :video="video" :mode="'recommended'" />
      </div>
    </div>
  </div>
</template>

<script>
import card from "./card.vue";
export default {
  name: "recommended",
  props: {
    videoInfo: Object,
  },
  components: {
    card,
  },
};
</script>

<style scoped>
h5 {
  color: darkgray;
  padding-left: 0!important;
}
@media (min-width: 961px) {
  .col-12 {
    padding: 0;
  }
}
.columns .col-12 .card .card-header {
  padding: 0.5rem 0.5rem 0 !important;
}
.columns .col-12 .card .card-body {
  padding: 0.5rem !important;
}
</style>
