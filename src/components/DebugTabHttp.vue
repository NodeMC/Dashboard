<template>
    <div class="debug-http container">
        <b-notification :active="!!rejection" type="is-danger" @close="rejection = null">{{rejection}}</b-notification>
        <b-field>
            <b-select v-model="method" placeholder="Method">
                <option>GET</option>
                <option>PUT</option>
                <option>POST</option>
                <option>PATCH</option>
                <option>DELETE</option>
            </b-select>
            <b-input v-model="url" placeholder="URL" expanded></b-input>
            <p class="control"><button class="button is-primary" @click="request">Go</button></p>
        </b-field>
        <p v-if="responseCode">Response code: <code>{{responseCode}}</code></p>
        <p v-if="responseBody">Response body: <pre><code>{{responseBody}}</code></pre></p>
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
        };
    },
    methods: {
        async request() {
            if (!(this.method && this.url)) return;
            let response;
            try {
                response = await instance({
                    url: this.url,
                    method: this.method,
                    data: this.requestBody,
                    ignoreAPIErrors: true,
                });
            } catch (e) {
                this.rejection = e.message;
                response = e.response;
            }
            this.responseCode = response ? response.status : "";
            this.responseBody = response ? response.data : "";
        },
    },
};
</script>

<style>
.debug-http {
    padding-top: 1em;
}
</style>

