<template>
  <div class="columns">
    <div
      v-for="video in videoArray"
      :key="video.videoId"
      class="column col-xs-12 col-sm-6 col-md-3 col-2"
    >
      <card :video="video" :mode="'main'" />
    </div>
  </div>
</template>

<script>
import card from './card.vue'
export default {
  name: "cardContainer",
  props: {
    videoArray: Array
  },
  components:{
    card
  }
};
</script>