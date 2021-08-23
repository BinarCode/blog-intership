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
      <button @click="logOut">Log out</button>
    </div>
    <router-view />
  </div>
</template>

<script>
// import store from '@/store/store';

export default {
  computed: {
    getLoggedInState: function() {
      return this.$store.getters.userState.loggedIn;
    },
  },
  methods: {
    logOut() {
      this.$store.commit('setUserState');
      localStorage.removeItem('vuex');
      this.$router.push('/');
    },
  },
};
</script>
