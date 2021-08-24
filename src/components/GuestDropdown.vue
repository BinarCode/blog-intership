<template>
  <el-dropdown trigger="click" class="p-2" @command="handleCommand">
    <span class="cursor-pointer flex items-center font-medium">
      Menu
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>

    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :command="commands.logIn">
        {{ $t('app.routerTitle.login') }}
      </el-dropdown-item>
      <el-dropdown-item :command="commands.signUp" divided>
        {{ $t('app.routerTitle.register') }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'GuestDropdown',
  data() {
    return {
      commands: {
        logIn: 'Login',
        signUp: 'Register',
      },
    };
  },
  methods: {
    handleCommand(command) {
      if (command === 'Login' && this.$route.name !== 'Login') {
        this.$router.push({ name: 'Login' });
      } else if (command === 'Register' && this.$route.name !== 'Register') {
        this.$router.push({ name: 'Register' });
      }
    },
  },
};
</script>

<style scoped></style>
