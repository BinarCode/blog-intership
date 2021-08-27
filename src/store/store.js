import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const types = {
    SET_USER: 'SET_USER',
    IS_LOGGEDIN: 'IS_LOGGEDIN',
    SET_TOKEN: 'SET_TOKEN'
}

const state = {
    user: {},
    is_loggedin: false,
    token: ''
}

const mutations = {
    [types.SET_USER]: (state, user) => {
        state.user = user;
    },

    [types.IS_LOGGEDIN]: (state, is_loggedin) => {
        state.is_loggedin = is_loggedin;
    },

    [types.SET_TOKEN]: (state, token) => {
        state.token = token;
    }
}

const actions = {
    setUserState(context, user) {
        context.commit(types.SET_USER, user);
    },

    setLoggedInState(context, is_loggedin) {
        context.commit(types.IS_LOGGEDIN, is_loggedin);
    },

    setTokenState(context, token) {
        context.commit(types.SET_TOKEN, token);
    }
}

export default new Vuex.Store({
    state: state,

    getters: {
        userState(state) {
            return state.user;
        },

        is_loggedinState(state) {
            return state.is_loggedin;
        },

        tokenState(state) {
            return state.token;
        }
    },

    mutations: mutations,

    actions: actions,

    plugins: [createPersistedState()],
})
