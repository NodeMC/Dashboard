import Vue from "vue";
import Router from "vue-router";

import NotFound from "@/components/NotFoundPage";

import Home from "@/components/HomePage";
import Login from "@/components/AuthLoginPage";
import CreateUser from "@/components/UserCreatePage";
import Debug from "@/components/DebugPage";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "*",
            name: "Not found",
            component: NotFound,
        },
        {
            path: "/",
            name: "Home",
            component: Home,
        },
        {
            path: "/login",
            name: "Login",
            component: Login,
        },
        {
            path: "/createuser",
            name: "Create user",
            component: CreateUser,
        },
        {
            path: "/debug",
            name: "Debug",
            component: Debug,
        },
    ],
});
