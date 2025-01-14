const express = require('express');
const router = express.Router();
const { getAllRestaurants, addRestaurant, getRestaurantById } = require('../controllers/restaurantController');

router.post('/', addRestaurant);
router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById); // Route to fetch a restaurant by ID

module.exports = router;