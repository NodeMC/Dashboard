<template>
    <div class="home">
        <section class="hero is-primary">
            <div class="hero-body">
                <h1 class="title">Welcome to NodeMC</h1>
            </div>
        </section>
        <footer class="footer">
            <div class="columns">
                <div class="column is-quarter is-offset-one-quarter">
                    <strong>NodeMC</strong> by the <a href="https://github.com/NodeMC">NodeMC Team</a>.
                </div>
                <div class="column is-quarter">
                    <h2>Built with</h2>
                    <ul>
                        <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
                        <li><a href="http://vuex.vuejs.org/" target="_blank">Vuex</a></li>
                        <li><a href="https://bulma.io/" target="_blank">Bulma</a></li>
                        <li><a href="https://buefy.github.io/" target="_blank">Buefy</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    name: "home",
};
</script>
