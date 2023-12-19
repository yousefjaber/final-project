import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ReservationModal = ({ car, closeModal, onSubmit }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      carId: car._id,
      startDate,
      endDate
    });
    closeModal();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>&times;</button>
        <h2>Reserve Car</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Start Date:</label>
            <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
          </div>
          <div className="input-group">
            <label>End Date:</label>
            <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
          </div>
          <div className="action-buttons">
            <button type="submit" className="submit-button">Reserve</button>
            <button className="submit-button" onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationModal;
