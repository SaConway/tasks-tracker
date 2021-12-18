<template>
  <div class="tasks">
    <!-- TASK LIST -->
    <div v-for="items in tasks" :key="items.date">
      <template v-if="items.tasks.length">
        <!-- TASK ITEM -->
        <task-list-item v-for="task in items.tasks" :key="items.date + task.date" :task="task" />
      </template>
    </div>
  </div>
</template>

<script>
import TaskListItem from '@/components/TaskListItem'

export default {
  props: {
    tasks: {
      type: Array,
      default: () => {
        return []
      },
      required: false
    }
  },
  components: {
    TaskListItem
  }
}
</script>

<style scoped>
.tasks {
  margin-top: 3rem;
  color: var(--clr-accent);
}

.date {
  margin: 2rem auto 1rem;
}
</style>
