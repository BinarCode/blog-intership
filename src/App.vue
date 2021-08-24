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
      <menu-dropdown
        v-if="userState.loggedIn"
        username="someusername"
        avatar=""
      />
    </div>
    <router-view />
  </div>
</template>

<script>
import MenuDropdown from '@/components/MenuDropdown';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    MenuDropdown,
  },
  computed: {
    ...mapGetters(['userState']),
  },
};
</script>
