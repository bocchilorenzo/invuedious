<template>
  <div class="container2">
    <div v-if="loading" class="loading loading-lg"></div>
    <div class="columns" v-else>
      <div class="column col-xs-12 col-10">
        <div class="textCenter">
          <video
            controls
            preload="auto"
            :poster="videoInfo[0].videoThumbnails[1].url"
          >
            <source
              :src="videoInfo[0].formatStreams[1].url"
              :type="videoInfo[0].formatStreams[1].type"
            />
          </video>
        </div>
        <h3>{{videoInfo[0].title}}</h3>
        <div>
          <!--IMMAGINE e NOME AUTORE-->
        </div>
        <div>
          <!--DESCRIZIONE DROPDOWN-->
        </div>
        <div>
          <!--COMMENTI-->
        </div>
      </div>
      <div class="column col-xs-12 col-2">
        <h5>Recommended videos</h5>
        <div class="card" v-for="video in videoInfo[0].recommendedVideos" :key="video.videoId">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "videoPage",
  created() {
    this.getVideo();
  },
  data() {
    return {
      videoId: this.$route.params.id,
      loading: true,
      videoInfo: []
    };
  },
  methods: {
    getVideo() {
      axios({
        url: "https://invidio.us/api/v1/videos/" + this.videoId
      })
        .then(response => {
          this.videoInfo.push(response.data);
        })
        .catch(error => console.log(error))
        .then(() => (this.loading = false));
    }
  }
};
</script>

<style scoped>
.textCenter {
  text-align: center;
}
h3 {
  color: white;
}
h5 {
  color: darkgray;
}
</style>