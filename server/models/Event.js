const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  destination: { type: String, required: true, trim: true, lowercase: true },
  name:        { type: String, required: true },
  date:        { type: String, required: true },
  category:    { type: String, default: 'Cultural' },
  description: { type: String, required: true },
  location:    { type: String, default: '' },
  price:       { type: String, default: 'Free' },
});

module.exports = mongoose.model('Event', eventSchema);
