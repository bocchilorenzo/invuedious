<template>
  <div>
    <header class="navbar">
      <section class="navbar-section">
        <a href="#" class="navbar-brand mr-2">INVIDIOUS</a>
      </section>
    </header>
    <div class="container">
      <searchbar />
    </div>
    <router-view :key="this.$route.path" />
  </div>
</template>

<script>
import searchbar from "./components/searchbar";
export default {
  methods: {},
  components: {
    searchbar
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");
html {
  --scrollbarBG: #37474f;
  --thumbBG: #3769c8;
}
body::-webkit-scrollbar {
  width: 12px;
}
body {
  background-color: var(--bg-dark) !important;
  font-family: "Roboto", sans-serif !important;
  scrollbar-width: thin;
  scrollbar-color: var(--bg-dark) var(--primary);
}
body::-webkit-scrollbar-track {
  background: var(--bg-dark);
}
body::-webkit-scrollbar-thumb {
  background-color: var(--secondary);
  border-radius: 6px;
  border: 3px solid var(--bg-dark);
}
:root {
  --primary: #c3073f;
  --secondary: #6f2232;
  --bg-dark: #1a1a1d;
}
.navbar {
  height: 64px;
  padding: 0 16px;
  background-color: var(--primary);
}
.navbar a {
  color: black !important;
}
.searchContainer {
  text-align: center;
  margin: 1rem 0;
}
.search {
  width: 100%;
  margin: 0 auto;
  height: 50px;
  background-color: rgb(53, 53, 53);
  border: 0.2px solid darkgray;
  color: white;
  border-radius: 0.3em;
  padding: 0 1em;
  font-size: 16px;
  transition: border 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
.search:hover {
  border: 0.2px solid white;
}
.search:focus {
  border: 0.2px solid var(--primary);
}
@media screen and (min-width: 960px) {
  .search {
    width: 766px;
  }
}
a {
  color: var(--primary) !important;
}
.tab-item.active a {
  border-bottom-color: var(--primary) !important;
}
.loading::after {
  border-color: var(--primary) !important;
  border-top-color: transparent !important;
}
.tab {
  border: none !important;
}
.container2 {
  padding: 1em 0.8em 0;
}
@media screen and (min-width: 961px) {
  .container2 {
    width: 90%;
    margin: 0 auto;
  }
}
.card-title {
  overflow: hidden;
  white-space: nowrap; /* Don't forget this one */
  text-overflow: ellipsis;
}
.card {
  background-color: black !important;
  border: none !important;
  margin-bottom: 1em !important;
}
.card .h6 {
  color: var(--primary);
}
.card-body {
  color: darkgray;
}
@media screen and (max-width: 480px) {
  .card {
    max-width: 320px !important;
    margin: 0 auto !important;
  }
}
a:hover {
  text-decoration: none !important;
}
.plyr__control--overlaid,
.plyr__control:hover,
.plyr__control[role="menuitemradio"][aria-checked="true"]::before,
.plyr--video .plyr__control[aria-expanded="true"] {
  background-color: var(--primary) !important;
}
.plyr--full-ui input[type="range"] {
  color: var(--primary) !important;
}
</style>
