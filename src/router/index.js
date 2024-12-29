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
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/confirmarEmail',
    name: 'confirmarEmail',
    component: ConfirmarEmailView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
