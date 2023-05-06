const AuthService = require("../services/auth.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");


exports.login = async (req, res, next) => {
    if (!req.body?.username) {
        return next(new ApiError(400, "Username không được bỏ trống !!!"));
    }
    if (!req.body?.password) {
        return next(new ApiError(400, "Password không được bỏ trống !!!"));
    }

    try {
        const authService = new AuthService(MongoDB.client);
        const user = await authService.login(req.body?.username, req.body?.password);

        return res.send(user);

    } catch (error) {
        return next(
            new ApiError(401, error.message)
        );
    }
};



exports.register = async (req, res, next) => {
    if (!req.body?.email) {
        return next(new ApiError(400, "Email không được bỏ trống!"));
    }
    if (!req.body?.phone) {
        return next(new ApiError(400, "Phone không được bỏ trống!"));
    }
    if (!req.body?.password) {
        return next(new ApiError(400, "Password không được bỏ trống!"));
    }

    try {
        const authService = new AuthService(MongoDB.client);
        const userId = await authService.register(req.body);

        return res.status(201).json({
            message: "User đã được tạo thành công!",
            userId: userId,
        });
    } catch (error) {
        return next(new ApiError(500, error.message));
    }
};
