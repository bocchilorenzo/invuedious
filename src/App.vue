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
            <input class="search" type="text" placeholder="Search..." >
          </div>
        </div>
      </div>
    </div>
    <ul class="tab tab-block">
      <li class="tab-item" id="tab1">
        <router-link :to="{
                    name: 'popular',
                }">POPULAR</router-link>
      </li>
      <!--
      <li class="tab-item" id="tab2">
        <router-link :to="{
                    name: 'top',
                }">TOP</router-link>
      </li>
      -->
      <li class="tab-item" id="tab3">
        <router-link :to="{
                    name: 'trending',
                }">TRENDING</router-link>
      </li>
    </ul>
    <router-view @checkActive="checkActive" :key="this.$route.name" />
  </div>
</template>

<script>
export default {
  mounted() {
    this.checkActive();
  },
  methods: {
    changeRoute(dest) {
      if (this.$route.name != dest) {
        this.$router.push({ name: dest });
      }
    },
    checkActive() {
      if (this.$route.name == "popular") {
        document.getElementById("tab1").classList.add("active");
        //document.getElementById("tab2").classList.remove("active");
        document.getElementById("tab3").classList.remove("active");
      } /*else if (this.$route.name == "top") {
        document.getElementById("tab2").classList.add("active");
        document.getElementById("tab1").classList.remove("active");
        document.getElementById("tab3").classList.remove("active");
      }*/ else {
        document.getElementById("tab3").classList.add("active");
        //document.getElementById("tab2").classList.remove("active");
        document.getElementById("tab1").classList.remove("active");
      }
    }
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
.searchContainer{
  text-align: center;
}
.search {
  width: 100%;
  margin: 0 auto;
  height: 40px;
  background-color: var(--bg-dark);
  border: .1rem solid var(--secondary);
  color: white;
  border-radius: 0.5em;
  padding: 0 1em;
}
.search:hover{
  border: .1rem solid var(--primary);
}
.search:focus{
  border: .1rem solid var(--primary);
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
</style>
