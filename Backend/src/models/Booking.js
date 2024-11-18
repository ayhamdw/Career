const mongoose = require("mongoose");
const bookingSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    trim: true,
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    trim: true,
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
    trim: true,
  },
  dateRequested: {
    type: Date,
    trim: true,
    required: true,
  },
  dateScheduled: {
    type: Date,
    trim: true,
    required: true,
  },

  location: {
    type: "Point",
    coordinates: [longitude, latitude],
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "In Progress", "Completed", "Cancelled"],
    default: "Pending",
  },
  timestamps: true,
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
