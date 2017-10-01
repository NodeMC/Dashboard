<template>
    <div>
        <img src="../assets/logo.png">
        <el-row :gutter="20">
            <el-col :span="8" :offset="8">
                <el-card header="Log in to NodeMC" v-loading="loggingIn" element-loading-text="Logging in...">
                    <el-input placeholder="Username" v-model="username" :disabled="loggingIn"></el-input>
                    <el-input placeholder="Password" v-model="password" type="password" @keyup.enter.native="login" :disabled="loggingIn"></el-input>
                    <el-button type="primary" :disabled="loggingIn" :loading="loggingIn" @click="login">Log in</el-button>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import * as actionTypes from "../store/actionTypes";

export default {
    name: "login",
    data() {
        return {
            username: "",
            password: "",
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
        showError(message) {
            this.$message.error(message);
        },
        showSuccess(message) {
            this.$message.success(message);
        },
    },
    watch: {
        errorMsg(msg) {
            if (msg) this.showError(msg);
        },
        loggedIn(success) {
            if (success) {
                this.showSuccess("Login successful");
                this.$router.push("/");
            }
        },
    },
};
</script>

<style scoped>
.el-card__body > * {
    margin: 4px 0;
}
</style>
