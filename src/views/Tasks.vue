<template>
  <div class="container">
    <div class="top-bar">
      <task-add :tags="tags" />
      <task-filters @filter-selected="setFilter($event)" />
    </div>

    <task-list :tasks="orderedTasks" />
    <icons-check-box />
  </div>
</template>

<script>
import { tasksStore } from '../store/tasksStore'
import { tagsStore } from '../store/tagsStore'
import TaskAdd from '../components/TaskAdd'
import TaskFilters from '../components/TaskFilters'
import TaskList from '../components/TaskList'
import IconsCheckBox from '../components/IconsCheckBox'

export default {
  data() {
    return {
      tasks: tasksStore.state.tasks,
      orderedTasks: [],
      filter: 'all',
      tags: tagsStore.state.tags
    }
  },
  components: {
    TaskAdd,
    IconsCheckBox,
    TaskList,
    TaskFilters
  },
  created() {
    this.setOrderedTasks()
  },
  methods: {
    setFilter(filter) {
      this.filter = filter

      this.setOrderedTasks()
    },
    setOrderedTasks() {
      const uniqueDates = this.getUniqueDates()

      this.orderedTasks = uniqueDates.map(date => {
        return { date, tasks: this.filterTasks(date) }
      })
    },
    getUniqueDates() {
      const dates = this.tasks.map(task => this.toFullDate(task.date))
      return [...new Set(dates)]
    },
    filterTasks(date) {
      return this.tasks.filter(task => {
        let res = this.toFullDate(task.date) === date

        if (this.filter === 'all') {
          return res
        } else if (this.filter === 'unfinised-only') {
          return res && !task.done
        }
      })
    },
    toFullDate(dateString) {
      const date = new Date(dateString)
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }
  },
  watch: {
    tasks: {
      handler: function(val) {
        localStorage.setItem('tasks', JSON.stringify(val))

        this.setOrderedTasks()
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1400px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
