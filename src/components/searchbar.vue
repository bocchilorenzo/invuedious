<template>
  <div class="columns">
    <div class="column col-10 col-mx-auto">
      <div class="searchContainer">
        <input
          v-model="inputSearch"
          class="search"
          type="text"
          placeholder="Search..."
          @keyup.enter="search()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import stripHtml from "string-strip-html";
export default {
  name: "searchbar",
  data() {
    return {
      inputSearch: this.$route.params.q
    };
  },
  methods: {
    search() {
      var query = "";
      if (this.inputSearch != "" && this.inputSearch.length > 1) {
        query = stripHtml(this.inputSearch);
        this.$router.push({
          name: "searchVideo",
          params: { q: query }
        });
      } else {
        console.log("Query non valida o campo vuoto. Riprova");
      }
    }
  }
};
</script>

<style scoped>
</style>