<template>
  <div>
    <input type="checkbox" class="original-checkbox" v-model="task.done" @change="doneTask" />
    <svg class="checkbox-custom">
      <use v-if="task.done" xlink:href="#checked-icon" />
      <use v-else xlink:href="#unchecked-icon" />
    </svg>
  </div>
</template>

<script>
export default {
  props: ["task"],
  methods: {
    doneTask() {
      this.task.duration = this.task.done ? this.getDuration() : null;
    },
    getDuration() {
      const diff = new Date().getTime() - this.task.date;
      let result = "";

      const diffDays = Math.floor(diff / 86400000);
      const diffHrs = Math.floor((diff % 86400000) / 3600000);
      const diffMins = Math.round(((diff % 86400000) % 3600000) / 60000);

      if (diffDays) result += diffDays + "d ";
      if (diffHrs) result += diffHrs + "h ";
      if (diffMins) result += diffMins + "m";

      return result;
    }
  }
};
</script>

<style scoped>
.original-checkbox {
  opacity: 0;
  position: absolute;
  top: 8px;
  left: 2px;
  cursor: pointer;
  width: 24px;
  height: 24px;
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
  top: 5px;
  z-index: -1;
  height: 24px;
  width: 24px;
  fill: var(--clr-accent);
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