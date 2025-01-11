const express = require('express');
const router = express.Router();
const { getAllRestaurants, addRestaurant } = require('../controllers/restaurantController');

router.get('/', getAllRestaurants);
router.post('/', addRestaurant);

module.exports = router;