<template>
  <div class="textCenter">
    <vue-plyr ref="plyr">
      <!--use crossorigin attribute to display captions-->
      <video
        :poster="videoInfo[0].videoThumbnails[0].url"
        playsinline
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
        <track
          v-for="caption in videoInfo[0].captions"
          :key="caption.url"
          kind="captions"
          :label="caption.label"
          :src="'https://invidio.us'+caption.url"
          :srclang="caption.languageCode"
          default
        />
      </video>
    </vue-plyr>
  </div>
</template>

<script>
export default {
  name: "videoplayer",
  props: {
    videoInfo: Array
  }
};
</script>

<style>
</style>