<template>
  <input
    type="text"
    autofocus
    placeholder="enter a new task.."
    class="new-task"
    ref="taskInput"
    v-model="task"
    v-autoresize-width="400"
    @keyup.enter="addTask"
  />
</template>

<script>
export default {
  data() {
    return {
      task: ""
    };
  },
  mounted() {
    this.$refs.taskInput.focus();
  },
  methods: {
    addTask() {
      if (this.task != "") {
        this.$emit("add-task", this.task);

        this.task = "";
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
}
</style>