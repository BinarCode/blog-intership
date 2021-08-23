<template>
  <el-dropdown trigger="click" class="p-2" @command="handleCommand">
      <span class="cursor-pointer flex items-center">
        <img class="h-5 rounded-full bg-black mr-1" :src="avatar || 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg'" alt="Avatar">
        @{{ username }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :command="commands.profile">{{ $t('general.profile.title') }}</el-dropdown-item>
      <el-dropdown-item divided>{{ $t('general.profile.logout') }}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'NavDropdown',
  props: {
    username: String,
    avatar: String
  },
  data() {
    return {
      commands: {
        profile: "Profile"
      }
    }
  },
  methods: {
    handleCommand(command) {
      if (command === "Profile" && this.$route.name != "Profile") {
        this.$router.push({name: "Profile"});
      }
    }
  }
}
</script>

<style scoped>
</style>
