<template>
  <div id="app">
    <navigation></navigation>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import Navigation from "./components/Navigation";

export default {
  components: {
    Navigation
  }
};
</script>

<style>
:root {
  --bg-color: #222831;
  --primary-color: #d65a31;
  --accent-color: #eee;
  --border-radius: 0.2rem;
  --header-font-size: 1rem;
  --normal-font-size: 1rem;
}

* {
  font-family: "B612 Mono", monospace;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  background-color: var(--bg-color);
}

:focus {
  outline: 1px solid var(--primary-color);
}

#app {
  display: flex;
  height: 100vh;
}

.container {
  flex: 1;
  padding: 5rem;
  opacity: 0;
  animation: 1.5s fade-in ease-in-out forwards;
}

@keyframes fade-in {
  to {
    opacity: 1;
  }
}
</style>
