<template>
    <pre class="debug-vuex-store"><code>{{stringState}}</code></pre>
</template>

<script>
export default {
    computed: {
        stringState() {
            return JSON.stringify(this.$store.state, null, 4);
        },
    },
};
</script>

