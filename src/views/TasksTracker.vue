<template>
  <div class="container">
    <div class="top-bar">
      <input
        type="text"
        placeholder="enter a new task.."
        class="new-task"
        ref="taskInput"
        v-model="task"
        v-autoresize-width="400"
        @keyup.enter="addTask"
      />

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
import CheckedIcons from "../components/CheckedIcons";
import Task from "../components/Task";
import TasksFilters from "../components/TasksFilters";

export default {
  data() {
    return {
      task: "",
      tasks: JSON.parse(localStorage.getItem("tasks")) || [],
      orderedTasks: [],
      filter: "all"
    };
  },
  components: {
    CheckedIcons,
    Task,
    TasksFilters
  },
  mounted() {
    this.$refs.taskInput.focus();

    this.setOrderedTasks();
  },
  methods: {
    addTask() {
      if (this.task != "") {
        const newTask = {
          text: this.task,
          done: false,
          date: new Date().getTime(),
          duration: null
        };

        this.tasks.splice(0, 0, newTask);
        this.task = "";
        this.$refs.taskInput.style.width = "400px";
      }
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

.new-task {
  border: 1px solid #222831;
  background-color: #eee;
  width: 400px;
  padding: 0.5rem;
  border-radius: var(--border-radius);
  font-size: var(--normal-font-size);
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
