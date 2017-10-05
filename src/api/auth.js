import http from "./http";

const instance = http();

export default {
    async getToken(username, password) {
        const { data } = await instance.post("/v2/auth/token", {
            username,
            password,
        });
        if (data.errors && data.errors.length > 0) {
            throw new Error(data.errors[0].message);
        }
        return data.data.token;
    },
};
