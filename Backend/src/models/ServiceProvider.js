const mongoose = require("mongoose");
const validator = require("validator");
const serviceProvider = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  services: [
    {
      serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true,
      },
      experience: {
        type: Number,
        required: true,
      },
      hourlyRate: {
        type: Number,
        required: true,
      },
      availability: {
        type: Boolean,
        required: true,
        default: true,
      },
    },
  ],
  location: {
    type: "Point",
    coordinates: [longitude, latitude],
  },
  rating: {
    type: Number,
    default: 0,
  },
  createdAt: Date,
  updatedAt: Date,
});
