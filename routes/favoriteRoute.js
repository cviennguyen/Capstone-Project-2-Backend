const express = require("express");
const favoriteController = require("../controllers/favoriteController");
const authController = require("../controllers/authController");
const router = express.Router();

router
  .route("/")
  .get(authController.protect, favoriteController.getAllFavorite)
  .post(favoriteController.addFavorite);

router.route("/:id").delete(favoriteController.deleteFavorite);
module.exports = router;
