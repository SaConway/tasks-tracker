<template>
  <div class="wrapper">
    <input
      v-model="data.hours"
      maxlength="2"
      ref="hoursInput"
      @input="onInputChange"
      @keyup.enter="startTimer"
    />
    <span class="time-period">h</span>

    <input v-model="data.minutes" maxlength="2" @input="onInputChange" @keyup.enter="startTimer" />
    <span class="time-period">m</span>
  </div>
</template>

<script>
import { timerStore } from "../store/timerStore";

export default {
  data() {
    return {
      data: timerStore.state.output
    };
  },
  mounted() {
    this.$refs.hoursInput.focus();
  },
  methods: {
    onInputChange() {
      this.data.hours = this.data.hours.replace(/[^\d]+/g, "");
      this.data.minutes = this.data.minutes.replace(/[^\d]+/g, "");
    },
    startTimer() {
      timerStore.startTimer();
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: inline-block;
}

input {
  background-color: #eee;
  padding: 1rem;
  border: 1px solid var(--clr-accent);
  border-radius: var(--border-radius);
  font-size: var(--font-size-normal);
  color: #222831;
  width: 5rem;
  text-align: center;
}

.time-period {
  color: var(--clr-accent);
  font-size: var(--font-size-normal);
  vertical-align: middle;
  margin-right: 2rem;
  margin-left: 1rem;
}

.time-period:last-of-type {
  margin-right: 4rem;
}
</style>