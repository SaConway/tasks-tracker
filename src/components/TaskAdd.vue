<template>
  <form class="form">
    <!-- NEW TASK INPUT -->
    <input class="new-task" type="text" placeholder="enter a new task.." ref="taskInput" v-autoresize-width="500" @keyup.enter="addTask" />
  </form>
</template>

<script>
// IMPORTS
import { AutoResizeWidth } from '@/directives/AutoResizeWidth'
import tasksStore from '@/store/tasks'

export default {
  directives: {
    AutoResizeWidth
  },
  methods: {
    addTask() {
      if (this.$refs.taskInput.value != '') {
        const newTask = {
          text: this.$refs.taskInput.value,
          done: false,
          date: new Date().getTime(),
          duration: null
        }

        tasksStore.addTask(newTask)

        this.$refs.taskInput.value = ''
        this.$refs.taskInput.style.width = '500px'

        this.$refs.taskInput.focus()
      }
    }
  },
  mounted() {
    this.$refs.taskInput.focus()
  }
}
</script>

<style scoped>
.new-task {
  max-width: 50rem;
  border: none;
  background-color: #eee;
  padding: 0.5rem;
  border-radius: var(--border-radius);
  font-size: var(--font-size-normal);
}
</style>
