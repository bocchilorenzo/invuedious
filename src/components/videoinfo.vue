<template>
  <div>
    <h4 id="videoTitle">
      <b>{{ videoInfo[0].title }}</b>
    </h4>
    <div>
      <div id="infoMain">
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
        <div id="voteContainer">
          <p class="vote">
            <unicon name="thumbs-up" fill="var(--primary)" />
            <span>{{ videoInfo[0].likeCount }}</span>
          </p>
          <!-- <p class="vote">
					<unicon name="thumbs-down" fill="var(--primary)" />
					<span>{{ videoInfo[0].dislikeCount }}</span>
				</p> -->
        </div>
      </div>
      <div class="accordion">
        <div class="infoLeft">
          <p>{{ numberWithDots(videoInfo[0].viewCount) }} views</p>
          <span class="dot">•</span>
          <p>{{ videoInfo[0].publishedText }}</p>
        </div>
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
        <div
          v-html="videoInfo[0].descriptionHtml"
          class="accordion-body"
          style="white-space: pre-wrap"
        ></div>
      </div>
    </div>
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
  margin-top: 0.5em;
}
.accordion {
  background-color: var(--bg-dark) !important;
  padding: 0.8em;
  border-radius: 8px;
  margin-bottom: 1em;
}

#videoTitle,
#description,
.accordion-header p,
.accordion-body {
  color: white;
  margin-bottom: 0;
}
.accordion input:checked ~ .accordion-body,
.accordion[open] .accordion-body {
  max-height: 100rem;
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
  margin-top: 0;
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
  margin: 0;
}
#infoMain {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: flex-start;
  margin: 0.5em 0;
}
.authorInfo {
  display: flex;
  align-content: center;
  justify-items: center;
  align-items: center;
}

.vote,
#voteContainer,
.infoLeft {
  display: flex;
  align-content: center;
  justify-items: center;
  align-items: center;
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
