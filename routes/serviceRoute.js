const express = require("express");
const serviceController = require("../controllers/serviceController");
const authController = require("../controllers/authController");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const favoriteController = require("../controllers/favoriteController");
<<<<<<< HEAD
=======

>>>>>>> 30c05cc2b48c3eefca678cceaa2abe7196dd4bb1
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
<<<<<<< HEAD
  .delete(authController.protect, serviceController.deleteService);
=======
  .delete(
    authController.protect,
    authController.restrictTo("admin", "serviceProvider"),
    serviceController.deleteService
  );
>>>>>>> 30c05cc2b48c3eefca678cceaa2abe7196dd4bb1

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
