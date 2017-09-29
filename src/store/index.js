import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";

Vue.use(Vuex);

const DEBUG = process.env.NODE_ENV === "development";

export default new Vuex.Store({
    modules: {
        auth,
    },
    strict: DEBUG,
});
