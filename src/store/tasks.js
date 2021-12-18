export const tasksStore = {
  state: {
    tasks: JSON.parse(localStorage.getItem("tasks")) || []
  },
  addTask(newTask) {
    this.state.tasks.splice(0, 0, newTask);
  },
  deleteTask(task) {
    const index = this.state.tasks.findIndex(t => t.date === task.date);
    window.Vue.delete(this.state.tasks, index);
  }
};
