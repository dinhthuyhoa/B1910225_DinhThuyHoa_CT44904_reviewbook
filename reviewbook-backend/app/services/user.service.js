//const User = require('../models/user.model');

const { ObjectId } = require("mongodb");

class UserService {
  constructor(client) {
    this.users = client.db().collection("users");
  }
  extractUser(payload) {
    const user = {
      username: payload.username,
      password: payload.password,
      name: payload.name,
      address: payload.address,
      type:payload.type,
    };
    // Remove undefined fields
    Object.keys(user).forEach(
      (key) => user[key] === undefined && delete user[key]
    );
    return user;
  }
  async createUser(payload) {
    const user = this.extractUser(payload);
    const result = await this.users.findOneAndUpdate(
      user,
      { $set: { type: user.type === true } },
      { returnDocument: "after", upsert: true }
    );
    return result.value;
  }
  async find(filter) {
    const cursor = await this.users.find(filter);
    return await cursor.toArray();
}
  async findUserById(id) {
    return await this.users.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }
  async findUserByName(username) {
    return await this.find({
        username: { $regex: new RegExp(username), $options: "i"},
    });
}

  async updateUserById(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractUser(payload);
    const result = await this.users.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  }

  async deleteUserById(id) {
    const result = await this.users.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }
}

module.exports = UserService;
