const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const cloudinary = require("../utils/cloudinary");
const upload = require("../middleware/multer");

// Ensure the uploads folder exists
const uploadPath = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

router.post(
  "/upload",
  (req, res, next) => {
    // Handle image upload with multer
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
      // Ensure that the file is received
      if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
      }

      // Check if the file exists at the given path
      const filePath = req.file.path;
      if (!fs.existsSync(filePath)) {
        return res.status(400).json({ success: false, message: "File not found at path" });
      }

      // Upload the file to Cloudinary
      const result = await cloudinary.uploader.upload(filePath, {
        folder: "restaurant_images", // Specify folder in Cloudinary
      });

      // Send success response with Cloudinary URL
      res.status(200).json({
        success: true,
        message: "File uploaded successfully!",
        data: result,
      });
    } catch (err) {
      // Log and return error if upload fails
      res.status(500).json({
        success: false,
        message: "Error uploading to Cloudinary",
      });
      console.error("Cloudinary Upload Error:", err);
    } finally {
      // Clean up the file after the upload
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
    }
  }
);

module.exports = router;
