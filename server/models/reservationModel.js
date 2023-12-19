const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  // Include additional fields as needed
});

module.exports = mongoose.model('Reservation', reservationSchema);
