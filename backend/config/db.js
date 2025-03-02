const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://pankajgupta1063:Pankaj026@cluster0.ne6kq.mongodb.net/DineSPace?retryWrites=true&w=majority&appName=Cluster0" || process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
