<template>
  <div id="app">
    <Navigation></Navigation>
    <ToggleTheme></ToggleTheme>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import Navigation from "./components/Navigation";
import ToggleTheme from "./components/ToggleTheme";

export default {
  components: {
    Navigation,
    ToggleTheme
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

::selection {
  background: var(--primary-color);
  color: var(--accent-color);
}

button {
  background-color: transparent;
  cursor: pointer;
}

#app {
  height: 100vh;
}

.container {
  padding: 3rem 3rem 3rem 11rem;
  opacity: 0;
  animation: 1.5s fade-in ease-in-out forwards;
}

@keyframes fade-in {
  to {
    opacity: 1;
  }
}
</style>
