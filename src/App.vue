<template>
  <div>
    <modalSettings
      v-if="settings"
      @close="settings = !settings"
      @save="updateData"
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
          style="
            background: transparent;
            border: none;
            outline: none;
            cursor: pointer;
          "
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
    updateData(arr) {
      localStorage.setItem("selected", arr[0]);
      this.$store.state.selected = arr[0];
      localStorage.setItem("theme", arr[1]);
      this.setColors();
      this.settings = false;
      this.reload = true;
    },
    setColors() {
      if (localStorage.getItem("theme") && localStorage.getItem("theme") == "blue") {
        document.documentElement.style.setProperty("--primary", "#00abff");
        document.documentElement.style.setProperty("--secondary", "#64ccff");
        document.documentElement.style.setProperty("--bg-dark", "#181d2f");
        document.body.style.setProperty(
          "background-color",
          "#232d48",
          "important"
        );
      } else {
        document.documentElement.style.setProperty("--primary", "#c3073f");
        document.documentElement.style.setProperty("--secondary", "#da5973");
        document.documentElement.style.setProperty("--bg-dark", "#131313");
        document.body.style.setProperty("background-color", "");
      }
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
    this.setColors();
    axios({
      method: "get",
      url: "https://api.invidious.io/instances.json?pretty=1&sort_by=type,users",
    })
      .then((res) => {
        let instances = [];
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i][1].type != "onion" && res.data[i][1].type != "i2p") {
            instances.push(res.data[i]);
          }
        }
        if (
          localStorage.getItem("selected") == undefined ||
          localStorage.getItem("selected") == null ||
          localStorage.getItem("selected") == ""
        ) {
          localStorage.setItem("selected", "https://vid.puffyan.us");
          this.$store.state.selected = "https://vid.puffyan.us";
        } else {
          this.$store.state.selected = localStorage.getItem("selected");
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
