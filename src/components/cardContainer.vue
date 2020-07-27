<template>
  <div class="columns">
    <div
      v-for="video in videoArray"
      :key="video.videoId"
      class="column col-xs-12 col-sm-6 col-md-3 col-2"
    >
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
        <div class="card-body">
          Published: {{video.publishedText}}
          <br />
          Views: {{ video.formattedViews }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cardContainer",
  props: {
    videoArray: Array
  }
};
</script>