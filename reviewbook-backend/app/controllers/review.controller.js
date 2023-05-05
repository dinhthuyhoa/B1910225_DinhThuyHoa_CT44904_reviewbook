// Import ReviewService
const ReviewService = require("../services/review.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

// createBook: tạo mới một book mới dựa trên dữ liệu được cung cấp trong yêu cầu và lưu nó vào book collection.
exports.createBook = async (req, res, next) => {
  if (!req.body?.title) {
    return next(new ApiError(400, "Title không được bỏ trống !!!"));
  }
  if (!req.body?.user_id) {
    return next(new ApiError(400, "Author không được bỏ trống !!!"));
  }
  if (!req.body?.book_id) {
    return next(new ApiError(400, "Book không được bỏ trống !!!"));
  }
  if (!req.body?.content) {
    return next(new ApiError(400, "Content không được bỏ trống !!!"));
  }
  try {
    const reviewService = new ReviewService(MongoDB.client);
    const document = await reviewService.createReview(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "Đã xảy ra lỗi trong quá trình tạo review!" + error)
    );
  }
};

// findReviewAll: tìm tất cả Review
exports.findReviewAll = async (req, res, next) => {
  let documents = [];

  try {
    const reviewService = new ReviewService(MongoDB.client);
    const { title } = req.query;
    if (title) {
      documents = await reviewService.findReviewByTitle(title);
    } else {
      documents = await reviewService.find({});
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
      return next(new ApiError(404, "Không tìm thấy review!"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Đã xãy ra lỗi trong quá trình tìm review với id=${req.params.id}`)
    );
  }
};

// updateReviewById: cập nhật một Review cụ thể trong Review collection bằng id.
exports.updateReviewById = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Dữ liệu cập nhật không thể bỏ trống!"));
  }

  try {
    const reviewService = new ReviewService(MongoDB.client);
    const document = await reviewService.updateReviewById(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy review!"));
    }
    return res.send({ message: "Thông tin được cập nhật thành công!" });
  } catch (error) {
    return next(
      new ApiError(500, `Cập nhật không thành công với id=${req.params.id}`)
    );
  }
};

// deleteReviewById: xóa một Review cụ thể khỏi Review collection bằng id.
exports.deleteReviewById = async (req, res, next) => {
  try {
    const reviewService = new ReviewService(MongoDB.client);
    const document = await reviewService.deleteReviewById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy review!"));
    }
    return res.send({ message: "Xóa review thành công!" });
  } catch (error) {
    return next(
      new ApiError(500, `Không thể xóa review với id=${req.params.id}`)
    );
  }
};



