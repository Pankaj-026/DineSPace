const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const cors = require('cors');
const morgan = require('morgan');
// const multer = require('multer');
// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const Restaurant = require('./model/restaurant');

dotenv.config();
connectDB();

const app = express();



// Cloudinary Configuration
// cloudinary.config({
//   cloud_name: process.env.cloud_name, // Replace with your Cloudinary cloud name
//   api_key: process.env.api_key,       // Replace with your Cloudinary API key
//   api_secret: process.env.api_secret, // Replace with your Cloudinary API secret
// });

// Multer Storage for Cloudinary
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//       folder: 'restaurants', // Folder name in Cloudinary
//       allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed file formats
//   },
// });
// const upload = multer({ storage });

// Middleware
app.use(express.json()); // Use built-in body parser
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Log HTTP requests

// Routes
app.use("/app/users", userRoutes);
app.use('/api/restaurants', restaurantRoutes);

app.get("/", (req, res) => {
  console.log(req.body)
  res.send("Server is running successfully!");
  // res.status(200).json({ message: "Email verified successfully. You can now log in." });

});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
