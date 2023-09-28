<template>
  <div v-if="videoInfo.formatStreams.length == 0">
    <div class="empty">
      <div class="empty-icon">
        <unicon name="frown" fill="var(--primary)" width="50px" height="50px" />
      </div>
      <p class="empty-title h5">This video is not playable</p>
      <p class="empty-title" v-if="videoInfo.error">
        Error: {{ videoInfo.error }}
      </p>
      <div class="empty-action">
        <button class="btn" @click="goBack()">Go back</button>
      </div>
    </div>
  </div>
  <vue-plyr ref="plyr" v-else>
    <video
      :data-poster="videoInfo.thumb"
      playsinline
      controls
      :src="videoInfo.formatStreams[0].url"
      width="100%"
    >
      <source
        v-for="source in videoInfo.formatStreams"
        :key="source.itag"
        :src="source.url"
        :type="source.type"
        :size="source.qualityLabel"
      />
      <!-- <track
        v-for="caption in videoInfo.captions"
        :key="caption.language_code"
        kind="captions"
        :label="caption.label"
        :src="$store.state.selected + caption.url"
        :srclang="caption.language_code"
      /> -->
    </video>
  </vue-plyr>
</template>

<script>
export default {
  name: "videoplayer",
  props: {
    videoInfo: Object,
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
