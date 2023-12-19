const Reservation = require('../models/reservationModel');

exports.createReservation = async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json({ status: 'success', data: { reservation } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Include other CRUD operations as needed
