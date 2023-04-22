// Import UserService
const AdminService = require("../services/admin.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.createAdmin = async (req, res, next) => {
  if (!req.body.username) {
    return next(new ApiError(400, "Username không thể bỏ trống!"));
  }
  try {
    const adminService = new AdminService(MongoDB.client);
    const document = await adminService.createAdmin(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "Đã xảy ra lỗi trong quá trình tạo tài khoản!")
    );
  }
};

exports.findAdminAll = async (req, res, next) => {
  let documents = [];

  try {
      const adminService = new AdminService(MongoDB.client);
      const {username} = req.query;
      if (username) {
          documents = await adminService.findAdminByName(username);
      } else {
          documents = await adminService.find({});
      }
  } catch (error) {
      return next(
          new ApiError(500, "Đã xảy ra lỗi trong quá trình tạo tài khoản!")
      );
  }
  return res.send(documents);
};

exports.findAdminById = async (req, res, next) => {
  let documents = [];
  try {
      const adminService = new AdminService(MongoDB.client);
      const document = await adminService.findAdminById(req.params.id);
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


exports.updateAdminById = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
      return next(new ApiError(400, "Dữ liệu cập nhật không thể bỏ trống!"));
  }

  try {
      const adminService = new AdminService(MongoDB.client);
      const document = await adminService.updateAdminById(req.params.id, req.body);
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




