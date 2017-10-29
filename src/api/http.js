/* eslint-disable no-param-reassign */

import axios from "axios";
import hawk from "hawk";
import { hawkAlgo, baseURL } from "@/config";

const credentials = {
    algorithm: hawkAlgo,
    get id() {
        return localStorage.getItem("id");
    },
    get key() {
        return localStorage.getItem("key");
    },
};

function interceptRequest(config) {
    if (!config.noHawk) {
        const hawkHeader = hawk.client.header(
            config.url,
            config.method,
            {
                credentials: { ...credentials },
            });
        config.headers.Authorization = hawkHeader.field;
        config.hawk = hawkHeader;
    }
    return config;
}

function interceptResponse(response) {
    const isValid = response.config.hawk ? hawk.client.authenticate(response.request, credentials,
        response.config.hawk.artifacts, {
            payload: response.data,
        }) : true;
    if (!isValid) {
        throw new Error("Server authentication failed.");
    } else if (!response.config.ignoreAPIErrors
        && response.data.errors
        && response.data.errors.length > 0) {
        throw new Error(JSON.stringify(response.data.errors));
    }
    return response;
}

export default function newInstance() {
    const instance = axios.create({
        baseURL,
        headers: {
            "X-NodeMC-Frontend": "NodeMC Dashboard v6",
        },
    });
    instance.interceptors.request.use(interceptRequest);
    instance.interceptors.response.use(interceptResponse);
    return instance;
}

export function parseError(error) {
    let errors;
    let msg = "";
    try {
        errors = JSON.parse(error.message);
    } catch (e) {
        errors = [{ ...error }];
    }
    errors.forEach((e) => {
        msg = msg + (msg ? ", " : "") + e.message + (e.code ? ` (${e.code})` : "");
    });
    return msg;
}
