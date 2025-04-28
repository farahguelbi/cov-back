const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  rideId: { type: String, required: true },  // Store rideId as a String
  passengerId: { type: String, required: true },  // Store passengerId as a String
  status: { type: String, enum: ['pending', 'accepted', 'denied'], default: 'pending' },
});

module.exports = mongoose.model('Reservation', reservationSchema);
