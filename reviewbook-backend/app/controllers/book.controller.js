// Import UserService
const BookService = require("../services/book.service");
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
  dest: './public/images/books',
  fileFilter,
  limits: {
    fileSize: 5000000
  }
}).single('image');

exports.createBook = async (req, res, next) => {
  // Handle file upload
  upload(req, res, async (err) => {

    if (err) {
      return res.status(400).json({ error: "Không thể tải lên file!" });
    }
    try {
      const bookService = new BookService(MongoDB.client);

      // Get original file extension
      const fileExtension = path.extname(req.file.originalname);

      // Rename file
      const oldPath = req.file.path;
      const newPath = `${req.file.destination}/${req.file.filename}${fileExtension}`;
      fs.renameSync(oldPath, newPath);

      // Create book document
      const document = await bookService.createBook({
        title: req.body.title,
        author: req.body.author,
        date: req.body.date,
        image: `http://localhost:3000/images/books/${req.file.filename}${fileExtension}`
      });

      return res.send(document);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Đã xảy ra lỗi trong quá trình tạo sách!",
      });
    }
  });
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
  // Handle file upload
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: "Không thể tải lên file!" });
    }

    if (Object.keys(req.body).length === 0 && !req.file) {
      return next(new ApiError(400, "Dữ liệu cập nhật không thể bỏ trống!"));
    }

    try {
      const bookService = new BookService(MongoDB.client);

      let updateData = {};
      if (req.file) {
        // Get original file extension
        const fileExtension = path.extname(req.file.originalname);

        // Rename file
        const oldPath = req.file.path;
        const newPath = `${req.file.destination}/${req.file.filename}${fileExtension}`;
        fs.renameSync(oldPath, newPath);

        // Add image URL to update data
        updateData.image = `http://localhost:3000/images/books/${req.file.filename}${fileExtension}`;
      }

      // Add other fields to update data
      updateData = { ...updateData, ...req.body };

      const document = await bookService.updateBookById(req.params.id, updateData);

      if (!document) {
        return next(new ApiError(404, "Không tìm thấy sách!"));
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



