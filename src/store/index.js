import Vue from "vue";
import Vuex from "vuex";

import { alert } from "./alert.module";
import { account } from "./account.module";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    alert,
    account,
    user: {
      id: '',
      username: '',
      token: '',
    },
    docs: [],
  },
  mutations: {
    SET_USER(state, user) {
      // console.log(user);
      state.user.id = user.id;
      // console.log(state.user.id);
      state.user.name = user.username;
      state.user.token = user.token;
    },
    SET_DOCS (state, docs) {
      state.docs = docs;
    },
  },
  getters: {
    countDocs: (state) => Object.keys(state.docs).length,
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      reducer(state) {
        return {
          user: state.user,
          account: state.account,
          alter: state.alert,
          docs: state.docs,
        };
      },
    }),
  ],
});
