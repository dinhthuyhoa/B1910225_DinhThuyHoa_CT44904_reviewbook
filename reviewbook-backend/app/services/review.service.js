//const User = require('../models/user.model');

const { ObjectId } = require("mongodb");

class ReviewService {

  constructor(client) {
    this.Review = client.db().collection("reviews");
  }

  extractReviewData(payload) {
    const review = {
      email: payload.email,
      phone: payload.phone,
      password: payload.password,
      name: payload.name,
      address: payload.address,
      role: payload.role,
      status: payload.status
    };

    // Remove undefined fields
    Object.keys(review).forEach(
      (key) => review[key] === undefined && delete review[key]
    );
    return review;
  }

  async createReview(payload) {
    const review = this.extractReviewData(payload);
    const result = await this.Review.findOneAndUpdate(
      review,
      { $set: {} },
      { returnDocument: "after", upsert: true }
    );
    return result.value;
  }

  async find(filter) {
    const cursor = await this.Review.find(filter);
    return await cursor.toArray();
  }

  async findReviewById(id) {
    return await this.Review.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }
  async findReviewByTitle(title) {
    return await this.find({
      title: { $regex: new RegExp(title), $options: "i" },
    });
  }

  async updateReviewById(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractReviewData(payload);
    const result = await this.Review.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  }

  async deleteReviewById(id) {
    const result = await this.Review.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }
}

module.exports = ReviewService;
