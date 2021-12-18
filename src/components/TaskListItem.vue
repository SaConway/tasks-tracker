<template>
  <div class="task">
    <task-list-item-status :task="task" />
    <input type="text" v-model="task.text" v-autoresize-width="200" />
    <span v-if="tag" class="tag">{{ tag }}</span>
    <!-- <span class="time-duration">{{ task.date | taskTime }}</span> -->
    <button @click="deleteTask" class="delete-task">
      <icon-trush></icon-trush>
    </button>
  </div>
</template>

<script>
import { tasksStore } from '../store/tasksStore'
import { AutoReszeWidth } from '../directives/AutoResizeWidth'
import IconTrush from './IconTrush'
import TaskListItemStatus from './TaskListItemStatus'

export default {
  props: ['task'],
  components: {
    IconTrush,
    TaskListItemStatus
  },
  computed: {
    tag() {
      return this.task.tags?.[0] || ''
    }
  },
  directives: {
    AutoReszeWidth
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
  margin-top: 1rem;
  position: relative;
  display: flex;
  align-items: center;
}

input[type='text'] {
  margin-left: 2rem;
  margin-right: 1rem;
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

.time-duration {
  padding-left: 0.8rem;
  font-size: 0.7rem;
  opacity: 0.8;
}

.tag {
  background-color: var(--clr-accent);
  color: var(--clr-primary);
  border-radius: 100vmax;
  font-size: 0.65rem;
  margin-right: 0.6rem;
  padding: 0.25rem 0.5rem;
}
</style>
