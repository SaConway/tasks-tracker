<template>
  <div class="main-wrapper" id="app">
    <!-- SIDE BAR -->
    <side-bar />

    <main>
      <h1 class="sr-only">{{ titleMap[$route.name] }}</h1>

      <!-- ROUTER -->
      <keep-alive>
        <router-view />
      </keep-alive>

      <!-- TOGGLE THEME -->
      <toggle-theme />
    </main>
  </div>
</template>

<script>
// IMPORTS
import SideBar from '@/components/SideBar'
import ToggleTheme from '@/components/ToggleTheme'
import ENUMS from '@/utils/enums'

export default {
  components: {
    SideBar,
    ToggleTheme
  },
  data() {
    return {
      titleMap: {
        [ENUMS.FEATURES.TASKS]: 'Tasks Tracker',
        [ENUMS.FEATURES.TIMER]: 'Timer',
        [ENUMS.FEATURES.NOTES]: 'Notes'
      }
    }
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

.main-wrapper {
  display: grid;
  grid-template-columns: auto 1fr;
}

.sr-only {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
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
  padding: 3rem;
  opacity: 0;
  animation: 1.5s fade-in ease-in-out forwards;
}

@keyframes fade-in {
  to {
    opacity: 1;
  }
}
</style>
