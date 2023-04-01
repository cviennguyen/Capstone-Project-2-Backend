const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.patch("/updateMe", authController.protect, userController.updateMe);
router.get(
  "/me",
  authController.protect,
  userController.getMe,
  userController.getUser
);
router.route("/").get(authController.protect, userController.getAllUser);

router
  .route("/:id")
  .get(userController.getUser)
  .delete(userController.deleteUser);

module.exports = router;
