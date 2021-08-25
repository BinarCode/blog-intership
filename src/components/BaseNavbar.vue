<template>
<nav class="bg-white shadow w-full">
    <div class="flex justify-between h-16 mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex">
        <router-link to="/" class="flex-shrink-0 flex items-center mr-10">
          <img class="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow">
          <img class="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg" alt="Workflow">
        </router-link>
        <div class="hidden md:ml-6 md:flex md:space-x-8">
            <router-link class="active-router-link" to="/">
                     {{ $t('navbarHome.name') }}
            </router-link>
            <router-link class="router-link" to="/">
                    {{ $t('navbarEditBlog.name') }}
            </router-link>
            <router-link class="router-link" to="/">
                      {{ $t('navbarCreateBlog.name') }}
            </router-link>
        </div>
      </div>
      <div class="flex items-center justify-center">
        <div class="max-w-lg w-full lg:max-w-xs ml-10">
          <label for="search" class="sr-only">Search</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
            <vue-simple-suggest class="block pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Search"
                 v-model="search"
                 display-attribute="attributes.title"
                 value-attribute="id"
                 @suggestion-click="goToBlog"
                 :list="getSearchResult"
                 :max-suggestions="5"
                 :debounce="500"
                 :controls="{
                 selectionUp: [38, 33],
                 selectionDown: [40, 34],
                 select: [13, 36],
                 showList: [40],
                 hideList: [27, 35],
                 autocomplete: [32, 13],}"
                 :filter-by-query="true">
                 <div slot="suggestion-item" slot-scope="{ suggestion }">
                 <div>{{ suggestion.attributes.title }}</div></div>
            </vue-simple-suggest>
          </div>
        </div>
         <div class="hidden md:ml-6 md:flex md:space-x-8">
          <router-link class="router-link" to="/login">
                     {{ $t('app.routerTitle.login') }}
              </router-link>
         <router-link class="router-link" to="/register">
                      {{ $t('app.routerTitle.register') }}
             </router-link>
             <menu-dropdown username="someusername" avatar=""/>
         </div>
      </div>
      </div>
</nav>
</template>

<script>

import blogService from '@/api/blogService'
import authService from '@/api/authService'
import MenuDropdown from '@/components/MenuDropdown.vue'
import VueSimpleSuggest from 'vue-simple-suggest'

export default {
  name: 'BaseNavbar',
  components: {
    MenuDropdown,
    VueSimpleSuggest
  },
 data() {
    return {
      search: ''
    }
  },
    methods: {
    getSearchResult: async function() {
        try  {
          let token = authService.getToken()
          let data = await blogService.blogSearchResults(this.search, token)
          return data.data
        } catch (err) {
          console.log(err)
       } 
    },
    goToBlog: function(e) {
      this.$router.push(`/blogs/${e.id}`);
    }
  },
};
</script>

<style lang="css">
  .suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  padding: 0 0;
  background: #fff;
  width: 100%;
  border: .5px solid rgba(0,0,0, .2);
  }
  .suggestions li {
    padding: 5px 10px;
    font-weight: 500;
    color: rgba(0, 0, 0, .7);
    cursor: pointer;
  }
  .suggestions li:hover {
    background: rgba(99, 102, 241, var(--tw-border-opacity));
    color: rgba(255, 255, 255, .8);
  }
  .input-wrapper .default-input:focus-visible {
    outline: none;
  }
</style>
