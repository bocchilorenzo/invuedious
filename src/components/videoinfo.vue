<template>
  <div>
    <h4 id="videoTitle">
      <b>{{ videoInfo[0].title }}</b>
    </h4>
    <div id="infoSmall">
      <div class="infoLeft">
        <p>{{ numberWithDots(videoInfo[0].viewCount) }} views</p>
        <span class="dot">•</span>
        <p>{{ videoInfo[0].publishedText }}</p>
      </div>
      <div id="voteContainer">
        <p class="vote">
          <unicon name="thumbs-up" fill="var(--primary)" />
          <span>{{ videoInfo[0].likeCount }}</span>
        </p>
        <p class="vote">
          <unicon name="thumbs-down" fill="var(--primary)" />
          <span>{{ videoInfo[0].dislikeCount }}</span>
        </p>
      </div>
    </div>
    <div class="divider"></div>
    <div>
      <!--INSERIRE ROUTER LINK CANALE-->
      <router-link
        :to="{
          name: 'channel',
          params: { id: videoInfo[0].authorId },
        }"
      >
        <div class="authorInfo">
          <figure
            class="avatar avatar-xl"
            :data-initial="videoInfo[0].author.charAt(0)"
            style="background-color: #6f2232"
          >
            <img
              :src="videoInfo[0].authorThumbnails[1].url"
              name="Channel image"
            />
          </figure>
          <span class="authorDetails">
            <span id="authorName">{{ videoInfo[0].author }}</span>
            <span>{{ videoInfo[0].subCountText }} subscribers</span>
          </span>
        </div>
      </router-link>
      <div class="accordion">
        <input
          type="checkbox"
          id="accordion-1"
          name="accordion-checkbox"
          hidden
        />
        <label
          class="accordion-header"
          for="accordion-1"
          @click="descriptionIcon()"
        >
          <p>Description</p>
          <unicon name="angle-down" fill="white" v-if="!open" />
          <unicon name="angle-up" fill="white" v-else />
        </label>
        <div v-html="videoInfo[0].descriptionHtml" class="accordion-body"></div>
      </div>
    </div>
    <div class="divider"></div>
  </div>
</template>

<script>
export default {
  name: "videoinfo",
  props: {
    videoInfo: Array,
  },
  data() {
    return {
      open: false,
    };
  },
  methods: {
    descriptionIcon() {
      this.open = !this.open;
    },
    numberWithDots(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>

<style scoped>
.textCenter {
  text-align: center;
}
#videoTitle {
  margin-top: 0.8em;
}
#videoTitle,
#description,
.accordion-header p,
.accordion-body {
  color: white;
}
.accordion-header {
  display: flex !important;
  align-content: center !important;
  justify-items: center !important;
  align-items: center !important;
  padding: 0 !important;
  cursor: pointer;
}
.accordion-header p {
  line-height: 24px;
  margin: 0;
}
#authorName {
  font-size: 1.1rem;
  color: var(--primary);
}
p,
span {
  color: darkgray;
}
p {
  margin: 0.5em 0;
}
#infoSmall {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: flex-start;
}
.authorInfo {
  margin: 1em 0 0.5em;
  display: flex;
  align-content: center;
  justify-items: center;
  align-items: center;
}
.divider {
  border-top: 0.05rem solid #727272;
}
.vote,
#voteContainer,
.infoLeft {
  display: flex;
  align-content: center;
  justify-items: center;
  align-items: center;
}
.infoLeft {
  margin-right: 20px;
}
.authorDetails {
  display: flex;
  align-content: center;
  justify-items: center;
  align-items: flex-start;
  width: max-content;
  flex-direction: column;
  padding-left: 0.5em;
}
.vote :first-child {
  margin-right: 3px;
}
#voteContainer {
  column-gap: 20px;
}
.dot {
  margin: 0 4px;
}
</style>