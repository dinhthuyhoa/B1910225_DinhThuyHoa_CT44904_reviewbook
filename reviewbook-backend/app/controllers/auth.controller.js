const AuthService = require("../services/auth.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");



// findUserById: tìm kiếm một user cụ thể trong User collection bằng id.
exports.login = async (req, res, next) => {
    if (!req.body?.username) {
        return next(new ApiError(400, "Username không được bỏ trống !!!"));
    }
    if (!req.body?.password) {
        return next(new ApiError(400, "Password không được bỏ trống !!!"));
    }

    try {
        const authService = new AuthService(MongoDB.client);
        const checkLogin = await authService.login(req.body?.username, req.body?.password);

        if (checkLogin != false) {
            return res.send(checkLogin);
        } else {
            return res.send('Tài khoản hoặc mật khẩu sai');
        }

    } catch (error) {
        return next(
            new ApiError(500, `Đã xãy ra lỗi trong quá trình tìm người dùng với id=${req.params.id}`)
        );
    }
};



