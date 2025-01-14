const Booking = require("../model/bookings");
const Users = require("../model/user"); // Assuming you have a User model
const Restaurant = require("../model/restaurant"); // Assuming you have a Restaurant model

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const {
      userId,
      restaurantId,
      bookingDate,
      bookingTime,
      numberOfGuests,
      phoneNumber,
      specialRequests,
    } = req.body;

    // Validate required fields
    if (
      !userId ||
      !restaurantId ||
      !bookingDate ||
      !bookingTime ||
      !numberOfGuests ||
      !phoneNumber
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled." });
    }

    // Fetch user name from User collection using userId
    const users = await Users.findById(userId);
    console.log(users);
    if (!users) {
      console.log(users);
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch restaurant name from Restaurant collection using restaurantId
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Create a new booking document
    const newBooking = new Booking({
      userId,
      userName: users.name, // Get user name from the user document
      restaurantId,
      restaurantName: restaurant.name, // Get restaurant name from the restaurant document
      bookingDate,
      bookingTime,
      numberOfGuests,
      phoneNumber,
      specialRequests,
    });

    // Save the booking
    await newBooking.save();
    console.log(newBooking);

    res.status(201).json({
      message: `Thank you ${newBooking.userName}! Your booking created successfully at ${newBooking.restaurantName}!`,
      booking: newBooking,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to create booking", error: error.message });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    // Fetch all bookings with populated user and restaurant details
    const bookings = await Booking.find()
      .populate("userId", "name email") // Populate user details
      .populate("restaurantId", "name address"); // Populate restaurant details

    // Log the retrieved bookings for debugging
    if (!bookings.length) {
      console.log("No bookings found.");
      return res.status(404).json({ message: "No bookings available." });
    }

    console.log("Bookings retrieved successfully:", bookings);
    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);

    res.status(500).json({
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("userId", "name email")
      .populate("restaurantId", "name address");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ booking });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch booking", error: error.message });
  }
};

// Update a booking
exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update booking", error: error.message });
  }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete booking", error: error.message });
  }
};
