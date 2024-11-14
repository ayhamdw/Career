const mongoose = require("mongoose");
const validator = require("validator");
const serviceSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    trim: true,
    required: true,
    default: "",
  },
  description: {
    type: String,
    trim: true,
    required: true,
    default: "",
  },
  category: {
    type: String,
    trim: true,
    required: true,
    category: String,
    enum: [
      "Home Services",
      "Technical",
      "Automotive",
      "Health & Wellness",
      "Education",
      "Other",
    ],
    default: "",
    createdAt: Date,
    updatedAt: Date,
  },
});
