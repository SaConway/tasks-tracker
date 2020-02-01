import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/timer",
    component: () => import("../views/Timer.vue")
  },
  {
    path: "/tasks-tracker",
    component: () => import("../views/TasksTracker.vue")
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
