import Vue from "vue";
import App from "./App.vue";
import router from "./router";

window.Vue = Vue;
Vue.config.productionTip = false;

Vue.directive("autoresize-width", {
  inserted: function(el, binding) {
    el.style.width =
      (el.scrollWidth > binding.value ? el.scrollWidth : binding.value) + "px";

    function onInput() {
      this.style.width =
        (this.scrollWidth > binding.value ? this.scrollWidth : binding.value) +
        "px";
    }

    el.addEventListener("keyup", onInput);
    el.addEventListener("change", onInput);
  }
});

Vue.directive("autoresize-height", {
  inserted: function(el) {
    el.style.height = el.scrollHeight + "px";

    function OnInput() {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    }

    el.addEventListener("keyup", OnInput);
    el.addEventListener("change", OnInput);
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
