<template>
    <nav class="navbar is-primary" role="navigation">
        <div class="navbar-brand">
            <router-link class="navbar-item is-size-4" to="/">NodeMC</router-link>
            <button class="button navbar-burger is-primary is-radiusless"
                :class="{ 'is-active': hamburgerActive }"
                @click="toggleHamburger">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
        <div class="navbar-menu"
            :class="{ 'is-active': hamburgerActive }">
            <div class="navbar-start">
                <!-- This space left intentionally blank -->
            </div>
            <div class="navbar-end">
                <router-link class="navbar-item"
                    to="/login"
                    v-if="!loggedIn">
                    <b-icon icon="person"></b-icon>
                    <span>Log in</span>
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: "navigation",
    data() {
        return {
            hamburgerActive: false,
        };
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.loggedIn;
        },
    },
    methods: {
        toggleHamburger() {
            this.hamburgerActive = !this.hamburgerActive;
        },
    },
};
</script>

<style lang="scss" scoped>
button.navbar-burger {
    border: none;
}
</style>

