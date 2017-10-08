/* eslint-disable no-param-reassign */

import axios from "axios";
import hawk from "hawk";
import { hawkAlgo, baseURL } from "../config";

const credentials = {
    algo: hawkAlgo,
    get id() {
        return localStorage.getItem("id");
    },
    get key() {
        return localStorage.getItem("key");
    },
};

function interceptRequest(config) {
    const hawkHeader = hawk.client.header(config.baseURL + config.url,
        config.method, { credentials, payload: config.data });
    config.headers.Authorization = hawkHeader.field;
    config.hawk = hawkHeader;
    return config;
}

function interceptResponse(response) {
    const isValid = hawk.client.authenticate(response, credentials,
        response.config.hawk.artifacts, {
            payload: response.data,
        });
    if (!isValid) {
        throw new Error("Server authentication failed.");
    } else if (response.data.errors && response.data.errors.length > 0) {
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
