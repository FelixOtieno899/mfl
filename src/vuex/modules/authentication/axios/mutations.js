export default {
  registerBegin(state) {
    state.register = true;
  },
  registerSuccess(state, data) {
    state.loading = false;
    state.register = data;
  },

  registerErr(state, err) {
    state.loading = false;
    state.error = err;
  },

  loginBegin(state) {
    state.login = true;
  },
  loginSuccess(state, userData) {
    state.loading = false;
    state.user = userData.user;

    console.log("Login success called");
  },

  loginErr(state, err) {
    state.loading = false;
    state.error = err;
  },

  logoutBegin(state) {
    state.loading = true;
  },

  logoutSuccess(state, data) {
    state.loading = false;
    state.login = data;
  },

  logoutErr(state, err) {
    state.loading = false;
    state.error = err;
  },
};
