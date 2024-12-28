import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import LoginView from '@/views/LoginView.vue'
import ConfirmarEmailView from '@/views/ConfirmarEmailView.vue'

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainView
  },
  {
    path: '/logi',
    name: 'logi',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: LoginView
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ConfirmarEmailView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
