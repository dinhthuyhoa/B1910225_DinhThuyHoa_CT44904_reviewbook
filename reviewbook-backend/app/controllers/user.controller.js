// Import UserService 
const UserService = require("../services/user.service");
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
  dest: './public/images/users',
  fileFilter,
  limits: {
    fileSize: 5000000
  }
}).single('avatar');

exports.createUser = async (req, res, next) => {
  // Handle file upload
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: "Không thể tải lên file!" });
    }
    try {
      const userService = new UserService(MongoDB.client);

      // Get original file extension
      const fileExtension = path.extname(req.file.originalname);

      // Rename file
      const oldPath = req.file.path;
      const newPath = `${req.file.destination}/${req.file.filename}${fileExtension}`;
      fs.renameSync(oldPath, newPath);

      // Create user document
      const document = await userService.createUser({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        role: req.body.role,
        avatar: `http://localhost:3000/images/users/${req.file.filename}${fileExtension}`
      });

      return res.send(document);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Đã xảy ra lỗi trong quá trình tạo người dùng!",
      });
    }
  });
};

// findUserAll: tìm tất cả user
exports.findUserAll = async (req, res, next) => {
  let documents = [];

  try {
    const userService = new UserService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await userService.findUserByName(name);
    } else {
      documents = await userService.find({});
    }
  } catch (error) {
    return next(
      new ApiError(500, "Đã xảy ra lỗi trong quá trình tạo tài khoản!")
    );
  }
  return res.send(documents);
};

// findUserById: tìm kiếm một user cụ thể trong User collection bằng id.
exports.findUserById = async (req, res, next) => {
  let documents = [];
  try {
    const userService = new UserService(MongoDB.client);
    const document = await userService.findUserById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy người dùng!"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Đã xãy ra lỗi trong quá trình tìm người dùng với id=${req.params.id}`)
    );
  }
};

// updateUserById: cập nhật một user cụ thể trong User collection bằng id.
exports.updateUserById = async (req, res, next) => {
  // Handle file upload
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: "Không thể tải lên file!" });
    }

    if (Object.keys(req.body).length === 0 && !req.file) {
      return next(new ApiError(400, "Dữ liệu cập nhật không thể bỏ trống!"));
    }

    try {
      const userService = new UserService(MongoDB.client);

      let updateData = {};
      if (req.file) {
        // Get original file extension
        const fileExtension = path.extname(req.file.originalname);

        // Rename file
        const oldPath = req.file.path;
        const newPath = `${req.file.destination}/${req.file.filename}${fileExtension}`;
        fs.renameSync(oldPath, newPath);

        // Add image URL to update data
        updateData.avatar = `http://localhost:3000/images/users/${req.file.filename}${fileExtension}`;
      }

      // Add other fields to update data
      updateData = { ...updateData, ...req.body };

      const document = await userService.updateUserById(req.params.id, updateData);

      if (!document) {
        return next(new ApiError(404, "Không tìm thấy người dùng!"));
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


// deleteUserById: xóa một user cụ thể khỏi User collection bằng id.
exports.deleteUserById = async (req, res, next) => {
  try {
    const userService = new UserService(MongoDB.client);
    const document = await userService.deleteUserById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy tài khoản!"));
    }
    return res.send({ message: "Xóa tài khoản thành công!" });
  } catch (error) {
    return next(
      new ApiError(500, `Không thể xóa tài khoản với id=${req.params.id}`)
    );
  }
};



