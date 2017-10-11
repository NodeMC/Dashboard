import api from "@/api/auth";
import { parseError } from "@/api/http";
import * as actionTypes from "@/store/actionTypes";
import * as getterNames from "@/store/getterNames";
import * as mutationTypes from "@/store/mutationTypes";

const state = {
    loginPending: false,
    loggedIn: !!localStorage.getItem("token"),
    error: "",
};

const getters = {
    [getterNames.loginFailed]: state => state.error.length > 0,
};

const actions = {
    async [actionTypes.LOGIN]({ commit }, { username, password }) {
        commit(mutationTypes.LOGIN_START);
        let token;
        try {
            token = await api.getToken(username, password);
            localStorage.setItem("id", username);
            localStorage.setItem("key", token);
            commit(mutationTypes.LOGIN_SUCCESS);
            commit(mutationTypes.USER_SET_USERNAME, username);
        } catch (e) {
            commit(mutationTypes.LOGIN_ERROR, parseError(e));
        } finally {
            commit(mutationTypes.LOGIN_FINISH);
        }
    },
};

const mutations = {
    [mutationTypes.LOGIN_SUCCESS]: (state) => {
        state.error = "";
        state.loggedIn = true;
    },
    [mutationTypes.LOGIN_ERROR]: (state, message) => {
        state.error = message;
        state.loggedIn = false;
    },
    [mutationTypes.LOGIN_START]: (state) => {
        state.error = "";
        state.loggedIn = false;
        state.loginPending = true;
    },
    [mutationTypes.LOGIN_FINISH]: (state) => {
        state.loginPending = false;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
