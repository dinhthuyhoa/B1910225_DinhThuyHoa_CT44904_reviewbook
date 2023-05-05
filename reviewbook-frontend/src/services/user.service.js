import createApiClient from "./api.service";

class UserService {
    constructor(baseUrl = "/api/users") {
        this.api = createApiClient(baseUrl);
    }
    async getUserAll() {
        return (await this.api.get("/")).data;
    }
    async createUser(data) {
        return (await this.api.post("/", data)).data;
    }
    async findUserById(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async updateUserById(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async deleteUserById(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}

export default new UserService();