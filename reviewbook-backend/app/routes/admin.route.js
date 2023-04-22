const express = require('express');
const adminController = require('../controllers/admin.controller');
const router = express.Router();

router.route("/")
    .get(adminController.findAdminAll)
    .post(adminController.createAdmin)


router.route("/:id")
    // .get(userController.findUserByName)
    .get(adminController.findAdminById)
    .put(adminController.updateAdminById)

module.exports = router;

