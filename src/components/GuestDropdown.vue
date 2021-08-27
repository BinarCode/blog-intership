<template>
  <el-dropdown trigger="click" class="p-2" @command="handleCommand">
    <span class="cursor-pointer flex items-center font-medium">
      {{ $t('general.menu.label') }}
      <i class="el-icon-arrow-down el-icon--right pt-1"></i>
    </span>

    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        :command="commands.logIn"
        :class="{ 'active-dropdown': routeName === 'Login' }"
      >
        {{ $t('app.routerTitle.login') }}
      </el-dropdown-item>
      <el-dropdown-item
        :command="commands.signUp"
        :class="{ 'active-dropdown': routeName === 'Register' }"
        divided
      >
        {{ $t('register.button.label.signUp') }}
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

  computed: {
    routeName() {
      return this.$route.name;
    },
  },

  methods: {
    handleCommand(command) {
      if (command === 'Login' && this.routeName !== 'Login')
        this.$router.push({ name: 'Login' });

      else if (command === 'Register' && this.routeName !== 'Register')
        this.$router.push({ name: 'Register' });
    },
  },
}
</script>

<style scoped></style>
