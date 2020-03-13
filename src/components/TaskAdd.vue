<template>
  <input
    type="text"
    placeholder="enter a new task.."
    class="new-task"
    ref="taskInput"
    v-autoresize-width="400"
    @keyup.enter="addTask"
  />
</template>

<script>
import { tasksStore } from "../store/tasksStore";
import AutoReszeWidth from "../directives/AutoResizeWidth";

export default {
  directives: {
    AutoReszeWidth
  },
  mounted() {
    this.$refs.taskInput.focus();
  },
  methods: {
    addTask() {
      if (this.$refs.taskInput.value != "") {
        const newTask = {
          text: this.$refs.taskInput.value,
          done: false,
          date: new Date().getTime(),
          duration: null
        };

        tasksStore.addTask(newTask);

        this.$refs.taskInput.value = "";
        this.$refs.taskInput.style.width = "400px";
      }
    }
  }
};
</script>

<style scoped>
.new-task {
  border: 1px solid #222831;
  background-color: #eee;
  width: 400px;
  padding: 0.5rem;
  border-radius: var(--border-radius);
  font-size: var(--normal-font-size);
  max-width: 600px;
}
</style>