const Restaurant = require('../model/restaurant');

// Fetch all restaurants
exports.getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching restaurant data' });
    }
};

// Add new restaurant
exports.addRestaurant = async (req, res) => {
    const { name, address, rating, discount, origin, imageUrl } = req.body;
    try {
        const newRestaurant = new Restaurant({ name, address, rating, discount, origin, imageUrl });
        await newRestaurant.save();
        res.status(201).json(newRestaurant);
    } catch (error) {
        res.status(500).json({ error: 'Error adding restaurant' });
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

