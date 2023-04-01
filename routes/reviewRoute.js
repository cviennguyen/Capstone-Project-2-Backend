const express = require("express");
const reviewController = require("../controllers/reviewController");

const router = express.Router();

router
  .route("/")
  .get(reviewController.getAllReview)
  .post(reviewController.createReview)
  .delete(reviewController.deleteReview);

router.route("/:id").delete(reviewController.deleteReview);

module.exports = router;
