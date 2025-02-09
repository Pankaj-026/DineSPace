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
router.get("/:id", getRestaurantById); 
router.delete("/:id", deleteRestaurant);
router.put("/:id", updateRestaurant);


module.exports = router;
