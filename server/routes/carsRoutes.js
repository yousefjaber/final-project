const express = require('express');
const carController = require('../controllers/carController');

const router = express.Router();

router.route('/')
  .get(carController.getAllCars)
  .post(carController.addCar);

router.route('/:carId')
  .get(carController.getCarById)
  .put(carController.updateCarById)
  .delete(carController.deleteCarById);

module.exports = router;
