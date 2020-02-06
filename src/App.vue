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
  outline: var(--primary-color) auto 1px;
}

#app {
  display: flex;
  opacity: 0;
  animation: fade-in 0.5s 0.2s ease-in;
  animation-fill-mode: forwards;
  height: 100vh;
}

#nav {
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  padding: 3rem;
  background-color: var(--accent-color);
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  height: fit-content;
}

#nav a {
  font-weight: bold;
  text-decoration: none;
  margin: 1rem 0;
  color: var(--secondary-color);
}

#nav a.router-link-exact-active {
  color: var(--primary-color);
}

.container {
  flex: 1;
  padding: 5rem;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
