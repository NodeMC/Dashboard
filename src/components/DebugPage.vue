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
                <http-tab></http-tab>
            </b-tab-item>
            <b-tab-item label="Vuex Store">
                <store-tab></store-tab>
            </b-tab-item>
        </b-tabs>
    </div>
</template>

<script>
import HttpTab from "./DebugTabHttp";
import StoreTab from "./DebugTabVuexStore";

export default {
    data() {
        return {
            activeTab: 0,
        };
    },
    components: {
        HttpTab,
        StoreTab,
    },
};
</script>

