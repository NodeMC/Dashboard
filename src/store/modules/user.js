import * as mutationTypes from "@/store/mutationTypes";

const state = {
    username: localStorage.getItem("username"),
};

const mutations = {
    [mutationTypes.USER_SET_USERNAME]: (state, username) => {
        state.username = username;
        localStorage.setItem("username", username);
    },
};

export default {
    state,
    mutations,
};
