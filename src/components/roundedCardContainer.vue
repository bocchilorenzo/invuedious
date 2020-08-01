<template>
  <div class="columns">
    <div
      v-for="channel in dataArray"
      :key="channel.authorId"
      class="column col-xs-12 col-sm-6 col-md-3 col-2"
    >
      <roundedCard :channelData="channel" :mode="mode" />
    </div>
  </div>
</template>

<script>
import roundedCard from './roundedCard.vue'
export default {
  name: "roundedCardContainer",
  props: {
    dataArray: Array,
    mode: String
  },
  components:{
    roundedCard
  }
};
</script>