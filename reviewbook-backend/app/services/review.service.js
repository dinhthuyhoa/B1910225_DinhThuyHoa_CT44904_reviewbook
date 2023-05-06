const { ObjectId } = require("mongodb");

class ReviewService {

  constructor(client) {
    this.Review = client.db().collection("reviews");
  }

  extractReviewData(payload) {
    const review = {
      title: payload.title,
      content: payload.content,
      author: payload.author,
      user_id: payload.user_id,
      book_id: payload.book_id,
      date: payload.date
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

  async find() {
    const pipeline = [
      // Lookup book title from books collection
      {
        $lookup: {
          from: "books",
          localField: "book_id",
          foreignField: "_id",
          as: "book",
        },
      },
      // Project the fields to return
      {
        $project: {
          _id: 1,
          title: 1,
          content: 1,
          author: 1,
          user_id: 1,
          book_id: 1,
          date: 1,
          book_title: { $arrayElemAt: ["$book.title", 0] },
        },
      },
    ];

    const result = await this.Review.aggregate(pipeline).toArray();
    return result;
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
