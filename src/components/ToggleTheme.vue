<template>
  <button :aria-label="ariaLabel" @click="onToggleTheme"></button>
</template>

<script>
// IMPORTS
import ENUMS from '@/utils/enums'

export default {
  data() {
    return {
      theme: localStorage.getItem('theme') || ENUMS.THEMES.DARK
    }
  },
  computed: {
    ariaLabel() {
      return `Set ${this.theme === ENUMS.THEMES.LIGHT ? ENUMS.THEMES.DARK : ENUMS.THEMES.LIGHT} theme`
    }
  },
  methods: {
    onToggleTheme() {
      const theme = this.theme === ENUMS.THEMES.LIGHT ? ENUMS.THEMES.DARK : ENUMS.THEMES.LIGHT
      this.setTheme(theme)
    },
    setTheme(theme) {
      this.theme = theme
      localStorage.setItem('theme', theme)

      document.body.className = `${theme}-theme`

      document.documentElement.style.setProperty('--clr-primary', theme === ENUMS.THEMES.LIGHT ? '#eee' : '#222831')
      document.documentElement.style.setProperty('--clr-accent', theme === ENUMS.THEMES.LIGHT ? '#222831' : '#eee')
    }
  },
  mounted() {
    if (this.theme === ENUMS.THEMES.LIGHT) {
      this.setTheme(ENUMS.THEMES.LIGHT)
    } else {
      document.body.className = 'dark-theme'
    }
  }
}
</script>

<style scoped>
button {
  position: fixed;
  inset-block-end: 1rem;
  inset-inline-end: 1rem;
  border: none;
  cursor: pointer;
  z-index: 2;
  background-color: var(--clr-accent);
  width: 2.5rem;
  height: 1.5rem;
  border-radius: 2rem;
  transition: 0.3s background-color ease-out;
}

button::before {
  content: '';
  position: absolute;
  inset-block-start: 50%;
  transform: translateY(-50%);
  width: 1rem;
  height: 1rem;
  background-color: var(--clr-primary);
  border-radius: 50%;
  transition: 0.3s right ease-out, 0.3s background-color ease-out;
}

.dark-theme button::before {
  animation: 0.3s toggle-right ease-out forwards;
}

.light-theme button::before {
  animation: 0.3s toggle-left ease-out forwards;
}

@keyframes toggle-left {
  0% {
    right: 0.25rem;
  }
  90% {
    right: calc(100% - 1rem);
  }
  100% {
    right: calc(100% - 1.25rem);
  }
}

@keyframes toggle-right {
  0% {
    right: calc(100% - 1.25rem);
  }
  90% {
    right: 0;
  }
  100% {
    right: 0.25rem;
  }
}
</style>
