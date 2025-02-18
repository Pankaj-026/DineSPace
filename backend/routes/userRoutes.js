const express = require("express");
const {
  signup,
  verifyEmail,
  login,
  resSignup,
  findUserById,
  adminFind,
  resLogin,
  updateLoginStatus,
} = require("../controllers/userController");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/verify-email/:token", verifyEmail);
router.get("/user/:id", findUserById);
// Get all users
router.get("/", adminFind);
// Restaurant Signup Controller
router.post("/restaurant/signup", resSignup);
router.post("/restaurant/login", resLogin);
router.post("/update-login-status", updateLoginStatus);

module.exports = router;
