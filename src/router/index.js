import Vue from "vue";
import VueRouter from "vue-router";
import Tasks from "../views/Tasks.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/tasks-tracker"
  },
  {
    path: "/tasks-tracker",
    component: Tasks
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
