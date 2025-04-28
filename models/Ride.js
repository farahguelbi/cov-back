const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RideSchema = new Schema({
  time1: { type: String, required: true },
  time2: { type: String, required: true },
  location1: { type: String, required: true },
  location2: { type: String, required: true },
  smoking: { type: Boolean, required: true },
  animals: { type: Boolean, required: true },
  driver: {type: String, required: true },
  vehicle: { type: String },
  date: { type: String, required: true },
  passengerCount: { type: Number, required: true },
  luggageSize: { type: String, enum: ["petit", "moyen", "grand"], required: true },
  price: { type: Number , required: true },
  // rating: { type: Number, required: true },


}, { timestamps: true });


module.exports = mongoose.models.Ride || mongoose.model('Ride', RideSchema);