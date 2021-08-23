import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import ResetPassword from '@/views/ResetPassword.vue';
import Styleguide from '@/views/Styleguide.vue';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import ForgotPassword from '@/views/ForgotPassword';

import store from '@/store/store'
import middlewarePipeline from '@/router/middlewarePipeline';

import ifLoggedInDashboardElseNext from './middleware/ifLoggedInDashboardElseNext';
// import ifLoggedInNextElseLogin from './middleware/ifLoggedInNextElseLogin';

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
    component: Styleguide,
    meta: {
      requiresAuth: true,
      // middleware: []
    },
  },

  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      middleware: [ifLoggedInDashboardElseNext]
    }
  },

  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      middleware: [ifLoggedInDashboardElseNext]
    }
  },

  {
    path: '/reset-password',
    name: 'Reset Password',
    component: ResetPassword,
    meta: {
      middleware: [ifLoggedInDashboardElseNext]
    }
  },

  {
    path: '/forgot-password',
    name: 'Forgot Password',
    component: ForgotPassword,
    meta: {
      middleware: [ifLoggedInDashboardElseNext]
    }
  },

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
      // middleware: []
    },
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth) {
    if (!store.getters.userState.loggedIn)
      return next({ name: 'Login' });
  }

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
