const Car = require('../models/CarModels');

exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json({ status: 'success', data: { cars } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.carId);
    if (!car) {
      return res.status(404).json({ status: 'error', message: 'Car not found' });
    }
    res.json({ status: 'success', data: { car } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.addCar = async (req, res) => {
  try {
    const newCar = new Car(req.body);
    await newCar.save();
    res.status(201).json({ status: 'success', data: { car: newCar } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.updateCarById = async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.carId, req.body, { new: true });
    if (!updatedCar) {
      return res.status(404).json({ status: 'error', message: 'Car not found' });
    }
    res.json({ status: 'success', data: { car: updatedCar } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.deleteCarById = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.carId);
    if (!car) {
      return res.status(404).json({ status: 'error', message: 'Car not found' });
    }
    res.status(204).json({ status: 'success', data: null }); // 204 No Content
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
