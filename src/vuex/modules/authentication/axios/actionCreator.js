// actionCreator.js

import mutations from "./mutations";
import Cookies from "js-cookie";
import { useToast } from "vue-toastification";

const toast = useToast();

const state = () => ({
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null, // Initialize with user data from cookies
  loading: false,
  error: null,
});

const actions = {
  async register({ commit }) {
    try {
      commit("registerBegin");
      return commit("registerSuccess", true);
    } catch (err) {
      commit("registerErr", err);
    }
  },

  async login({ commit }, userData) {
    try {
      commit("loginBegin");
      Cookies.set("user", JSON.stringify(userData.user), { expires: 7 }); // Store user data as a JSON string in cookies
      toast.success("Login Successful!");
      return commit("loginSuccess", userData);
    } catch (err) {
      commit("loginErr", err);
    }
  },

  async logOut({ commit }) {
    try {
      commit("logoutBegin");
      Cookies.remove("user"); // Remove user data from cookies
      commit("logoutSuccess", null);
    } catch (err) {
      commit("logoutErr", err);
    }
  },
};

export default {
  namespaced: false,
  state,
  actions,
  mutations,
};
