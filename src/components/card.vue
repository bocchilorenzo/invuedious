<template>
  <div class="card">
    <router-link
      :to="{
                    name: 'video',
                    path: '/video/:id',
                    params: { id: video.videoId },
                    props: true,
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
                    props: true,
                }"
      >
        <div class="card-title h6">{{ video.title }}</div>
      </router-link>
      <div class="card-subtitle text-gray">{{ video.author }}</div>
    </div>
    <div class="card-body" v-if="mode == 'main'">
      Published: {{video.publishedText}}
      <br />
      Views: {{ video.formattedViews }}
    </div>
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

<style>
</style>