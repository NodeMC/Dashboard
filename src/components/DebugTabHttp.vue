<template>
    <div class="debug-http container">
        <b-notification :active="!!rejection" type="is-danger" @close="rejection = null">{{rejection}}</b-notification>
        <b-field>
            <b-select v-model="method" placeholder="Method" :disabled="waiting">
                <option>GET</option>
                <option>PUT</option>
                <option>POST</option>
                <option>PATCH</option>
                <option>DELETE</option>
            </b-select>
            <b-input
                v-model="url"
                placeholder="URL"
                expanded
                :disabled="waiting"></b-input>
            <p class="control">
                <button
                    class="button is-primary"
                    :class="{ 'is-loading': waiting }"
                    @click="request"
                    :disabled="waiting">Go</button>
            </p>
        </b-field>
        <div class="columns">
            <div class="column is-one-third">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">Request</p>
                    </header>
                    <div class="card-content">
                        <textarea class="textarea code"
                            v-model="requestBody"
                            :disabled="waiting"></textarea>
                    </div>
                </div>
            </div>
            <div class="column is-two-thirds">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">Response</p>
                    </header>
                    <div class="card-content">
                        <p v-if="responseCode">Response code: <code>{{responseCode}}</code></p>
                        <p v-if="responseBody">Response body: <pre><code>{{responseBody}}</code></pre></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import http from "@/api/http";

const instance = http();

export default {
    data() {
        return {
            method: "GET",
            url: "/v2/auth/status",
            responseCode: 0,
            responseBody: "",
            requestBody: "",
            rejection: "",
            waiting: false,
        };
    },
    methods: {
        async request() {
            if (!(this.method && this.url)) return;
            this.waiting = true;
            let response;
            try {
                response = await instance({
                    url: this.url,
                    method: this.method.toUpperCase(),
                    data: this.requestBody ? JSON.stringify(JSON.parse(this.requestBody))
                        : undefined,
                    ignoreAPIErrors: true,
                });
            } catch (e) {
                this.rejection = e.message;
                response = e.response;
                console.error(e);
            }
            this.responseCode = response ? response.status : "";
            this.responseBody = response ? response.data : "";
            this.waiting = false;
        },
    },
};
</script>

<style lang="scss" scoped>
.debug-http {
    padding-top: 1em;
}

.textarea.code {
    height: 100%;
    font-family: InconsolataGo, Inconsolata, monospace;
}

pre code {
    overflow-wrap: break-word;
}

.card {
    height: calc(100% - 3px);
}
</style>

