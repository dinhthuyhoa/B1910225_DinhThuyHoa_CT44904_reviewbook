// Import BookService
const BookService = require("../services/book.service");
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
  try {
    const bookService = new BookService(MongoDB.client);
    const document = await bookService.createBook(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "Đã xảy ra lỗi trong quá trình tạo sách!" + error)
    );
  }
};

// findBookAll: tìm tất cả book
exports.findBookAll = async (req, res, next) => {
  let documents = [];

  try {
    const bookService = new BookService(MongoDB.client);
    const { title } = req.query;
    if (title) {
      documents = await bookService.findBookByTitle(title);
    } else {
      documents = await bookService.find({});
    }
  } catch (error) {
    return next(
      new ApiError(500, "Đã xảy ra lỗi trong quá trình tìm sách!")
    );
  }
  return res.send(documents);
};

// findBookById: tìm kiếm một Book cụ thể trong Book collection bằng id.
exports.findBookById = async (req, res, next) => {
  let documents = [];
  try {
    const bookService = new BookService(MongoDB.client);
    const document = await bookService.findBookById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy sách!"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Đã xãy ra lỗi trong quá trình tìm sách với id=${req.params.id}`)
    );
  }
};

// updateBookById: cập nhật một Book cụ thể trong Book collection bằng id.
exports.updateBookById = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Dữ liệu cập nhật không thể bỏ trống!"));
  }

  try {
    const bookService = new BookService(MongoDB.client);
    const document = await bookService.updateBookById(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy sách!"));
    }
    return res.send({ message: "Thông tin được cập nhật thành công!" });
  } catch (error) {
    return next(
      new ApiError(500, `Cập nhật không thành công với id=${req.params.id}`)
    );
  }
};

// deleteBookById: xóa một Book cụ thể khỏi Book collection bằng id.
exports.deleteBookById = async (req, res, next) => {
  try {
    const bookService = new BookService(MongoDB.client);
    const document = await bookService.deleteBookById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy sách!"));
    }
    return res.send({ message: "Xóa sách thành công!" });
  } catch (error) {
    return next(
      new ApiError(500, `Không thể xóa sách với id=${req.params.id}`)
    );
  }
};



