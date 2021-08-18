import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import Styleguide from '@/views/Styleguide';
import RegisterPage from '@/views/RegisterPage';
import ResetPassword from '@/views/ResetPassword';

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
  },
  {
    path: '/reset-password',
    name: 'Reset Password',
    component: ResetPassword
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
