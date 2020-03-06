<template>
  <div class="tasks">
    <div v-for="items in tasks" :key="items.date">
      <template v-if="items.tasks.length">
        <p class="date">{{ items.date }}</p>

        <TaskItem v-for="task in items.tasks" :key="items.date + task.date" :task="task" />
      </template>
    </div>
  </div>
</template>

<script>
import TaskItem from "./TaskItem";

export default {
  props: ["tasks"],
  components: {
    TaskItem
  }
};
</script>

<style scoped>
.tasks {
  margin-top: 3rem;
  color: var(--accent-color);
}

.date {
  margin: 2rem auto 1rem;
}
</style>