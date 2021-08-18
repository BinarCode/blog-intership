import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import Styleguide from '@/views/Styleguide';
import inputTest from '@/views/inputTest';
import registerPage from '@/views/registerPage';
import resetPassword from '@/views/resetPassword';

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
    component: registerPage
  },
  {
    path: '/reset-password',
    name: 'Reset Password',
    component: resetPassword
  },
  {
    path: '/input-test',
    name: 'Input Test',
    component: inputTest
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
