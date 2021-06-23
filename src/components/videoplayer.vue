<template>
  <div v-if="videoInfo[0].formatStreams.length == 0">
    <div class="empty">
      <div class="empty-icon">
        <unicon name="frown" fill="var(--primary)" width="50px" height="50px" />
      </div>
      <p class="empty-title h5">This video is not playable</p>
      <p class="empty-title" v-if="videoInfo[0].error">Error: {{ videoInfo[0].error }}</p>
      <div class="empty-action">
        <button class="btn" @click="goBack()">Go back</button>
      </div>
    </div>
  </div>
  <div class="textCenter" v-else>
    <vue-plyr ref="plyr">
      <video
        :data-poster="videoInfo[0].thumb"
        playsinline
        controls
        :src="videoInfo[0].formatStreams[0].url"
        width="100%"
      >
        <source
          v-for="source in videoInfo[0].formatStreams"
          :key="source.itag"
          :src="source.url"
          :type="source.type"
          :size="source.qualityLabel"
        />
        <!--
        <track
          v-for="caption in videoInfo[0].downloadedCaptions"
          :key="caption.url"
          kind="captions"
          :label="caption.label"
          :src="caption.src"
          :srclang="caption.languageCode"
        />
        -->
      </video>
    </vue-plyr>
  </div>
</template>

<script>
export default {
  name: "videoplayer",
  props: {
    videoInfo: Array,
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>