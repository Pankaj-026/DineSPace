const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  rating: { type: Number, required: true },
  discount: { type: Number, required: true },
  origin: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
