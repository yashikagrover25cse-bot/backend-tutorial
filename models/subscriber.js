const mongoose = require('mongoose');

// Step (c): database model for MongoDB (via Mongoose).
// A subscriber has a name, the channel they subscribed to,
// and the date they subscribed (defaults to "now").
const subscriberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subscribedToChannel: {
    type: String,
    required: true,
  },
  subscribeDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model('Subscriber', subscriberSchema);
