import http from "./http";

const instance = http();

export default {
    async createUser(username, password) {
        const { data } = await instance.post("/v2/user", {
            username,
            password,
        }, {
            ignoreAPIErrors: true,
        });
        return data;
    },
};
