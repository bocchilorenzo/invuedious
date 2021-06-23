<template>
  <div class="modal active" id="modalSettings" @click="$emit('close')">
    <div class="modal-overlay" aria-label="Close"></div>
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <button
          class="btn btn-clear float-right"
          aria-label="Close"
          @click="$emit('close')"
        ></button>
        <div class="modal-title h5">Settings</div>
      </div>
      <div class="modal-body">
        <div class="content">
          <div style="margin-bottom: 1.5em">
            <p class="text-light">Choose instance:</p>
            <div class="form-group">
              <select class="form-select" v-model="instance">
                <option
                  v-for="(inst, n) in $store.state.apis"
                  :key="n"
                  :value="inst[1].type + '://' + inst[0]"
                >
                  {{ inst[1].type + "://" + inst[0] }}
                </option>
              </select>
            </div>
          </div>
          <div>
            <p class="text-light">Choose theme:</p>
            <div class="form-group">
              <select class="form-select" v-model="theme">
                <option value="red">Black and red</option>
                <option value="blue">Dark blue</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer text-light">
        <div class="container">
          <div class="columns">
            <div class="column col-12">
              <span
                >Note: a lot of instances don't allow third party usage</span
              >
            </div>
            <div class="column col-12" style="margin-top: 0.5rem">
              <button class="btn btn-primary" @click="save">SAVE</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modalSettings",
  data() {
    return {
      instance: "",
      first: 0,
      theme: "",
    };
  },
  created() {
    this.instance = this.$store.state.selected;
    this.theme = localStorage.getItem("theme");
    if (this.theme == undefined) {
      this.theme = "red";
    }
  },
  methods: {
    save() {
      this.$emit("save", [this.instance, this.theme]);
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  background-color: rgba(0, 0, 0, 0.75) !important;
}
.modal-container {
  background-color: var(--bg-dark) !important;
}
.modal-title {
  color: var(--primary) !important;
}
</style>
