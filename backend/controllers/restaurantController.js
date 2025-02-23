const Restaurant = require("../model/restaurant");

// Fetch all restaurants
exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: "Error fetching restaurant data" });
  }
};

// Add new restaurant
exports.addRestaurant = async (req, res) => {
  const {
    name,
    address,
    cuisine,
    timings,
    opens,
    closes,
    popularDishes,
    rating,
    googleRating,
    discount,
    origin,
    imageUrl,
    moreImages,
    menuImages,
    amenities,
    location,
    restaurantOwnerGmail,
    contactNumber,
    description,
    tablePrice,
  } = req.body;

  try {
    const newRestaurant = new Restaurant({
      name,
      address,
      cuisine,
      timings,
      opens,
      closes,
      popularDishes,
      rating,
      googleRating,
      discount,
      origin,
      imageUrl,
      moreImages,
      menuImages,
      amenities,
      location,
      restaurantOwnerGmail,
      contactNumber,
      description,
      tablePrice,
    });

    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error adding restaurant" });
  }
};

exports.getRestaurantById = async (req, res) => {
  const { id } = req.params;
  try {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: "Error fetching restaurant details" });
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const deletRestuarant = await Restaurant.findByIdAndDelete(id);

    if (!deletRestuarant) {
      return res.status(404).json({ message: "Restuarnat not found" });
    }

    res.status(200).json({ message: "Restaurnat deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete booking", error: error.message });
  }
};

exports.updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body; // Assuming the updates are sent in the request body
    const updateRestaurant = await Restaurant.findByIdAndUpdate(id, updates, { new: true });

    if (!updateRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json({
      message: "Restaurant updated successfully",
      restaurant: updateRestaurant
    });
  } catch (err) {
    console.error("Error on updating", err);
    res.status(500).json({ message: "Internal server error" });
  }
};