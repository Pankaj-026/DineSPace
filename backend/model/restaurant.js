const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String },
    address: { type: String },
    cuisine: { type: [String] },
    timings: {
      open: { type: Number },
      close: { type: Number },
    },
    opens: { type: Number },
    closes: { type: Number },
    popularDishes: { type: [String] },
    rating: { type: Number },
    googleRating: { type: Number },
    discount: { type: Number },
    origin: { type: String },
    imageUrl: { type: String },
    moreImages: { type: [String] },
    menuImages: { type: [String] },
    amenities: { type: [String] },
    location: { type: String },
    restaurantOwnerGmail: { type: String },
    contactNumber: { type: String },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
