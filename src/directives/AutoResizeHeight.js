import Vue from "vue";

export const AutoResizeHeight = {
  inserted: function(el) {
    el.style.height = el.scrollHeight + "px";

    function OnInput() {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    }

    el.addEventListener("keyup", OnInput);
    el.addEventListener("change", OnInput);
  }
};

Vue.directive("autoresize-height", AutoResizeHeight);
