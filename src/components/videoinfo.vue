<template>
  <div>
    <h4 id="videoTitle">
      <b>{{videoInfo[0].title}}</b>
    </h4>
    <div id="infoSmall">
      <div>
        <p>Views: {{videoInfo[0].formattedViews}}</p>
        <p>Published: {{videoInfo[0].publishedText}}</p>
      </div>
      <div>
        <p>
          <unicon name="thumbs-up" fill="var(--primary)" />
          Likes: {{videoInfo[0].likeCount}}
        </p>
        <p>
          <unicon name="thumbs-down" fill="var(--primary)" />
          Dislikes: {{videoInfo[0].dislikeCount}}
        </p>
      </div>
    </div>
    <div class="divider"></div>
    <div>
      <figure class="avatar avatar-xl" data-initial="YZ" style="background-color: #6f2232;">
        <img :src="videoInfo[0].authorThumbnails[1].url" name="Channel image" />
      </figure>
      <span id="authorName" style="padding-left: 0.5em">{{videoInfo[0].author}}</span>
      <div class="accordion">
        <input type="checkbox" id="accordion-1" name="accordion-checkbox" hidden />
        <label class="accordion-header" for="accordion-1">
          <p>Description</p>
          <unicon name="angle-down" fill="var(--primary)" />
        </label>
        <div v-html="videoInfo[0].descriptionHtml" class="accordion-body"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'videoinfo',
    props:{
        videoInfo: Array
    }
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
  align-items: center;
  border-radius: 0.5em;
  margin-top: 0.5em;
}
.accordion-header p {
  line-height: 24px;
  margin: 0;
}
#authorName,
.accordion-header p:hover {
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
</style>