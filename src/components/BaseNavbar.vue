<template>
  <nav class="bg-white shadow w-full">
    <div class="flex justify-between h-16 px-6">
      <div class="flex">
        <router-link to="/" class="flex-shrink-0 mr-8 flex items-center">
          <img
            class="h-8 w-auto"
            src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
            alt="Workflow"
          />
        </router-link>
        <div v-if="userState.loggedIn" class="hidden md:flex md:space-x-8">
          <router-link
            class="router-link"
            :class="{ 'active-router-link': routeName === 'Blogs' }"
            to="/"
          >
            {{ $t('general.blogs.title') }}
          </router-link>
          <router-link
            class="router-link"
            :class="{ 'active-router-link': routeName === 'Styleguide' }"
            to="/styleguide"
          >
            {{ $t('general.styleguide.title') }}
          </router-link>
        </div>
      </div>
      <div class="flex my-auto">
        <div class="flex" v-if="userState.loggedIn">
          <div id="search" class="hidden sm:flex relative max-w-xs">
            <label for="search" class="sr-only">Search</label>
            <div class="absolute inset-y-0 left-0 px-3 flex items-center">
              <svg
                class="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              type="search"
              name="search"
              placeholder="Search"
              class="block pl-10 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <profile-dropdown username="someusername" avatar="" />
        </div>
        <div v-if="!userState.loggedIn">
          <guest-dropdown class="sm:hidden" />
          <div class="hidden sm:flex sm:space-x-8 h-16">
            <router-link
              class="router-link"
              :class="{ 'active-router-link': routeName === 'Login' }"
              to="/login"
            >
              {{ $t('app.routerTitle.login') }}
            </router-link>
            <router-link
              class="router-link"
              :class="{ 'active-router-link': routeName === 'Register' }"
              to="/register"
            >
              {{ $t('app.routerTitle.register') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import ProfileDropdown from '@/components/ProfileDropdown.vue';
import GuestDropdown from '@/components/GuestDropdown.vue';

export default {
  name: 'BaseNavbar',
  components: { ProfileDropdown, GuestDropdown },
  computed: {
    routeName() {
      return this.$route.name;
    },
  },
};
</script>
