<template>
    <div>
        <div class="columns is-centered">
            <div class="column is-half">
                <div class="section">
                    <h1 class="title">Log in to NodeMC</h1>
                    <b-notification v-if="errorMsg" type="is-danger" has-icon>{{errorMsg}}</b-notification>
                    <div class="field">
                        <div class="control">
                            <input class="input"
                                type="text"
                                placeholder="Username"
                                v-model="username"
                                :disabled="loggingIn">
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <input class="input"
                                type="password"
                                placeholder="Password"
                                v-model="password"
                                :disabled="loggingIn"
                                @keyup.enter="login">
                        </div>
                    </div>
                    <div class="field is-grouped is-align-bottom is-grouped-right">
                        <div class="control">
                            <router-link class="button"
                                v-if="anonymousCreateUser"
                                to="/createuser">Create user</router-link>
                        </div>
                        <div class="control">
                            <button class="button is-primary"
                                @click="login"
                                :disabled="loggingIn">Log in</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <b-loading :active="loggingIn"></b-loading>
    </div>
</template>

<script>
import { anonymousCreateUser } from "@/config";
import * as actionTypes from "@/store/actionTypes";

export default {
    name: "login",
    data() {
        return {
            username: "",
            password: "",
            anonymousCreateUser,
        };
    },
    computed: {
        loggingIn() {
            return this.$store.state.auth.loginPending;
        },
        errorMsg() {
            return this.$store.state.auth.error;
        },
        loggedIn() {
            return this.$store.state.auth.loggedIn;
        },
    },
    methods: {
        login() {
            const { username, password } = this;
            this.$store.dispatch(actionTypes.LOGIN, { username, password });
        },
        showSuccess(message) {
            this.$toast.open({
                message,
                type: "is-success",
                position: "is-bottom",
            });
        },
        gotoCreateUser() {
            console.log("create user goes here"); // eslint-disable-line
        },
    },
    watch: {
        loggedIn(success) {
            if (success) {
                this.showSuccess("Login successful");
                this.$router.push("/");
            }
        },
    },
};
</script>
