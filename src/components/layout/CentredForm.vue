<template>
    <div class="centred-form columns is-centered">
        <div class="column is-half">
            <div class="section">
                <h1 class="title"
                    v-if="title">{{ title }}</h1>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["title"],
};
</script>

<style>

</style>
