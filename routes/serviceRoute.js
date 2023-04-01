const express = require("express");
const serviceController = require("../controllers/serviceController");
const authController = require("../controllers/authController");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const favoriteController = require("../controllers/favoriteController");
router
  .route("/")
  .get(authController.protect, serviceController.getAllServices)
  .post(serviceController.createService);

router
  .route("/:id")
  .get(authController.protect, serviceController.getService)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "serviceProvider"),
    serviceController.updateService
  )
  .delete(authController.protect, serviceController.deleteService);

router
  .route("/:serviceId/review")
  .post(authController.protect, reviewController.createReview);

router
  .route("/:serviceId/favorite")
  .post(authController.protect, favoriteController.addFavorite);

router
  .route("/:serviceId/deleteFavorite")
  .delete(authController.protect, favoriteController.deleteFavorite);

module.exports = router;
