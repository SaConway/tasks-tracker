<template>
  <main id="app">
    <SideBar />
    <keep-alive>
      <router-view />
    </keep-alive>
    <ToggleTheme />
  </main>
</template>

<script>
import SideBar from './components/SideBar'
import ToggleTheme from './components/ToggleTheme'

export default {
  components: {
    SideBar,
    ToggleTheme
  }
}
</script>

<style>
:root {
  --clr-primary: #222831;
  --clr-secondary: #d65a31;
  --clr-accent: #eee;
  --border-radius: 0.2rem;
  --font-size-normal: 1rem;
}

* {
  font-family: 'B612 Mono', monospace;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  background-color: var(--clr-primary);
}

:focus {
  outline: none;
}

:focus-visible {
  outline: 1px solid var(--clr-secondary);
  outline-offset: 3px;
}

::selection {
  background: var(--clr-secondary);
  color: var(--clr-accent);
}

main {
  display: flex;
  justify-content: space-between;
}

button {
  background-color: transparent;
  cursor: pointer;
}

/* scroll bar */

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: var(--clr-primary);
}

::-webkit-scrollbar-thumb {
  background: var(--clr-accent);
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
