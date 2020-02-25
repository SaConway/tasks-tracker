<template>
  <div class="container">
    <input
      type="text"
      placeholder="enter a new task.."
      v-model="task"
      ref="taskInput"
      @keyup.enter="addTask"
      class="new-task"
      v-autoresize-width="320"
    />

    <button @click="addTask" class="add-btn" :class="{ visible: task.length > 0 }">add</button>

    <div class="tasks">
      <div v-for="date in filterUniqueDates(tasks)" :key="date">
        <p class="date">{{ date }}</p>

        <div v-for="task in filterTasksOfDate(date)" class="task" :key="date + task.date">
          <task :task="task" v-on:delete-task="deleteTask($event)"></task>
        </div>
      </div>
    </div>

    <checkedIcons></checkedIcons>
  </div>
</template>

<script>
import CheckedIcons from "../components/CheckedIcons";
import Task from "../components/Task";

export default {
  data() {
    return {
      task: "",
      tasks: JSON.parse(localStorage.getItem("tasks")) || []
    };
  },
  components: {
    CheckedIcons,
    Task
  },
  mounted() {
    this.$refs.taskInput.focus();
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
        this.$refs.taskInput.style.width = "320px";
      }
    },
    deleteTask(date) {
      const index = this.findIndex(date);

      window.Vue.delete(this.tasks, index);
    },
    filterTasksOfDate(date) {
      return this.tasks.filter(task => this.toFullDate(task.date) == date);
    },
    findIndex(date) {
      return this.tasks.findIndex(task => task.date === date);
    },
    filterUniqueDates() {
      var flags = [],
        output = [],
        l = this.tasks.length,
        i;

      for (i = 0; i < l; i++) {
        const date = this.toFullDate(this.tasks[i].date);

        if (flags[date]) continue;
        flags[date] = true;
        output.push(date);
      }

      return output;
    },
    toFullDate(date) {
      const dateNumber = new Date(date);
      return (
        dateNumber.getDate().toString() +
        "/" +
        (dateNumber.getMonth() + 1).toString() +
        "/" +
        dateNumber.getFullYear().toString()
      );
    }
  },
  watch: {
    tasks: {
      handler: function(val) {
        localStorage.setItem("tasks", JSON.stringify(val));
      },
      deep: true
    }
  }
};
</script>

<style scoped>
input[type="text"] {
  padding: 0.5rem;
  border-radius: var(--border-radius);
  font-size: var(--normal-font-size);
}

.new-task {
  border: 1px solid #222831;
  background-color: #eee;
  width: 320px;
}

.tasks {
  margin-top: 3rem;
  color: var(--accent-color);
}

.task {
  margin-top: 1rem;
  margin-left: 1rem;
  position: relative;
  animation: fade-in 0.5s ease-in;
}

p.date {
  margin: 2rem auto 1rem;
}
</style>
