<template>
  <nav class="bg-white shadow w-full">
    <div class="flex justify-between h-16 px-6">
      <div class="flex">
        <router-link to="/" class="flex-shrink-0 mr-8 flex items-center">
          <bc-logo class="h-7" />
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
            <label for="search" class="sr-only">
              {{ $t('navbarSearch.placeholder.name') }}
            </label>
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
            <vue-simple-suggest
              class="block pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search"
              v-model="search"
              display-attribute="title"
              value-attribute="id"
              @suggestion-click="goToBlog"
              :list="getSearchResult"
              :max-suggestions="5"
              :debounce="500"
              :controls="searchControls"
              :filter-by-query="true"
              @input="debouncedSearch"
            >
            </vue-simple-suggest>
          </div>
          <profile-dropdown />
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
import { getBlogSearchResults } from '@/api/blogService';
import ProfileDropdown from '@/components/ProfileDropdown.vue';
import GuestDropdown from '@/components/GuestDropdown.vue';
import VueSimpleSuggest from 'vue-simple-suggest';
import eventBus from '@/api/eventBus';
import { mapGetters } from 'vuex';
import debounce from 'lodash/debounce';

export default {
  name: 'BaseNavbar',
  components: {
    ProfileDropdown,
    GuestDropdown,
    VueSimpleSuggest,
  },
  data() {
    return {
      search: '',
    };
  },
  methods: {
    debounce,
    debouncedSearch: debounce(
        function() { eventBus.$emit('update:searchTerm', this.search) },
        500
    ),
    getSearchResult: async function() {
      try {
        let blogs = await getBlogSearchResults(this.search);
        return blogs.data;
      } catch (err) {
        console.log(err);
      }
    },
    goToBlog: function(currentSuggestion) {
      //when clicking a suggestion this function is called; see line 45
      const path = `/blogs/${currentSuggestion.id}`;
      if (this.$route.path != path) {
        this.$router.push(path);
      }
    },
  },
  computed: {
    ...mapGetters(['userState']),
    routeName() {
      return this.$route.name;
    },
    searchControls() {
      return {
        selectionUp: [38, 33],
        selectionDown: [40, 34],
        select: [13, 36],
        showList: [40],
        hideList: [27, 35],
        autocomplete: [32, 13],
      };
    },
  },
};
</script>

<style lang="css">
/*suggestion list modification - start */
.suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  padding: 0 0;
  background: #fff;
  width: 100%;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
}
.suggestions li {
  padding: 5px 10px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.7);
  cursor: pointer;
}
.suggestions li:hover {
  background: rgba(99, 102, 241, var(--tw-border-opacity));
  color: rgba(255, 255, 255, 0.8);
}
.input-wrapper .default-input:focus-visible {
  outline: none;
}
/*suggestion list modification - end */
</style>
