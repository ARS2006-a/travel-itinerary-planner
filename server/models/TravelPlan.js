const mongoose = require('mongoose');

const travelPlanSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true,
    trim: true,
  },
  days: {
    type: Number,
    required: true,
    min: 1,
    max: 30,
  },
  budget: {
    type: String,
    required: true,
    enum: ['budget', 'mid-range', 'luxury'],
  },
  interests: {
    type: String,
    required: true,
    trim: true,
  },
  itinerary: {
    type: Object,
    required: true,
  },
  // Optional reference to authenticated user
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('TravelPlan', travelPlanSchema);
