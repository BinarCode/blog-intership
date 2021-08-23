import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import ResetPassword from '@/views/ResetPassword.vue';
import Styleguide from '@/views/Styleguide.vue';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'

import store from '@/store/store'
import guest from '@/router/middleware/guest'
import auth from '@/router/middleware/auth'
import middlewarePipeline from '@/router/middlewarePipeline';

import ForgotPassword from '@/views/ForgotPassword';

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
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      middleware: [
        guest
      ]
    }
  },
  {
    path: '/reset-password',
    name: 'Reset Password',
    component: ResetPassword
  },
  {
    path: '/forgot-password',
    name: 'Forgot Password',
    component: ForgotPassword
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      middleware: [
        auth
      ]
    },
    // children: [{
    //   path: '/dashboard/movies',
    //   name: 'dashboard.movies',
    //   component: Movies,
    //   meta: {
    //     middleware: [
    //       auth
    //     ]
    //   },
    // }],
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware

  const context = {
    to,
    from,
    next,
    store
  }
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

export default router
