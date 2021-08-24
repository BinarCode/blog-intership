import Vue from 'vue';
import Vuex from 'vuex';
// import authServices from '@/api/authService';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        user: {
            loggedIn: false,
            token: '',
        }
    },

    getters: {
        userState(state) {
            return state.user;
        }
    },

    mutations: {
        setUserState(state, token = '') {
            state.user.loggedIn = !!token;
            state.user.token = token || '';
        },
    },
    actions: {
        setUserState(context, data) {
            context.commit('setUserState', data);
        }
    },
    plugins: [createPersistedState()],
})