<template>
  <main class="main-wrapper" id="app">
    <!-- MAIN HEADER -->
    <h1 class="sr-only">Tasks Tracker</h1>

    <!-- TASKS -->
    <tasks />

    <!-- TOGGLE THEME -->
    <toggle-theme />
  </main>
</template>

<script>
// IMPORTS
import Tasks from '@/views/Tasks.vue'
import ToggleTheme from '@/components/ToggleTheme'

export default {
  components: {
    Tasks,
    ToggleTheme
  }
}
</script>

<style>
:root {
  --clr-primary: #222831;
  --clr-secondary: #ee6436;
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

ul {
  list-style: none;
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
