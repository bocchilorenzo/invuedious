<template>
  <div class="card">
    <router-link
      :to="{
                    name: 'video',
                    path: '/video/:id',
                    params: { id: video.videoId },
                }"
    >
      <div class="card-image">
        <img :src="video.videoThumbnails[4].url" class="img-responsive" />
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
        <div class="card-title h6">{{ video.title }}</div>
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
      Published: {{video.publishedText}}
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
    mode: String
  }
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
</style>