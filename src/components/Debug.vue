<template>
    <div class="debug">
        <div class="hero is-primary">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">Debug</h1>
                </div>
            </div>
        </div>
        <b-tabs v-model="activeTab"
            class="section" expanded>
            <b-tab-item label="HTTP">
                <debug-http></debug-http>
            </b-tab-item>
            <b-tab-item label="Vuex Store">
                <debug-store></debug-store>
            </b-tab-item>
        </b-tabs>
    </div>
</template>

<script>
import DebugHttp from "./debug/DebugHttp";
import DebugStore from "./debug/DebugVuexStore";

export default {
    data() {
        return {
            activeTab: 0,
        };
    },
    components: {
        DebugHttp,
        DebugStore,
    },
};
</script>

