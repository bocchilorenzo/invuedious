<template>
  <div class="card">
    <router-link
      :to="{
        name: 'video',
        path: '/video/:id',
        params: { id: video.videoId },
      }"
    >
      <div class="card-image" style="position: relative">
        <img :src="video.videoThumbnails[4].url" class="img-responsive" />
        <span class="videoDuration">{{
          secondsToTime(video.lengthSeconds)
        }}</span>
      </div>
    </router-link>
    <div class="card-header">
      <router-link
        :to="{
          name: 'video',
          path: '/video/:id',
          params: { id: video.videoId },
        }"
      >
        <div class="card-title h6" :title="video.title">{{ video.title }}</div>
      </router-link>

      <router-link
        :to="{
          name: 'channel',
          params: { id: video.authorId },
        }"
      >
        <div class="card-subtitle text-gray">{{ video.author }}</div>
      </router-link>
    </div>
    <div class="card-body" v-if="mode == 'main'">
      Published: {{ video.publishedText }}
      <br />
      {{ video.formattedViews }}
    </div>
    <div class="card-body" v-else>{{ video.viewCountText }}</div>
  </div>
</template>

<script>
export default {
  name: "card",
  props: {
    video: Object,
    mode: String,
  },
  methods: {
    secondsToTime(e) {
      var h = Math.floor(e / 3600)
          .toString()
          .padStart(2, "0"),
        m = Math.floor((e % 3600) / 60)
          .toString()
          .padStart(2, "0"),
        s = Math.floor(e % 60)
          .toString()
          .padStart(2, "0");

      return h == "00" ? m + ":" + s : h + ":" + m + ":" + s;
    },
  },
};
</script>

<style scoped>
/*
.card{
  border-radius: 0 1em 0 1em;
}
.card-image img{
  border-radius: 0 1em 0 0!important;
}
*/
.card-image img{
  width: 100%;
}
.videoDuration {
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: rgb(29, 29, 29);
  border-radius: 0.3em;
  padding: 0 5px;
  margin: 3px;
}
</style>