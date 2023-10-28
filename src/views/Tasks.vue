<template>
  <div class="container">
    <div class="top-bar">
      <!-- ADD TASK -->
      <task-add />

      <!-- FILTER TASKS -->
      <task-filters :selectedFilter="filter" @[EVENTS.SELECTED]="setFilter($event)" />
    </div>

    <!-- TASK LIST -->
    <task-list :tasks="orderedTasks" />

    <!-- ICONS -->
    <icons-check-box />
  </div>
</template>

<script>
// IMPORTS
import tasksStore from '@/store/tasks'
import TaskAdd from '@/components/TaskAdd'
import TaskFilters from '@/components/TaskFilters'
import TaskList from '@/components/TaskList'
import IconsCheckBox from '@/components/IconsCheckBox'
import ENUMS from '@/utils/enums'
import EVENTS from '@/utils/events'

export default {
  components: {
    TaskAdd,
    IconsCheckBox,
    TaskList,
    TaskFilters
  },
  data() {
    return {
      EVENTS,
      tasks: tasksStore.state.tasks,
      orderedTasks: [],
      filter: ''
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
  },
  methods: {
    setFilter(filter) {
      this.filter = filter

      localStorage.setItem('filter', filter)

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

        if (this.filter === ENUMS.TASKS.FILTERS.ALL) {
          return res
        } else if (this.filter === ENUMS.TASKS.FILTERS.UNFINISHED_ONLY) {
          return res && !task.done
        }
      })
    },
    toFullDate(dateString) {
      const date = new Date(dateString)
      const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}, ${weekday[date.getDay()]}`
    },
    getSelectedFilter() {
      return localStorage.getItem('filter') || ENUMS.TASKS.FILTERS.ALL
    }
  },
  created() {
    this.filter = this.getSelectedFilter()
    this.setOrderedTasks()
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
  gap: 1rem;
  width: 100%;
}

@media (max-width: 1000px) {
  .top-bar {
    flex-direction: column;
  }
}
</style>
