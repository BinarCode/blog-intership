import Vue from 'vue'
import VueRouter from 'vue-router'
import Blogs from '@/views/Blogs'
import ResetPassword from '@/views/ResetPassword';
import Styleguide from '@/views/Styleguide';
import Register from '@/views/Register';
import Login from '@/views/Login';
import Profile from '@/views/Profile';
import ForgotPassword from '@/views/ForgotPassword';
import EditBlog from '@/views/EditBlog';
import CreateBlog from '@/views/CreateBlog';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Blogs',
    component: Blogs,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: '/edit-blog/:blogId',
    name: 'EditBlog',
    component: EditBlog,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: '/create-blog',
    name: 'CreateBlog',
    component: CreateBlog,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: '/styleguide',
    name: 'Styleguide',
    component: Styleguide,
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
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
