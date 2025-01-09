const mongoose = require("mongoose");

const Restaurant = new mongoose.Schema({
  name: String,
  address: String,
  rating: Number,
  discount: Number,
  origin: String,
  imageUrl: String,
});


module.exports = mongoose.model('User', Restaurant);