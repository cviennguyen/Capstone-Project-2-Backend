const express = require("express");
const reviewController = require("../controllers/reviewController");

const router = express.Router();

router
  .route("/")
  .get(reviewController.getAllReview)
<<<<<<< HEAD
  .post(reviewController.createReview)
  .delete(reviewController.deleteReview);

router.route("/:id").delete(reviewController.deleteReview);
=======
  .post(reviewController.createReview);
>>>>>>> 30c05cc2b48c3eefca678cceaa2abe7196dd4bb1

module.exports = router;
