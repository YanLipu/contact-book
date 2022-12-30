import { defineStore } from 'pinia';

export const userStore = defineStore('counter', {
  state: () => ({
    token: null,
    id: null,
  }),
  getters: {
    getToken: (state) => state.token,
    getId: (state) => state.id,
  },
  actions: {
    setToken(token) {
      if (token) {
        this.token = token;
      }
    },
    setId(id) {
      if (id) {
        this.id = id;
      }
    },
    clearToken() {
      this.token = null;
    },
    returnToken() {
      return !!this.token;
    },
  },
});
