const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.route("/")
    .get(userController.findUserAll)
    .post(userController.createUser)


router.route("/:id")
    // .get(userController.findUserByName)
    .get(userController.findUserById)
    .put(userController.updateUserById)
    .delete(userController.deleteUserById);

module.exports = router;

