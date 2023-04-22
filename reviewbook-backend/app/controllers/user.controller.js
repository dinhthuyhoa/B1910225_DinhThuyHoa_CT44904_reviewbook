// Import UserService
const UserService = require("../services/user.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
// createUser: tạo mới một user mới dựa trên dữ liệu được cung cấp trong yêu cầu và lưu nó vào User collection.
exports.createUser = async (req, res, next) => {
  if (!req.body.username) {
    return next(new ApiError(400, "Username không thể bỏ trống!"));
  }
  try {
    const userService = new UserService(MongoDB.client);
    const document = await userService.createUser(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "Đã xảy ra lỗi trong quá trình tạo tài khoản!")
    );
  }
};
//
exports.findUserAll = async (req, res, next) => {
  let documents = [];

  try {
      const userService = new UserService(MongoDB.client);
      const {username} = req.query;
      if (username) {
          documents = await userService.findUserByName(username);
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
          new ApiError(500,`Đã xãy ra lỗi trong quá trình tìm người dùng với id=${req.params.id}`)
      );
  }
};

// updateUserById: cập nhật một user cụ thể trong User collection bằng id.
exports.updateUserById = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
      return next(new ApiError(400, "Dữ liệu cập nhật không thể bỏ trống!"));
  }

  try {
      const userService = new UserService(MongoDB.client);
      const document = await userService.updateUserById(req.params.id, req.body);
      if (!document) {
          return next(new ApiError(404, "Không tìm thấy tài khoản!"));
      } 
      return res.send({message: "Thông tin được cập nhật thành công!" });
  } catch (error) {
      return next(
          new ApiError(500,`Cập nhật không thành công với id=${req.params.id}`)
      );
  }
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
        new ApiError(500,`Không thể xóa tài khoản với id=${req.params.id}`)
    );
}
};



