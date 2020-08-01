<template>
  <div v-if="loading" class="loading loading-lg"></div>
  <div v-else>
    <div v-if="failed">
      <div class="empty">
        <div class="empty-icon">
          <unicon name="sad-dizzy" fill="var(--primary)" width="50px" height="50px" />
        </div>
        <p class="empty-title h5">Connection error</p>
        <p class="empty-subtitle">
          The request for the comments took too long.
          <br />Check your connection and try again.
        </p>
        <div class="empty-action">
          <button class="btn btn-primary" @click="reconnect()">RETRY</button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>{{commentCount}} Comments:</p>
      <div class="panel">
        <div class="panel-body">
          <div class="commentCard" v-for="comment in comments" :key="comment.commentId">
            <div class="card">
              <div class="card-header">
                <div v-if="comment.authorIsChannelOwner" class="card-title h6 owner">
                  <figure
                    class="avatar avatar-lg"
                    :data-initial="comment.author.charAt(0)"
                    style="background-color: #5755d9;"
                  >
                    <img :src="comment.authorThumbnails[0].url" name="profile picture" />
                  </figure>
                  {{comment.author}}
                </div>
                <div class="card-title h6" v-else>
                  <figure
                    class="avatar avatar-lg"
                    :data-initial="comment.author.charAt(0)"
                    style="background-color: #5755d9;"
                  >
                    <img :src="comment.authorThumbnails[0].url" name="profile picture" />
                  </figure>
                  {{comment.author}}
                </div>
                <div class="card-subtitle text-gray">
                  <span>Published: {{comment.publishedText}}</span>
                  <span v-if="comment.isEdited">(Edited)</span>
                </div>
              </div>
              <div class="card-body">
                <div v-html="comment.contentHtml"></div>
                <br />
                <unicon name="thumbs-up" fill="var(--primary)" />
                {{comment.likeCount}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="loading loading-lg bottomLoader"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "comments",
  props: {
    videoId: String
  },
  data() {
    return {
      comments: [],
      commentCount: 0,
      continuation: "",
      loading: true,
      bottom: false,
      failed: false
    };
  },
  created() {
    this.getComments();
    window.addEventListener("scroll", () => {
      this.bottom = this.bottomVisible();
    });
  },
  destroyed() {
    window.removeEventListener("scroll", () => {
      this.bottom = this.bottomVisible();
    });
  },
  methods: {
    reconnect() {
      this.loading = true;
      this.failed = false;
      this.getComments();
    },
    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight - 400;
      const bottomOfPage = visible + scrollY >= pageHeight;
      return bottomOfPage || pageHeight < visible;
    },
    getComments() {
      axios({
        url:
          "https://invidio.us/api/v1/comments/" +
          this.videoId +
          "?continuation=" +
          this.continuation,
        timeout: 10000
      })
        .then(response => {
          var tmpObj = {};
          this.commentCount = response.data.commentCount;
          for (let i = 0; i < response.data.comments.length; i++) {
            tmpObj = response.data.comments[i];
            this.comments.push(tmpObj);
          }
          this.continuation = response.data.continuation;
        })
        .catch(error => {
          this.failed = true;
          console.log(error);
        })
        .then(() => (this.loading = false));
    }
  },
  watch: {
    bottom(bottom) {
      if (bottom && !this.loading) {
        this.getComments();
      }
    }
  }
};
</script>

<style scoped>
.panel {
  border: none !important;
}
.owner {
  color: yellow;
}
.bottomLoader {
  margin-bottom: 40px;
}
p {
  color: white;
}
.commentCard {
  margin-bottom: 1em;
}
.commentCard .card {
  margin-bottom: 0;
  background-color: var(--bg-dark)!important;
}
</style>