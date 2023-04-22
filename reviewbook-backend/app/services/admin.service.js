//const User = require('../models/user.model');

const { ObjectId } = require("mongodb");

class adminService {
  constructor(client) {
    this.admins = client.db().collection("admins");
  }
  extractAdmin(payload) {
    const admin = {
      username: payload.username,
      password: payload.password,
      name: payload.name,
      address: payload.address,
      role: payload.role,
      type:payload.type,
    };
    // Remove undefined fields
    Object.keys(admin).forEach(
      (key) => admin[key] === undefined && delete admin[key]
    );
    return admin;
  }
  async createAdmin(payload) {
    const admin = this.extractAdmin(payload);
    const result = await this.admins.findOneAndUpdate(
        admin,
      { $set: { type: admin.type === true } },
      { returnDocument: "after", upsert: true }
    );
    return result.value;
  }
  async find(filter) {
    const cursor = await this.admins.find(filter);
    return await cursor.toArray();
}
  async findAdminById(id) {
    return await this.admins.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }
  async findAdminByName(username) {
    return await this.find({
        username: { $regex: new RegExp(username), $options: "i"},
    });
}

  async updateAdminById(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractAdmin(payload);
    const result = await this.admins.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  }

  async deleteAdminById(id) {
    const result = await this.admins.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }
}

module.exports = adminService;
