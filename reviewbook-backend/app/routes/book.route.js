const express = require('express');
const bookController = require('../controllers/book.controller');
const router = express.Router();

router.route("/")
    .get(bookController.findBookAll)
    .post(bookController.createBook);


router.route("/:id")
    // .get(bookController.findBookByName)
    .get(bookController.findBookById)
    .put(bookController.updateBookById)
    .delete(bookController.deleteBookById);

module.exports = router;

