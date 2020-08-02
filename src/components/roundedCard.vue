<template>
  <div class="card">
    <router-link
      :to="{
                    name: 'channel',
                    path: '/channel/:id',
                    params: { id: channelData.authorId },
                    props: true,
                }"
    >
      <div class="card-image">
        <img :src="channelData.authorThumbnails[2].url" class="img-responsive" :alt="channelData.author" />
      </div>
    </router-link>
    <div class="card-header">
      <router-link
        :to="{
                    name: 'channel',
                    path: '/channel/:id',
                    params: { id: channelData.authorId },
                    props: true,
                }"
      >
        <div class="card-title h6">{{ channelData.author }}</div>
      </router-link>
      <div class="card-subtitle text-gray">{{ channelData.description }}</div>
    </div>
    <div class="card-body" v-if="mode != 'channelInfo'">
      Subscribers: {{channelData.formattedSubs}}
      <br />
      Videos: {{ channelData.videoCount }}
    </div>
  </div>
</template>

<script>
export default {
  name: "roundedCard",
  props: {
    channelData: Object,
    mode: String
  }
};
</script>

<style scoped>
.card{
  border-radius: 0 1em 0 1em;
}
.card-image img{
  border-radius: 100%!important;
  margin: 1em auto 0;
}
</style>