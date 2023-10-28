<template>
  <div class="tasks">
    <!-- TASK LIST -->
    <div v-for="items in tasks" :key="items.date">
      <template v-if="items.tasks.length">
        <!-- DATE -->
        <p class="date">{{ items.date }}</p>

        <!-- TASK ITEM -->
        <task-list-item v-for="task in items.tasks" :key="items.date + task.date" :task="task" />
      </template>
    </div>
  </div>
</template>

<script>
// IMPORTS
import TaskListItem from '@/components/TaskListItem'

export default {
  components: {
    TaskListItem
  },
  props: {
    tasks: {
      type: Array,
      default: () => {
        return []
      },
      required: false
    }
  }
}
</script>

<style scoped>
.tasks {
  display: grid;
  gap: 2rem;
  margin-top: 4rem;
  color: var(--clr-accent);
}

.date {
  font-size: 0.875rem;
}
</style>
