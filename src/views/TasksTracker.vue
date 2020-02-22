<template>
  <div class="container">
    <input
      type="text"
      placeholder="enter a new task.."
      v-model="task"
      ref="taskInput"
      @keyup.enter="addTask"
      class="new-task"
      v-autoresize
    />

    <button @click="addTask" class="add-btn" v-bind:class="{ visible: task.length > 0 }">add</button>

    <div class="tasks">
      <div v-for="date in filterUniqueDates(tasks)" :key="date">
        <p class="date">{{ date }}</p>

        <div v-for="task in filterTasksOfDate(date)" class="task" :key="date + task.date">
          <input type="checkbox" v-model="task.done" @change="doneTask(task.date)" />
          <svg class="checkbox-custom">
            <use v-if="task.done" xlink:href="#checked-icon" />
            <use v-else xlink:href="#unchecked-icon" />
          </svg>

          <input type="text" v-model="task.text" v-autoresize />
          <span class="task-time">[{{ getTimeDetails(task.date) }}]</span>
          <button @click="deleteTask(task.date)" class="delete-task">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <path
                d="M9 19c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5-17v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712zm-3 4v16h-14v-16h-2v18h18v-18h-2z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <svg display="none">
      <symbol id="checked-icon">
        <path
          d="M10.041 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591zm-5.041-15c-1.654 0-3 1.346-3 3v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-14c0-1.654-1.346-3-3-3h-14zm19 3v14c0 2.761-2.238 5-5 5h-14c-2.762 0-5-2.239-5-5v-14c0-2.761 2.238-5 5-5h14c2.762 0 5 2.239 5 5z"
        />
      </symbol>

      <symbol id="unchecked-icon">
        <path
          d="M5 2c-1.654 0-3 1.346-3 3v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-14c0-1.654-1.346-3-3-3h-14zm19 3v14c0 2.761-2.238 5-5 5h-14c-2.762 0-5-2.239-5-5v-14c0-2.761 2.238-5 5-5h14c2.762 0 5 2.239 5 5z"
        />
      </symbol>
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      task: "",
      tasks: JSON.parse(localStorage.getItem("tasks")) || []
    };
  },
  mounted() {
    this.$refs.taskInput.focus();
  },
  directives: {
    autoresize: {
      inserted: function(el) {
        el.style.width = el.scrollWidth + "px";

        function OnInput() {
          this.style.width = this.scrollWidth + "px";
        }

        el.addEventListener("keyup", OnInput);
        el.addEventListener("change", OnInput);
      }
    }
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
      }
    },
    deleteTask(date) {
      const index = this.findIndex(date);

      window.Vue.delete(this.tasks, index);
    },
    doneTask(date) {
      const index = this.findIndex(date);
      let duration;

      if (this.tasks[index].done) {
        const diff = this.subtractDates(
          new Date().getTime(),
          this.tasks[index].date
        );
        duration = this.diffToDaysHrsMins(diff);
      } else {
        duration = null;
      }

      this.tasks[index].duration = duration;
    },
    filterTasksOfDate(date) {
      return this.tasks.filter(task => this.toFullDate(task.date) == date);
    },
    getTimeDetails(date) {
      const index = this.findIndex(date);
      const task = this.tasks[index];
      return (
        this.toHrsMins(task.date) + (task.duration ? " | " + task.duration : "")
      );
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
    findIndex(date) {
      return this.tasks.findIndex(task => task.date === date);
    },
    diffToDaysHrsMins(diff) {
      let result = "";

      const diffDays = Math.floor(diff / 86400000);
      const diffHrs = Math.floor((diff % 86400000) / 3600000);
      const diffMins = Math.round(((diff % 86400000) % 3600000) / 60000);

      if (diffDays) result += diffDays + "d ";
      if (diffHrs) result += diffHrs + "h ";
      if (diffMins) result += diffMins + "m";

      return result;
    },

    toHrsMins(date) {
      const dateNumber = new Date(date);

      let hours = dateNumber.getHours().toString();
      let minutes = dateNumber.getMinutes().toString();

      if (hours.length == 1) hours = "0" + hours;
      if (minutes.length == 1) minutes = "0" + minutes;

      return hours + ":" + minutes;
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
    },

    subtractDates(date1, date2) {
      return date1 - date2;
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
button.delete-task {
  width: 35px;
  border: none;
  vertical-align: middle;
  padding: 0.4rem;
  margin-left: 10px;
}

button.delete-task svg {
  vertical-align: middle;
  fill: var(--accent-color);
  transition: 0.3s transform ease-in-out;
}

button.delete-task:hover svg {
  transform: scale(1.25, 1.25);
}

input[type="text"] {
  padding: 0.5rem;
  border-radius: var(--border-radius);
  font-size: var(--normal-font-size);
}

.new-task {
  border: 1px solid #222831;
  background-color: #eee;
  width: 20rem;
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

.task input[type="text"] {
  background-color: transparent;
  border: none;
  color: var(--accent-color);
  vertical-align: middle;
  margin-left: 2.3rem;
}

p.date {
  margin: 2rem auto 1rem;
}

input[type="checkbox"] {
  opacity: 0;
  position: absolute;
  top: 8px;
  left: 2px;
  cursor: pointer;
  width: 24px;
  height: 24px;
}

input[type="checkbox"]:checked + .checkbox-custom {
  animation: tick 0.2s ease-in;
}

input[type="checkbox"]:focus + .checkbox-custom {
  outline: 1px solid var(--primary-color);
  outline-offset: 5px;
}

.checkbox-custom {
  position: absolute;
  top: 5px;
  z-index: -1;
  height: 24px;
  width: 24px;
  fill: var(--accent-color);
}

@keyframes tick {
  0% {
    transform: scale(0);
  }
  90% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
