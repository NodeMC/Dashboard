<template>
    <centred-form class="create-user" title="Create a new user">
        <b-loading :active="waiting"></b-loading>
        <b-notification :active="!!errorMsg"
            type="is-danger"
            @close="errorMsg = null"
            has-icon>{{errorMsg}}</b-notification>
        <form @submit.prevent="submit">
            <b-field label="Username"
                :type="usernameValid ? 'is-success' : 'is-danger'"
                :message="usernameValid ? null : `Must be at least ${minUsernameLength} characters.`">
                    <b-input type="text"
                    placeholder="Username"
                    v-model="username"></b-input>
            </b-field>
            <b-field label="Password"
                :type="passwordValid ? 'is-success' : 'is-danger'"
                :message="passwordValid ? null : `Must be at least ${minPasswordLength} characters.`">
                <b-input type="password"
                placeholder="Password"
                v-model="password"></b-input>
            </b-field>
            <b-field label="Confirm password"
                :type="passwordMatches ? 'is-success' : 'is-danger'"
                :message="passwordMatches ? null : `Passwords must match.`">
                    <b-input type="password"
                    placeholder="Password"
                    v-model="confirmPassword"></b-input>
            </b-field>
            <div class="control">
                <button class="button is-primary" @click="submit"
                    :disabled="!canSubmit">Submit</button>
            </div>
        </form>
    </centred-form>
</template>

<script>
import { minUsernameLength, minPasswordLength } from "@/config";
import api from "@/api/user";
import CentredForm from "./LayoutCentred";

export default {
    components: {
        CentredForm,
    },
    data() {
        return {
            minUsernameLength,
            minPasswordLength,
            username: "",
            password: "",
            confirmPassword: "",
            waiting: false,
            errorMsg: "",
        };
    },
    methods: {
        async submit() {
            if (!this.canSubmit) return;

            this.waiting = true;
            const res = await api.createUser(this.username, this.password);
            if (res.data && res.data === "USER_CREATED") {
                this.$toast.open({
                    message: "User successfully created - you can now log in.",
                    type: "is-success",
                    position: "is-bottom",
                });
                this.$router.push("/login");
            } else if (res.errors && res.errors[0]) {
                this.errorMsg = res.errors[0].message;
            }
            this.waiting = false;
        },
    },
    computed: {
        usernameValid() {
            return this.username.length >= minUsernameLength;
        },
        passwordValid() {
            return this.password.length >= minPasswordLength;
        },
        passwordMatches() {
            return this.password === this.confirmPassword
                && this.passwordValid;
        },
        canSubmit() {
            return this.usernameValid
                && this.passwordValid
                && this.passwordMatches;
        },
    },
};
</script>

<style>

</style>
