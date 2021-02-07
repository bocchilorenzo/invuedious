<template>
  <div>
    <modalSettings
      v-if="settings"
      @close="settings = !settings"
      @save="updateInstance"
    />
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
      <section class="navbar-center">
        <searchbar />
      </section>
      <section class="navbar-section" id="settingsBtn">
        <button
          style="background:transparent; border:none; outline:none; cursor:pointer;"
          @click="settings = !settings"
        >
          <unicon name="setting" fill="black" />
        </button>
      </section>
    </header>
    <router-view :key="this.$route.path" v-if="ready" :reload="reload" />
  </div>
</template>

<script>
import searchbar from "./components/searchbar.vue";
import modalSettings from "./components/modalSettings.vue";
import axios from "axios";
export default {
  methods: {
    updateInstance(inst) {
      localStorage.setItem("selected", inst);
      this.settings = false;
      this.reload = true;
    },
  },
  components: {
    searchbar,
    modalSettings,
  },
  data() {
    return {
      ready: false,
      settings: false,
      reload: false,
    };
  },
  created() {
    axios({
      method: "get",
      url:
        "https://api.invidious.io/instances.json?pretty=1&sort_by=type,users",
    })
      .then((res) => {
        let instances = [];
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i][1].type != "onion") {
            instances.push(res.data[i]);
          }
        }
        if (
          localStorage.getItem("selected") == undefined ||
          localStorage.getItem("selected") == null ||
          localStorage.getItem("selected") == ""
        ) {
          localStorage.setItem("selected", "https://ytprivate.com");
        }
        this.$store.state.apis = instances;
        this.ready = true;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  watch: {
    reload() {
      setTimeout(() => {
        this.reload = false;
      }, 200);
    },
  },
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
