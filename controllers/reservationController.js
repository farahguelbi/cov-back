const Reservation = require('../models/reservation');
const Ride=require("../models/Ride");


// Create a reservation request
exports.createReservation = async (req, res) => {
  const { rideId, passengerId } = req.body;

  try {
    const reservation = new Reservation({ rideId, passengerId });
    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Error creating reservation', error });
  }
};

// Get all reservations for a driver (without populate)
exports.getDriverReservations = async (req, res) => {
  const { driverId } = req.params;  

  try {
    // First find all rides by this driver
    const rides = await Ride.find({ driver: driverId });
    const rideIds = rides.map(ride => ride._id);
    
    // Then find all reservations for these rides
    const reservations = await Reservation.find({ 
      rideId: { $in: rideIds } 
    });

    res.json({ reservations });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reservations', error });
  }
};



exports.getPassengerReservations = async (req, res) => {
  const { driverId } = req.params; // still called driverId

  try {
    const reservations = await Reservation.find({
      passengerId: driverId, // you search by passengerId
    });

    res.json({ reservations });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching passenger reservations', error });
  }
};



// Update reservation status (accept or deny)
exports.updateReservationStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await Reservation.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating reservation status', error });
  }
};
