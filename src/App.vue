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
  --primary-color: #222831;
  --secondary-color: #d65a31;
  --accent-color: #eee;
  --border-radius: 0.2rem;
  --normal-font-size: 1rem;
}

* {
  font-family: "B612 Mono", monospace;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  background-color: var(--primary-color);
}

:focus {
  outline: 1px solid var(--secondary-color);
}

::selection {
  background: var(--secondary-color);
  color: var(--accent-color);
}

button {
  background-color: transparent;
  cursor: pointer;
}

.container {
  width: 95%;
  height: 100vh;
  margin: 0 auto;
  padding: 3rem 3rem 3rem 9.5rem;
  opacity: 0;
  animation: 1.5s fade-in ease-in-out forwards;
}

@keyframes fade-in {
  to {
    opacity: 1;
  }
}
</style>
