const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema({
  destination: { type: String, required: true, trim: true, lowercase: true },
  type:        { type: String, required: true }, // Bus, Train, Taxi, Rental
  name:        { type: String, required: true },
  route:       { type: String, default: '' },
  timing:      { type: String, default: '' },
  price:       { type: String, default: '' },
  details:     { type: String, default: '' },
  bookingUrl:  { type: String, default: '#' },
});

module.exports = mongoose.model('Transport', transportSchema);
