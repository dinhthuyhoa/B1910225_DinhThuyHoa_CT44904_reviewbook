
const { ObjectId } = require("mongodb");

class AuthService {

    constructor(client) {
        this.User = client.db().collection("users");
    }

    extractUserData(payload) {
        const user = {
            avatar: payload.avatar,
            email: payload.email,
            phone: payload.phone,
            password: payload.password,
            name: payload.name,
            role: payload.role,
        };

        // Remove undefined fields
        Object.keys(user).forEach(
            (key) => user[key] === undefined && delete user[key]
        );
        return user;
    }

    async login(email, password) {
        const user = await this.find({
            email: { $regex: new RegExp(email), $options: "i" },
            password: { $regex: new RegExp(password), $options: "i" },
        });
        if (user.length === 0) {
            throw new Error("Sai tài khoản hoặc mật khẩu");
        }
        return user[0];
    }



    async register(payload) {
        const user = this.extractUserData(payload);
        const existingUser = await this.find({ email: user.email });
        const existingUser2 = await this.find({ phone: user.phone });

        if (existingUser.length > 0) {
            throw new Error("Email đã tồn tại!");
        }
        if (existingUser2.length > 0) {
            throw new Error("Phone đã tồn tại!");
        }

        const result = await this.User.insertOne(user);
        return result.insertedId;
    }

    async find(filter) {
        const result = await this.User.find(filter).toArray();
        return result;
    }

}

module.exports = AuthService;
