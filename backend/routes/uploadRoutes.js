const express = require("express");
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../middleware/multer");

router.post(
  "/upload",
  (req, res, next) => {
    upload.single("image")(req, res, function (err) {
      if (err) {
        console.error("Multer Error:", err);
        return res.status(400).json({ success: false, message: err.message });
      }
      next();
    });
  },
  async (req, res) => {
    try {
      console.log("File received:", req.file);
      const result = await cloudinary.uploader.upload(req.file.path);
      res.status(200).json({
        success: true,
        message: "Uploaded!",
        data: result,
      });
    } catch (err) {
      console.error("Cloudinary Error:", err);
      console.log("Cloudinary Config:", cloudinary.config());
      console.log("Received File:", req.file);

      res.status(500).json({
        success: false,
        message: "Error uploading to Cloudinary",
      });
    }
  }
);

module.exports = router;
