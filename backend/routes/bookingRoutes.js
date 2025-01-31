const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/book', bookingController.createBooking);
router.get('/book', bookingController.getAllBookings);
router.get('/book/:id', bookingController.getBookingById);
router.put('/book/:id', bookingController.updateBooking);
router.delete('/book/:id', bookingController.deleteBooking);

module.exports = router;
