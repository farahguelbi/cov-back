const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.post('/', reservationController.createReservation);
router.get('/driver/:driverId', reservationController.getDriverReservations);
router.patch('/:id/status', reservationController.updateReservationStatus);
router.get('/passenger/:driverId', reservationController.getPassengerReservations);
module.exports = router;
