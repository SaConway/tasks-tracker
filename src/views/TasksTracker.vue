<template>
  <div class="container">
    <div class="top-bar">
      <AddTask @add-task="addTask($event)" />
      <TasksFilters @filter-selected="setFilter($event)" />
    </div>

    <div class="tasks">
      <div v-for="tasks in orderedTasks" :key="tasks.date">
        <template v-if="tasks.tasks.length">
          <p class="date">{{ tasks.date }}</p>

          <Task
            v-for="task in tasks.tasks"
            :key="tasks.date + task.date"
            :task="task"
            class="task"
            @delete-task="deleteTask($event)"
          ></Task>
        </template>
      </div>
    </div>

    <CheckedIcons />
  </div>
</template>

<script>
import AddTask from "../components/AddTask";
import TasksFilters from "../components/TasksFilters";
import Task from "../components/Task";
import CheckedIcons from "../components/CheckedIcons";

export default {
  data() {
    return {
      tasks: JSON.parse(localStorage.getItem("tasks")) || [],
      orderedTasks: [],
      filter: "all"
    };
  },
  components: {
    AddTask,
    CheckedIcons,
    Task,
    TasksFilters
  },
  mounted() {
    this.setOrderedTasks();
  },
  methods: {
    addTask(task) {
      const newTask = {
        text: task,
        done: false,
        date: new Date().getTime(),
        duration: null
      };

      this.tasks.splice(0, 0, newTask);
    },
    deleteTask(date) {
      const index = this.tasks.findIndex(task => task.date === date);
      window.Vue.delete(this.tasks, index);
    },
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

.tasks {
  margin-top: 3rem;
  color: var(--accent-color);
}

.task {
  margin: 1rem 0 0 1rem;
  position: relative;
}

p.date {
  margin: 2rem auto 1rem;
}
</style>
