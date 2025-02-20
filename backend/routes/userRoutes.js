const express = require("express");
const {
  signup,
  verifyEmail,
  login,
  resSignup,
  findUserById,
  adminFind,
  updateName,
  updateProfilePic,
  resLogin,
} = require("../controllers/userController");
const router = express.Router();
// const multer = require("multer");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
// const upload = multer({ dest: "uploads/" });
const protect  = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.get("/verify-email/:token", verifyEmail);
router.get("/user/:id", findUserById);
// Get all users
router.get("/", adminFind);
// Restaurant Signup Controller
router.post("/restaurant/signup", resSignup);
router.post("/restaurant/login", resLogin);
// router.post("/update-login-status", updateLoginStatus);

router.put("/update-name", authMiddleware, updateName);
router.post("/update-profile-pic", protect, upload.single("profilePic"), updateProfilePic);

module.exports = router;
