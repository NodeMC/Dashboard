<template>
    <div id="app">
        <navigation></navigation>
        <transition name="router" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import Navigation from "@/components/NavigationBar";

export default {
    name: "app",
    components: {
        Navigation,
    },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/icon?family=Material+Icons|Inconsolata|Lato");
@import "~bulma/sass/utilities/_all";

$primary: #2FB502;
$primary-invert: findColorInvert($primary);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert)
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Fonts
$family-sans-serif: Lato, sans-serif;
$family-monospace: InconsolataGo, Inconsolata, monospace;

$family-primary: $family-sans-serif;

// Router transition
.router-enter-active, .router-leave-active {
    transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}
.router-enter {
    opacity: 0;
    transform: translate(0, -30px);
}
.router-leave-to {
    opacity: 0;
    transform: scale(1.1);
}
.router-leave, .router-enter-to {
    opacity: 1;
    transform: none;
}

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
