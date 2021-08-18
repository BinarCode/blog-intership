import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import Styleguide from '@/views/Styleguide';
import RegisterPage from '@/views/RegisterPage';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/styleguide',
    name: 'Styleguide',
    component: Styleguide
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
