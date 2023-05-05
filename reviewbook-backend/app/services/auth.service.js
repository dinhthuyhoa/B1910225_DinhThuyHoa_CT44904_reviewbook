
const { ObjectId } = require("mongodb");

class AuthService {

    constructor(client) {
        this.User = client.db().collection("users");
    }

    extractUserData(payload) {
        const user = {
            email: payload.email,
            phone: payload.phone,
            password: payload.password,
            name: payload.name,
            address: payload.address,
            role: payload.role,
            status: payload.status
        };

        // Remove undefined fields
        Object.keys(user).forEach(
            (key) => user[key] === undefined && delete user[key]
        );
        return user;
    }

    async login(username, password) {
        const login = await this.find({
            email: { $regex: new RegExp(username), $options: "i" },
            password: { $regex: new RegExp(password), $options: "i" },
        });
        return login;
    }

    async find(filter) {
        const cursor = await this.User.find(filter);
        return await cursor.toArray();
    }

}

module.exports = AuthService;
