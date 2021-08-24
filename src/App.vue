<template>
  <div id="app">
    <div id="nav" class="flex justify-around">
      <router-link to="/">{{ $t('app.routerTitle.home') }}</router-link>
      <router-link to="/styleguide">
        {{ $t('app.routerTitle.styleguide') }}
      </router-link>
      <router-link to="/register">
        {{ $t('app.routerTitle.register') }}
      </router-link>

      <router-link to="/login">
        {{ $t('app.routerTitle.login') }}
      </router-link>

      <router-link to="/reset-password">
        {{ $t('general.resetPassword.title') }}
      </router-link>
      <router-link to="/forgot-password">
        {{ $t('general.forgotPassword.title') }}
      </router-link>
      <router-link to="/dashboard">
        Dashboard
      </router-link>
      <button v-if="userState.loggedIn" @click="logOut">Log out</button>
    </div>
    <router-view />
  </div>
</template>

<script>
import authService from '@/api/authService';
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['userState']),
  },
  methods: {
    ...mapActions(['setUserState']),
    async logOut() {
      await this.setUserState();
      authService.removeToken();
      this.$router.push('/');
    },
  },
};
</script>
