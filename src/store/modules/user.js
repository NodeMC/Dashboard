import * as mutationTypes from "@/store/mutationTypes";

const state = {
    username: null,
};

const mutations = {
    [mutationTypes.USER_SET_USERNAME]: (state, username) => {
        state.username = username;
    },
};

export default {
    state,
    mutations,
};
