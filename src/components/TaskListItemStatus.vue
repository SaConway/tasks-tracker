<template>
  <div>
    <!-- CHECK BOX -->
    <input class="original-checkbox" type="checkbox" :aria-label="inputAriaLabel" v-model="task.done" @change="doneTask" />

    <!-- ICONS -->
    <svg class="checkbox-custom" aria-hidden="true">
      <use v-if="task.done" xlink:href="#checked-icon" />
      <use v-else xlink:href="#unchecked-icon" />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      default: () => {
        return {}
      },
      required: false
    }
  },
  computed: {
    inputAriaLabel() {
      return `${this.task.done ? 'Check' : 'Uncheck'} ${this.task.text}`
    }
  },
  methods: {
    doneTask() {
      this.task.duration = this.task.done ? this.getDuration() : null
    },
    getDuration() {
      const diff = new Date().getTime() - this.task.date
      let result = ''

      const diffDays = Math.floor(diff / 86400000)
      const diffHrs = Math.floor((diff % 86400000) / 3600000)
      const diffMins = Math.round(((diff % 86400000) % 3600000) / 60000)

      if (diffDays) result += diffDays + 'd '
      if (diffHrs) result += diffHrs + 'h '
      if (diffMins) result += diffMins + 'm'

      return result
    }
  }
}
</script>

<style scoped>
.original-checkbox {
  opacity: 0;
  position: absolute;
  inset-block-start: 8px;
  inset-inline-start: 2px;
  cursor: pointer;
  width: 24px;
  height: 24px;
  border-radius: var(--border-radius);
}

.original-checkbox:checked + .checkbox-custom {
  animation: tick 0.2s ease-in;
}

.original-checkbox:focus + .checkbox-custom {
  outline: 1px solid var(--clr-secondary);
  outline-offset: 5px;
}

.checkbox-custom {
  position: absolute;
  inset-block-start: 5px;
  z-index: -1;
  height: 24px;
  width: 24px;
  fill: var(--clr-accent);
  border-radius: var(--border-radius);
}

@keyframes tick {
  0% {
    transform: scale(0);
  }
  90% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
