const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const cors = require('cors');
const morgan = require('morgan');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Use built-in body parser
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Log HTTP requests

// Routes
app.use("/app/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Server is running successfully!");
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
