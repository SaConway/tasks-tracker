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

button.add-btn {
  border: none;
  padding: 0.3rem 0.6rem;
  margin: 0;
  position: relative;
  top: 0;
  left: -3rem;
  font-size: 1rem;
  font-weight: bolder;
  color: var(--accent-color);
  visibility: hidden;
  z-index: -1;
  transition: 0.7s all ease-in-out, 0.3s font-size ease-in-out,
    0.3s letter-spacing ease-in-out, 0s outline;
}

button.add-btn:focus:not(.visible) {
  outline: none;
}

button.add-btn.visible {
  left: 1rem;
  visibility: visible;
  letter-spacing: 0.07rem;
}

button.add-btn:hover {
  letter-spacing: 0.1rem;
  font-size: 1.05rem;
}

@keyframes fade-in {
  to {
    opacity: 1;
  }
}
</style>
