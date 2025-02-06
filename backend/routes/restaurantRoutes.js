const express = require("express");
const router = express.Router();
const {
  getAllRestaurants,
  addRestaurant,
  getRestaurantById,
  deleteRestaurant,
  updateRestaurant,
} = require("../controllers/restaurantController");

router.post("/", addRestaurant);
router.get("/", getAllRestaurants);
router.get("/:id", getRestaurantById); // Route to fetch a restaurant by ID
router.delete("/:id", deleteRestaurant);
// to update the restaurant 
router.put("/:id", updateRestaurant);


module.exports = router;
