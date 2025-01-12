const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const cors = require("cors");
const morgan = require("morgan");

dotenv.config();
connectDB();

const app = express();



// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/app/users", userRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/img" , uploadRoutes);


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
