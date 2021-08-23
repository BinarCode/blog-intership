import Vue from 'vue';
import Vuex from 'vuex';
// import authServices from '@/api/authService';

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        user: {
            loggedIn: false,
        }
    },

    getters: {
        auth(state) {
            return state.user
        }
    },

    mutations: {
        setLoggedInTrue(state) {
            state.user.loggedIn = true;
        },
        setLoggedInFalse(state) {
            state.user.loggedIn = false;
        },
    }
})