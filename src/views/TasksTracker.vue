<template>
  <div class="container">
    <div class="top-bar">
      <AddTask />
      <TasksFilters @filter-selected="setFilter($event)" />
    </div>

    <Tasks :tasks="orderedTasks" />
    <CheckedIcons />
  </div>
</template>

<script>
import { tasksStore } from "../store/tasksStore";
import AddTask from "../components/AddTask";
import TasksFilters from "../components/TasksFilters";
import Tasks from "../components/Tasks";
import CheckedIcons from "../components/CheckedIcons";

export default {
  data() {
    return {
      tasks: tasksStore.state.tasks,
      orderedTasks: [],
      filter: "all"
    };
  },
  components: {
    AddTask,
    CheckedIcons,
    Tasks,
    TasksFilters
  },
  created() {
    this.setOrderedTasks();
  },
  methods: {
    setFilter(filter) {
      this.filter = filter;

      this.setOrderedTasks();
    },
    setOrderedTasks() {
      const uniqueDates = this.getUniqueDates();

      this.orderedTasks = uniqueDates.map(date => {
        return { date, tasks: this.filterTasks(date) };
      });
    },
    getUniqueDates() {
      const dates = this.tasks.map(task => this.toFullDate(task.date));
      return [...new Set(dates)];
    },
    filterTasks(date) {
      return this.tasks.filter(task => {
        let res = this.toFullDate(task.date) === date;

        if (this.filter === "all") {
          return res;
        } else if (this.filter === "unfinised-only") {
          return res && !task.done;
        }
      });
    },
    toFullDate(dateString) {
      const date = new Date(dateString);
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
  },
  watch: {
    tasks: {
      handler: function(val) {
        localStorage.setItem("tasks", JSON.stringify(val));

        this.setOrderedTasks();
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
}
</style>
