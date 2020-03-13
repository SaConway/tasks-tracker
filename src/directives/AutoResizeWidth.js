import Vue from "vue";

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
