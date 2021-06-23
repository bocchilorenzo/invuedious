<template>
  <div class="searchContainer">
    <input
      v-model="inputSearch"
      class="search"
      type="text"
      placeholder="Search..."
      @keydown.enter="search()"
    />
  </div>
</template>

<script>
import stripHtml from "string-strip-html";
export default {
  name: "searchbar",
  data() {
    return {
      inputSearch: this.$route.params.q,
    };
  },
  methods: {
    search() {
      var query = "";
      if (this.inputSearch != "" && this.inputSearch.length > 1) {
        query = stripHtml(this.inputSearch);
        this.$router.push({
          name: "searchVideo",
          params: { q: query },
        });
      }
    },
  },
};
</script>

<style scoped>
.searchContainer {
  text-align: center;
  margin: 1rem auto;
  width: 100%;
}

@media (max-width: 301px) {
  .searchContainer {
    margin: 0.5rem auto;
  }
}

.search {
  width: 100%;
  max-width: 30rem;
  margin: 0 auto;
  height: 30px;
  background-color: rgb(53, 53, 53);
  border: none;
  color: white;
  border-radius: 0.3em;
  padding: 0 1em;
  font-size: 16px;
}
</style>
