import Vue from 'vue'
import VueRouter from 'vue-router'
import Tasks from '@/views/Tasks.vue'
import ENUMS from '@/utils/enums'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/tasks-tracker'
  },
  {
    name: ENUMS.FEATURES.TASKS,
    path: '/tasks-tracker',
    component: Tasks
  },
  {
    name: ENUMS.FEATURES.TIMER,
    path: '/timer',
    component: () => import('../views/Timer.vue')
  },
  {
    name: ENUMS.FEATURES.NOTES,
    path: '/notes',
    component: () => import('../views/Notes.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
