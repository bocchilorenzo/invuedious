<template>
  <div>
    <div class="commentCard">
      <div class="card">
        <div class="card-header">
          <router-link
            :to="{
                    name: 'channel',
                    params: { id: commentData.authorId }
                }"
          >
            <div v-if="commentData.authorIsChannelOwner" class="card-title h6 owner">
              <figure
                class="avatar avatar-lg"
                :data-initial="commentData.author.charAt(0)"
                style="background-color: #5755d9;"
              >
                <img :src="commentData.authorThumbnails[0].url" name="profile picture" />
              </figure>
              {{commentData.author}}
            </div>
            <div class="card-title h6" v-else>
              <figure
                class="avatar avatar-lg"
                :data-initial="commentData.author.charAt(0)"
                style="background-color: #5755d9;"
              >
                <img :src="commentData.authorThumbnails[0].url" name="profile picture" />
              </figure>
              {{commentData.author}}
            </div>
          </router-link>
          <div class="card-subtitle text-gray">
            <span>Published: {{commentData.publishedText}}</span>
            <span v-if="commentData.isEdited">(Edited)</span>
          </div>
        </div>
        <div class="card-body">
          <div>{{commentData.content}}</div>
          <unicon name="thumbs-up" fill="var(--primary)" />
          {{commentData.likeCount}}
          <span
            v-if="commentData.creatorHeart != null"
            class="creatorHeart"
          >
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
    </div>
  </div>
</template>

<script>
export default {
  name: "replyCard",
  props: {
    commentData: Object,
    videoId: String
  }
};
</script>

<style scoped>
.owner {
  color: yellow;
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
</style>