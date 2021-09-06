import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import get from 'lodash/get';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      token: '',
      id: null,
      first_name: '',
      last_name: '',
      avatar: '',
      email: '',
    },
  },

  getters: {
    userState(state) {
      return state.user;
    },
  },

  mutations: {
    setUserState(state, data) {
      state.user.loggedIn = !!get(data, 'token', '');
      state.user.token = get(data, 'token', '');
      state.user.id = get(data, 'user.id', null);
      state.user.first_name = get(data, 'user.first_name', '');
      state.user.last_name = get(data, 'user.last_name', '');
      state.user.avatar = get(data, 'user.avatar', '');
      state.user.email = get(data, 'user.email', '');
      state.user.created_at = get(data, 'user.created_at', '');
      state.user.updated_at = get(data, 'user.updated_at', '');
    },
  },
  actions: {
    setUserState(context, data) {
      context.commit('setUserState', data);
    },
  },
  plugins: [createPersistedState()],
});
