// Import ReviewService
const ReviewService = require("../services/review.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Incorrect file");
    error.code = "INCORRECT_FILETYPE";
    return cb(error, false);
  }

  cb(null, true);
};

const upload = multer({
  dest: './public/images/reviews',
  fileFilter,
  limits: {
    fileSize: 5000000
  }
}).single('image');

exports.createReview = async (req, res, next) => {
  // Handle file upload
  upload(req, res, async (err) => {
    try {
      const reviewService = new ReviewService(MongoDB.client);

      // Create review document
      const document = await reviewService.createReview({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        user_id: req.body.user_id,
        book_id: req.body.book_id,
        date: req.body.date
      });

      return res.send(document);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Đã xảy ra lỗi trong quá trình tạo review!",
      });
    }
  });
};


// findReviewAll: tìm tất cả review
exports.findReviewAll = async (req, res, next) => {
  let documents = [];

  try {
    const reviewService = new ReviewService(MongoDB.client);
    const { title } = req.query;
    if (title) {
      documents = await reviewService.findReviewByTitle(title);
    } else {
      documents = await reviewService.find();
    }
  } catch (error) {
    return next(
      new ApiError(500, "Đã xảy ra lỗi trong quá trình tìm review!")
    );
  }
  return res.send(documents);
};

// findReviewById: tìm kiếm một Review cụ thể trong Review collection bằng id.
exports.findReviewById = async (req, res, next) => {
  let documents = [];
  try {
    const reviewService = new ReviewService(MongoDB.client);
    const document = await reviewService.findReviewById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy đánh giá!"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Đã xãy ra lỗi trong quá trình tìm đánh giá với id=${req.params.id}`)
    );
  }
};
// updateReviewById: cập nhật một Review cụ thể trong Review collection bằng id.
exports.updateReviewById = async (req, res, next) => {
  // Handle file upload
  upload(req, res, async (err) => {

    if (Object.keys(req.body).length === 0) {
      return next(new ApiError(400, "Dữ liệu cập nhật không thể bỏ trống!"));
    }

    try {
      const reviewService = new ReviewService(MongoDB.client);

      let updateData = {};

      // Add other fields to update data
      updateData = { ...updateData, ...req.body };

      const document = await reviewService.updateReviewById(req.params.id, updateData);

      if (!document) {
        return next(new ApiError(404, "Không tìm thấy đánh giá!"));
      }

      return res.send({ message: "Thông tin được cập nhật thành công!" });
    } catch (error) {
      console.error(error);
      return next(
        new ApiError(500, `Cập nhật không thành công với id=${req.params.id}`)
      );
    }
  });
};

// deleteReviewById: xóa một Review cụ thể khỏi Review collection bằng id.
exports.deleteReviewById = async (req, res, next) => {
  try {
    const reviewService = new ReviewService(MongoDB.client);
    const document = await reviewService.deleteReviewById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy đánh giá!"));
    }
    return res.send({ message: "Xóa đánh giá thành công!" });
  } catch (error) {
    return next(
      new ApiError(500, `Không thể xóa đánh giá với id=${req.params.id}`)
    );
  }
};