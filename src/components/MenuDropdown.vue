<template>
  <el-dropdown trigger="click" class="p-2" @command="handleCommand">
      <span class="cursor-pointer flex items-center font-medium">
        <img class="h-5 rounded-full bg-black mr-1" 
        :src="getAvatar" 
        alt="Avatar">
        @{{ username }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :command="commands.profile">
        {{ $t('general.profile.title') }}
      </el-dropdown-item>
      <el-dropdown-item :command="commands.logout" divided>
        {{ $t('general.profile.logout') }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'MenuDropdown',
  props: {
    username: String,
    avatar: String,
  },
  data() {
    return {
      commands: {
        profile: 'Profile',
        logout: 'Logout',
      },
    };
  },
  computed: {
    getAvatar() {
      if (!this.avatar)
        return 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg';

      return this.avatar;
    },
  },
  methods: {
    ...mapActions(['setUserState']),
    async logOut() {
      await this.setUserState();
      localStorage.clear();
      this.$router.push({ name: 'Login' });
    },
    handleCommand(command) {
      if (command === 'Profile' && this.$route.name !== 'Profile') {
        this.$router.push({ name: 'Profile' });
      } else if (command === 'Logout' && this.$route.name !== 'Logout') {
        this.logOut();
      }
    },
  },
};
</script>

<style scoped></style>
