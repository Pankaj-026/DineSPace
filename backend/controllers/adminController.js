const Booking = require("../model/bookings");
const User = require("../model/user"); // Assuming you have a User model
const Restaurant = require("../model/restaurant"); // Assuming you have a Restaurant model


exports.adminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalRestaurants = await Restaurant.countDocuments();
    const totalBookings = await Booking.countDocuments();

    // Count active users who made bookings in the last 30 days
    const activeUsers = await Booking.distinct("userId", {
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    });

    res.json({
      totalUsers,
      totalRestaurants,
      totalBookings,
      activeUsers: activeUsers.length,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
