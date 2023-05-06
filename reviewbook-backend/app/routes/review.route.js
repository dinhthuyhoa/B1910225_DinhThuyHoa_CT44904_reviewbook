const express = require('express');
const reviewController = require('../controllers/review.controller');
const router = express.Router();

router.route("/")
    .get(reviewController.findReviewAll)
    .post(reviewController.createReview);


router.route("/:id")
    // .get(reviewController.findReviewByName)
    .get(reviewController.findReviewById)
    .put(reviewController.updateReviewById)
    .delete(reviewController.deleteReviewById);

module.exports = router;

