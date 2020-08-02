<template>
  <div>
    <header class="navbar">
      <section class="navbar-section">
        <router-link
          :to="{
                    name: 'popular',
                }"
          class="navbar-brand mr-2"
        >
          <unicon name="youtube" fill="black" id="barLogo" />INVUEDIOUS
        </router-link>
      </section>
    </header>
    <div class="container">
      <searchbar />
    </div>
    <router-view :key="this.$route.path" />
  </div>
</template>

<script>
import searchbar from "./components/searchbar.vue";
export default {
  methods: {},
  components: {
    searchbar
  }
};
</script>

<style>
@import url("./css/style.css");
.navbar-brand {
  display: flex;
  flex-direction: row;
}
#barLogo {
  display: flex;
  align-content: center;
  width: 24px;
}
</style>
