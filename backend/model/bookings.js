const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    userName: {
      type: String,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    restaurantName: {
      type: String,
      required: true,
    },
    bookingDate: {
      type: String,
      required: true,
      validate: {
        validator: function (date) {
          return /\d{4}-\d{2}-\d{2}/.test(date);
        },
        message: (props) =>
          `${props.value} is not a valid date format! Use YYYY-MM-DD.`,
      },
    },
    bookingTime: {
      type: String,
      required: true,
      validate: {
        validator: function (time) {
          return /\d{2}:\d{2}/.test(time);
        },
        message: (props) =>
          `${props.value} is not a valid time format! Use HH:MM.`,
      },
    },
    numberOfGuests: {
        type: Number,
        required: true,
        min: [1, "Number of guests must be at least 1."],
        max: [10, "Number of guests can be till 10."],
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    specialRequests: {
      type: String,
      maxlength: 500,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
