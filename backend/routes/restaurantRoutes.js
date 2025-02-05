const express = require("express");
const router = express.Router();
const {
  getAllRestaurants,
  addRestaurant,
  getRestaurantById,
  deleteRestaurant,
  // putRestaurant,
} = require("../controllers/restaurantController");

router.post("/", addRestaurant);
router.get("/", getAllRestaurants);
router.get("/:id", getRestaurantById); // Route to fetch a restaurant by ID
router.delete("/:id", deleteRestaurant);
// router.put("/:id", putRestaurant);

module.exports = router;
