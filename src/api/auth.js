import http from "./http";

const instance = http();

export default {
    async getToken(username, password) {
        const { data } = await instance.post("/v2/auth/token", {
            username,
            password,
        });
        return data.data.token;
    },
};
