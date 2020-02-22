<template>
  <button @click="onToggleTheme">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12"/></svg>
  </button>
</template>

<script>
export default {
  mounted() {
    if (this.getTheme() === "light") {
      this.setTheme("light");
    }
  },
  methods: {
    onToggleTheme() {
      const theme = this.getTheme() === "light" ? "dark" : "light";
      this.setTheme(theme);
    },
    getTheme() {
      return localStorage.getItem("theme") || "dark";
    },
    setTheme(theme) {
      localStorage.setItem("theme", theme);

      document.documentElement.style.setProperty(
        "--bg-color",
        theme === "light" ? "#eee" : "#222831"
      );
      document.documentElement.style.setProperty(
        "--accent-color",
        theme === "light" ? "#222831" : "#eee"
      );
    }
  }
};
</script>

<style scoped>
button {
  position: fixed;
  bottom: .7rem;
  right: 1rem;
  border: none;
  cursor: pointer;
  z-index: 2;
}

button:focus {
  outline: none;
}

button svg {
  fill: var(--accent-color);
}
</style>