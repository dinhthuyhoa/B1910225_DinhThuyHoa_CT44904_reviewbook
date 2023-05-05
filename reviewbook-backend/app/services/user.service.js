//const User = require('../models/user.model');

const { ObjectId } = require("mongodb");

class UserService {

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

  async createUser(payload) {
    const user = this.extractUserData(payload);
    const result = await this.User.findOneAndUpdate(
      user,
      { $set: {} },
      { returnDocument: "after", upsert: true }
    );
    return result.value;
  }

  async find(filter) {
    const cursor = await this.User.find(filter);
    return await cursor.toArray();
  }

  async findUserById(id) {
    return await this.User.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }
  async findUserByName(username) {
    return await this.find({
      username: { $regex: new RegExp(username), $options: "i" },
    });
  }

  async updateUserById(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractUser(payload);
    const result = await this.User.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  }

  async deleteUserById(id) {
    const result = await this.User.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }
}

module.exports = UserService;
