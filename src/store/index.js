import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import user from "./modules/user";

Vue.use(Vuex);

const DEBUG = process.env.NODE_ENV === "development";

export default new Vuex.Store({
    modules: {
        auth,
        user,
    },
    strict: DEBUG,
});
