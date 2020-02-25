<template>
  <div>
    <input type="checkbox" v-model="task.done" @change="doneTask" />
    <svg class="checkbox-custom">
      <use v-if="task.done" xlink:href="#checked-icon" />
      <use v-else xlink:href="#unchecked-icon" />
    </svg>

    <input type="text" v-model="task.text" v-autoresize-width="200" />
    <span class="datetime">{{ getTimeDetails() }}</span>
    <button @click="$emit('delete-task', task.date)" class="delete-task">
      <trushIcon></trushIcon>
    </button>
  </div>
</template>

<script>
import TrushIcon from "./TrushIcon";

export default {
  props: ["task"],
  components: {
    TrushIcon
  },
  methods: {
    doneTask() {
      if (this.task.done) {
        const diff = new Date().getTime() - this.task.date;
        this.task.duration = this.diffToDaysHrsMins(diff);
      } else {
        this.task.duration = null;
      }
    },
    diffToDaysHrsMins(diff) {
      let result = "";

      const diffDays = Math.floor(diff / 86400000);
      const diffHrs = Math.floor((diff % 86400000) / 3600000);
      const diffMins = Math.round(((diff % 86400000) % 3600000) / 60000);

      if (diffDays) result += diffDays + "d ";
      if (diffHrs) result += diffHrs + "h ";
      if (diffMins) result += diffMins + "m";

      return result;
    },
    getTimeDetails() {
      return (
        "[" +
        this.toHrsMins(this.task.date) +
        (this.task.duration ? " | " + this.task.duration : "") +
        "]"
      );
    },
    toHrsMins(date) {
      const dateNumber = new Date(date);

      let hours = dateNumber.getHours().toString();
      let minutes = dateNumber.getMinutes().toString();

      if (hours.length == 1) hours = "0" + hours;
      if (minutes.length == 1) minutes = "0" + minutes;

      return hours + ":" + minutes;
    }
  }
};
</script>

<style scoped>
input[type="text"] {
  background-color: transparent;
  padding: 0.5rem;
  border: none;
  color: var(--accent-color);
  margin-left: 2.1rem;
}

button.delete-task {
  width: 35px;
  border: none;
  vertical-align: middle;
  padding: 0.4rem;
  margin-left: 10px;
}

button.delete-task svg {
  vertical-align: middle;
  fill: var(--accent-color);
  transition: 0.3s transform ease-in-out;
}

button.delete-task:hover svg {
  transform: scale(1.25, 1.25);
}

input[type="checkbox"] {
  opacity: 0;
  position: absolute;
  top: 8px;
  left: 2px;
  cursor: pointer;
  width: 24px;
  height: 24px;
}

input[type="checkbox"]:checked + .checkbox-custom {
  animation: tick 0.2s ease-in;
}

input[type="checkbox"]:focus + .checkbox-custom {
  outline: 1px solid var(--primary-color);
  outline-offset: 5px;
}

.checkbox-custom {
  position: absolute;
  top: 5px;
  z-index: -1;
  height: 24px;
  width: 24px;
  fill: var(--accent-color);
}

.datetime {
  padding-left: 0.8rem;
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