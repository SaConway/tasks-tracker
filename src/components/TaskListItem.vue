<template>
  <div class="task">
    <!-- STATUS -->
    <task-list-item-status :task="task" />

    <!-- INPUT -->
    <input type="text" v-model="task.text" aria-label="Task text" v-autoresize-width="200" />

    <!-- DELETE -->
    <button class="delete-task" :aria-label="`Delete ${task.text}`" @click="deleteTask">
      <icon-trash></icon-trash>
    </button>
  </div>
</template>

<script>
// IMPORTS
import tasksStore from '@/store/tasks'
import { AutoResizeWidth } from '@/directives/AutoResizeWidth'
import IconTrash from '@/components/IconTrash'
import TaskListItemStatus from '@/components/TaskListItemStatus'

export default {
  components: {
    IconTrash,
    TaskListItemStatus
  },
  directives: {
    AutoResizeWidth
  },
  props: {
    task: {
      type: Object,
      default: () => {
        return {}
      },
      required: false
    }
  },
  methods: {
    deleteTask() {
      tasksStore.deleteTask(this.task)
    }
  },
  filters: {
    taskTime: function(value) {
      const dateNumber = new Date(value)

      const date = `${dateNumber.getDate()}/${dateNumber.getMonth() + 1}/${dateNumber.getFullYear()}`

      let hours = dateNumber.getHours().toString()
      let minutes = dateNumber.getMinutes().toString()

      if (hours.length == 1) hours = '0' + hours
      if (minutes.length == 1) minutes = '0' + minutes

      return date + ', ' + hours + ':' + minutes
    },
    taskDuration: function(value) {
      return value ? ' | ' + value : ''
    }
  }
}
</script>

<style scoped>
.task {
  margin-block-start: 1rem;
  position: relative;
  display: flex;
  align-items: center;
}

input[type='text'] {
  margin-inline: 2rem 1rem;
  padding: 0.5rem;
  background-color: transparent;
  border: none;
  color: var(--clr-accent);
  font-size: var(--font-size-normal);
  border-radius: var(--border-radius);
}

.delete-task {
  border: none;
  border-radius: var(--border-radius);
  padding: 0.4rem;
}

.delete-task svg {
  vertical-align: middle;
  fill: var(--clr-accent);
  transition: 0.3s transform ease-in-out;
}

.delete-task:hover svg {
  transform: scale(1.25, 1.25);
}
</style>
