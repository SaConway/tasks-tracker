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

    <button @click="addTask" class="add-task">
      <img src="@/assets/plus.svg" />
    </button>

    <div class="tasks">
      <div v-for="date in filterUniqueDates(tasks)" :key="date">
        <p class="date">{{ date }}</p>

        <div
          v-for="task in filterTasksOfDate(date)"
          class="task"
          :key="date + task.date"
        >
          <input
            type="checkbox"
            v-model="task.done"
            tabindex="0"
            @change="doneTask(task.date)"
          />
          <div class="checkbox-custom"></div>

          <input type="text" v-model="task.text" v-autoresize />
          <span class="task-time">[{{ getTimeDetails(task.date) }}]</span>
          <button @click="deleteTask(task.date)" class="delete-task">
            <img src="@/assets/delete.svg" />
          </button>
        </div>
      </div>
    </div>
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
button {
  cursor: pointer;
  background-color: transparent;
}

button.add-task {
  border: none;
  padding: 0;
  margin: 0;
  width: 40px;
  height: 40px;
  position: relative;
  top: 15px;
  left: 10px;
  overflow: hidden;
}

button.add-task img {
  width: 40px;
  height: 40px;
}

button.delete-task {
  width: 35px;
  border: none;
  vertical-align: middle;
  padding: 0.4rem;
  margin-left: 10px;
}

button.delete-task img {
  vertical-align: middle;
}

input[type="text"] {
  padding: 0.5rem;
  border-radius: var(--border-radius);
  font-size: var(--normal-font-size);
}

.new-task {
  border: none;
  background-color: var(--accent-color);
  vertical-align: middle;
  width: 20rem;
  margin: 3rem 0;
}

.tasks {
  margin-top: 0;
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
  margin: 2rem auto;
}

p.date:first-of-type {
  margin-top: 0;
}

/* Checkbox */

input[type="checkbox"] {
  opacity: 0;
  position: absolute;
  top: 8px;
  left: 2px;
  cursor: pointer;
  width: 24px;
  height: 24px;
}

input[type="checkbox"]:checked + .checkbox-custom::before {
  content: url(../assets/checked.svg);
  animation: tick 0.2s ease-in;
}

input[type="checkbox"]:focus + .checkbox-custom::before {
  outline: 1px solid var(--primary-color);
  outline-offset: 5px;
}

.checkbox-custom::before {
  content: url(../assets/unchecked.svg);
  position: absolute;
  top: 5px;
  z-index: -1;
  height: 24px;
  width: 24px;
  overflow: hidden;
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
