import React, { useState } from 'react';
import '../styles/CarModal.css'; // Import the CSS file for the modal styling

const CarModal = ({ car, closeModal, onSubmit }) => {
  const [carName, setCarName] = useState(car ? car.name : '');
  const [carPrice, setCarPrice] = useState(car ? car.price : '');
  const [carImage, setCarImage] = useState(car ? car.image : '');
 const [carType, setCarType] = useState(car ? car.type : '');
 const [carCompany, setCarCompany] = useState(car ? car.company :'');
 const [carAvailable, setCarAvailable] = useState(car? car.available : '');
 const handleSubmit = (event) => {
    event.preventDefault();
    const carData = {
      _id: car._id, // Preserve the _id
      name: carName,
      price: carPrice,
      image: carImage,
      type: carType,
      company: carCompany,
      available: carAvailable,
    };
    onSubmit(carData);
    closeModal();
  };

  return (
    <div className="modal-backdrop"> {/* Apply the modal-backdrop class */}
      <div className="modal-content"> {/* Apply the modal-content class */}
        <button className="close-button" onClick={closeModal}>
          &times;
        </button>
        <h2>Edit Car</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="carName">Car Name:</label>
            <input
              id="carName"
              type="text"
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="carPrice">Car Price:</label>
            <input
              id="carPrice"
              type="text"
              value={carPrice}
              onChange={(e) => setCarPrice(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="carImage">Car Image URL:</label>
            <input
              id="carImage"
              type="text"
              value={carImage}
              onChange={(e) => setCarImage(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="carType">Car Type</label>
            <input
              id="carType"
              type="text"
              value={carType}
              onChange={(e) => setCarType(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="carCompany">Car Company</label>
            <input
              id="carCompany"
              type="text"
              value={carCompany}
              onChange={(e) => setCarCompany(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="carAvailable">Car Available</label>
            <input
              id="carAvailable"
              type="boolean"
              value={carAvailable}
              onChange={(e) => setCarAvailable(e.target.value)}
            />
          </div>
          <div className="action-buttons">
            <button type="submit" className="submit-button">
              Save Changes
            </button>
            <button className="submit-button" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarModal;
