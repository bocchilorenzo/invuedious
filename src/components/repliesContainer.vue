<template>
  <div v-if="loading" class="loading loading-lg"></div>
  <div v-else>
    <div v-if="failed">
      <div class="empty">
        <div class="empty-icon">
          <unicon
            name="sad-dizzy"
            fill="var(--primary)"
            width="40px"
            height="40px"
          />
        </div>
        <p class="empty-title h5">Connection error</p>
        <p class="empty-subtitle">
          The request for the replies took too long.
          <br />Check your connection and try again.
        </p>
        <div class="empty-action">
          <button class="btn btn-primary" @click="reconnect()">RETRY</button>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="panel">
        <div class="panel-body">
          <replyCard
            v-for="reply in replies"
            :key="reply.commentId"
            :commentData="reply"
            :videoId="videoId"
          />
        </div>
      </div>
      <div class="centered" v-if="continuation != undefined">
        <button class="btn" @click="getReplies()">SHOW MORE</button>
      </div>
      <div v-if="failed2" class="empty">
        <p class="empty-title h5">Connection error</p>
        <div class="empty-action">
          <button class="btn btn-primary" @click="innerReconnect()">
            RETRY
          </button>
        </div>
      </div>
      <div v-if="innerLoading" class="loading loading-lg"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import replyCard from "./replyCard.vue";
export default {
  name: "repliesContainer",
  props: {
    videoId: String,
    initialContinuation: String,
  },
  components: {
    replyCard,
  },
  created() {
    this.getReplies();
  },
  data() {
    return {
      loading: true,
      failed: false,
      replies: [],
      continuation: "",
      begin: true,
      innerLoading: false,
      failed2: false,
    };
  },
  methods: {
    reconnect() {
      this.loading = true;
      this.failed = false;
      this.getReplies();
    },
    innerReconnect() {
      this.innerLoading = false;
      this.failed2 = false;
      this.getReplies();
    },
    getReplies() {
      this.innerLoading = true;
      var url =
        this.$store.state.selected +
        "/api/v1/comments/" +
        this.videoId +
        "?continuation=";
      if (this.begin) {
        url += this.initialContinuation;
      } else {
        url += this.continuation;
      }
      axios({
        url: url,
        timeout: 10000,
      })
        .then((response) => {
          this.begin = false;
          for (let i = 0; i < response.data.comments.length; i++) {
            this.replies.push(response.data.comments[i]);
          }
          this.continuation = response.data.continuation;
        })
        .catch((error) => {
          if (this.begin) {
            this.failed = true;
          } else {
            this.failed2 = true;
          }
          console.log(error.code);
        })
        .then(() => (this.innerLoading = false))
        .then(() => (this.loading = false));
    },
  },
};
</script>

<style scoped>
.panel {
  border: none !important;
}
.btn {
  background-color: transparent !important;
  border: none !important;
  color: var(--secondary) !important;
}
.btn:hover {
  color: white !important;
}
</style>
