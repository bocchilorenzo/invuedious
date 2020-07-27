<template>
  <div>
    <header class="navbar">
      <section class="navbar-section">
        <a href="#" class="navbar-brand mr-2">
          <b>INVIDIOUS</b>
        </a>
      </section>
    </header>
    <div class="container">
      <div class="columns">
        <div class="column col-10 col-mx-auto">
          <div class="searchContainer">
            <input class="search" type="text" placeholder="Search..." />
          </div>
        </div>
      </div>
    </div>
    <router-view :key="this.$route.path" />
  </div>
</template>

<script>
export default {
  methods: {
  }
};
</script>

<style>
:root {
  --primary: #c3073f;
  --secondary: #6f2232;
  --bg-dark: #1a1a1d;
}
.navbar {
  height: 56px;
  padding: 0 0.5rem;
}
.searchContainer {
  text-align: center;
}
.search {
  width: 100%;
  margin: 0 auto;
  height: 40px;
  background-color: var(--bg-dark);
  border: 0.1rem solid var(--secondary);
  color: white;
  border-radius: 0.5em;
  padding: 0 1em;
}
.search:hover {
  border: 0.1rem solid var(--primary);
}
.search:focus {
  border: 0.1rem solid var(--primary);
}
@media screen and (min-width: 960px) {
  .search {
    width: 766px;
  }
}
body {
  background-color: var(--bg-dark) !important;
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
@media screen and (min-width: 1000px) {
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
</style>
