import axios from "axios";

export default {
    async getToken(username, password) {
        const { data } = await axios.post("http://localhost:8081/v2/auth/token", {
            username,
            password,
        });
        if (data.errors && data.errors.length > 0) {
            throw new Error(data.errors[0].message);
        }
        return data.data.token;
    },
};
