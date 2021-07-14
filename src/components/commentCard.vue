<template>
  <div>
    <div class="commentCard">
      <div class="card">
        <div class="card-header">
          <router-link
            :to="{
              name: 'channel',
              params: { id: commentData.authorId },
            }"
          >
            <div
              v-if="commentData.authorIsChannelOwner"
              class="card-title h6 owner"
            >
              <figure
                class="avatar avatar-lg"
                :data-initial="commentData.author.charAt(0)"
                style="background-color: #5755d9"
              >
                <img
                  :src="commentData.authorThumbnails[0].url"
                  name="profile picture"
                />
              </figure>
              {{ commentData.author }}
            </div>
            <div class="card-title h6" v-else>
              <figure
                class="avatar avatar-lg"
                :data-initial="commentData.author.charAt(0)"
                style="background-color: #5755d9"
              >
                <img
                  :src="commentData.authorThumbnails[0].url"
                  name="profile picture"
                />
              </figure>
              {{ commentData.author }}
            </div>
          </router-link>
          <span class="text-gray">
            <span>{{ commentData.publishedText }}</span>
            <span v-if="commentData.isEdited">&nbsp;(Edited)</span>
          </span>
        </div>
        <div class="card-body">
          <div
            v-html="commentData.contentHtml"
            style="margin-bottom: 0.8rem"
            class="text-light"
          ></div>
          <div style="display:flex">
            <span class="like">
              <unicon name="thumbs-up" fill="var(--primary)" />
              <span>{{ commentData.likeCount }}</span>
            </span>
            <span v-if="commentData.creatorHeart != null" class="creatorHeart">
              <figure
                class="avatar avatar-md"
                :data-initial="commentData.creatorHeart.creatorName.charAt(0)"
              >
                <img
                  :src="commentData.creatorHeart.creatorThumbnail"
                  :alt="commentData.creatorHeart.creatorName"
                />
              </figure>
              <unicon
                name="heart"
                width="15"
                height="15"
                class="creatorHeartIcon"
                fill="var(--primary)"
              />
            </span>
          </div>
        </div>
        <div v-if="commentData.replies != undefined" class="card-footer">
          <div class="accordion">
            <input
              type="checkbox"
              :id="'accordion-' + commentData.commentId"
              name="accordion-checkbox"
              hidden
            />
            <label
              class="accordion-header"
              :for="'accordion-' + commentData.commentId"
            >
              <button class="btn" @click="switchText()">
                {{ accordionText }} {{ commentData.replies.replyCount }} replies
              </button>
            </label>
            <div class="accordion-body" v-if="showBody">
              <repliesContainer
                :videoId="videoId"
                :initialContinuation="commentData.replies.continuation"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import repliesContainer from "./repliesContainer.vue";
export default {
  name: "commentCard",
  props: {
    commentData: Object,
    videoId: String,
  },
  components: {
    repliesContainer,
  },
  data() {
    return {
      accordionText: "Show",
      showBody: false,
    };
  },
  methods: {
    switchText() {
      if (this.accordionText == "Show") {
        this.accordionText = "Hide";
        this.showBody = true;
      } else {
        this.accordionText = "Show";
        this.showBody = false;
      }
    },
  },
};
</script>

<style scoped>
.owner {
  color: yellow;
}
.commentCard {
  margin-bottom: 1em;
}
.commentCard .card {
  margin-bottom: 0;
  background-color: var(--bg-dark) !important;
}
.avatar-md {
  font-size: 0.75rem;
  width: 1.5rem;
  height: 1.5rem;
}
.creatorHeart {
  margin-left: 1em;
  position: relative;
  height: 1.5rem !important;
  display: inline-block;
}
.creatorHeartIcon {
  position: absolute;
  bottom: 0;
  margin-left: -0.3em;
  z-index: 1;
  height: 15px !important;
}
.accordion-header p,
.accordion-body {
  color: white;
}
.accordion-header {
  display: flex !important;
  align-items: center;
  border-radius: 0.5em;
  padding: 0 !important;
}
.accordion-header p {
  line-height: 24px;
  margin: 0;
}
.accordion-body {
  padding-top: 0.5em;
  margin-bottom: 0 !important;
  max-height: 100% !important;
}
.btn {
  background-color: transparent !important;
  border: none !important;
  color: var(--secondary) !important;
}
.btn:hover {
  color: white !important;
}
.like {
  display: flex;
  align-content: center;
  justify-items: center;
  align-items: center;
}
.like :first-child {
  margin-right: 3px;
}
.card-header {
  display: flex;
  align-content: center;
  justify-items: center;
  align-items: center;
}
.card-header :first-child {
  margin-right: 3px;
}
</style>