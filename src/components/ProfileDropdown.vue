<template>
  <el-dropdown trigger="click" class="p-2" @command="handleCommand">
    <span class="cursor-pointer flex items-center font-medium">
      <avatar class="w-6 h-6 mr-1 flex-shrink" :path="user" />
      {{ getFullName(user) }}
      <i class="el-icon-arrow-down el-icon--right pt-1"></i>
    </span>

    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        :command="commands.profile"
        :class="{ 'active-dropdown': routeName === 'Profile' }"
      >
        {{ $t('general.profile.title') }}
      </el-dropdown-item>
      <el-dropdown-item
        class=" md:hidden"
        :command="commands.blogs"
        :class="{ 'active-dropdown': routeName === 'Blogs' }"
      >
        {{ $t('general.blogs.title') }}
      </el-dropdown-item>
      <el-dropdown-item :command="commands.logout" divided>
        {{ $t('general.profile.logout') }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import get from 'lodash/get';

export default {
  name: 'ProfileDropdown',
  data() {
    return {
      commands: {
        profile: 'Profile',
        blogs: 'Blogs',
        logout: 'Logout',
      },
    };
  },
  computed: {
    ...mapGetters({
      user: 'userState'
    }),
    routeName() {
      return this.$route.name;
    },
  },
  methods: {
    ...mapActions(['setUserState']),
    get,
    async logOut() {
      await this.setUserState();
      localStorage.clear();
      this.$router.push({ name: 'Login' });
    },
    handleCommand(command) {
      if (command === 'Profile' && this.routeName !== 'Profile') {
        this.$router.push({ name: 'Profile' });
      } else if (command === 'Blogs' && this.routeName !== 'Blogs') {
        this.$router.push({ name: 'Blogs' });
      } else if (command === 'Logout' && this.routeName !== 'Logout') {
        this.logOut();
      }
    },
  },
};
</script>

<style scoped></style>
