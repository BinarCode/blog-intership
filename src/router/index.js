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
    },
  },

  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      requiresNonLogged: true
    }
  },

  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresNonLogged: true
    }
  },

  {
    path: '/reset-password',
    name: 'Reset Password',
    component: ResetPassword,
    meta: {
      requiresNonLogged: true
    }
  },

  {
    path: '/forgot-password',
    name: 'Forgot Password',
    component: ForgotPassword,
    meta: {
      requiresNonLogged: true
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
  let requiresNonLogged = to.matched.some(record => record.meta.requiresNonLogged);

  if (requiresAuth && !store.getters.userState.loggedIn) {
    return next({ name: 'Login' });
  }

  if (requiresNonLogged && store.getters.userState.loggedIn) {
    return next({ name: 'Dashboard' });
  }

  if (!to.meta.middleware) {
    return next()
  }

  const middleware = to.meta.middleware;

  const context = { to, from, next, store }

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

export default router
