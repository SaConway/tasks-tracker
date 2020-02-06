import Vue from "vue";
import VueRouter from "vue-router";
import TasksTracker from "../views/TasksTracker.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/tasks-tracker"
  },
  {
    path: "/tasks-tracker",
    component: TasksTracker
  },
  {
    path: "/timer",
    component: () => import("../views/Timer.vue")
  },
  {
    path: "/notes",
    component: () => import("../views/Notes.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
