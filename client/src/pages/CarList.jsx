import { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';
import CarModal from '../components/CarModal'; 
import ReservationModal from '../components/ReservationModal'; 
import '../styles/CarList.css'; 
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const CarList = () => {
  const [cars, setCars] = useState([]);
  const [showCarModal, setShowCarModal] = useState(false);
  const { user, signOut } = useContext(AuthContext);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [currentCar, setCurrentCar] = useState(null);
  const apiBaseUrl = 'http://localhost:4000';

  useEffect(() => {
    axios.get(`${apiBaseUrl}/api/cars`)
      .then(response => setCars(response.data.data.cars))
      .catch(error => console.error('Error fetching cars:', error));
  }, []);

  const showToast = (message, type) => {
    toast[type](message, {
      position: 'top-center',
      autoClose: 3000, // Adjust as needed
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleEdit = (car) => {
    setCurrentCar(car);
    setShowCarModal(true);
  };

  const handleDelete = (carId) => {
    axios.delete(`${apiBaseUrl}/api/cars/${carId}`)
      .then(() => {
        setCars(cars.filter(car => car._id !== carId));
        showToast('Car deleted successfully', 'success');
      })
      .catch(error => {
        console.error('Error deleting car:', error);
        showToast('Error deleting car', 'error');
      });
  };
  const handleSignOut = () => {
    signOut();
    showToast('Successfully signed out','success');
    navigate("/login"); // Navigate to login or any appropriate route after sign out
  };

  const handleAdd = () => {
    setCurrentCar({ name: '', price: '', image: '', type: '', company: '', available: true });
    setShowCarModal(true);
  };

  const closeCarModal = () => {
    setShowCarModal(false);
    setCurrentCar(null);
  };

  const handleCarModalSubmit = (carData) => {
    const method = carData._id ? 'put' : 'post';
    const url = carData._id
      ? `${apiBaseUrl}/api/cars/${carData._id}`
      : `${apiBaseUrl}/api/cars`;

      axios[method](url, carData)
      .then(response => {
        closeCarModal();
        if (carData._id) {
          setCars(cars.map(car => (car._id === carData._id ? response.data.data.car : car)));
          showToast('Car updated successfully', 'success');
        } else {
          setCars([...cars, response.data.data.car]);
          showToast('Car added successfully', 'success');
        }
      })
      .catch(error => {
        console.error('Error saving car:', error);
        showToast('Error saving car', 'error');
      });
  };

  const handleReservation = (car) => {
    setCurrentCar(car);
    setShowReservationModal(true);
  };

  const closeReservationModal = () => {
    setShowReservationModal(false);
    setCurrentCar(null);
  };

  const handleReservationSubmit = (reservationData) => {
    axios.post(`${apiBaseUrl}/api/reservations`, reservationData)
      .then(response => {
        console.log('Reservation successful:', response.data);
        closeReservationModal();
        showToast('Reservation successful', 'success');
      })
      .catch(error => {
        console.error('Error making reservation:', error);
        showToast('Error making reservation', 'error');
      });
  };

  return (
    <div>
      {user && user.role === 'admin' && (
        <>
      <button className="button-css" onClick={handleAdd}>Add Car</button>
      <button className="button-css" onClick={handleSignOut}>Sign Out</button>
      </>
    )}
      <div className="car-container">
        {cars.map(car => (
          <div key={car._id} className="car-card">
            <img src={car.image} alt={car.name} className="car-image" />
            <h3 className="car-title">{car.name}</h3>
            <p className="car-price">${car.price} Per Hour</p>
            <p>{car.type}</p>
            <p>{car.company}</p>
            <p>{car.available ? 'Available' : 'Not Available'}</p>
            <div className="button-container">
            {user && user.role === 'admin' && (
              <div>
              <button className="button-css" onClick={() => handleEdit(car)}>Edit</button>
              <button className="button-css" onClick={() => handleDelete(car._id)}>Delete</button>
              </div>
            )}
              <button className="button-css" onClick={() => handleReservation(car)}>Reserve</button>
            </div>
          </div>
        ))}
      </div>

      {showCarModal && (
        <CarModal
          car={currentCar}
          closeModal={closeCarModal}
          onSubmit={handleCarModalSubmit}
        />
      )}

      {showReservationModal && (
        <ReservationModal
          car={currentCar}
          closeModal={closeReservationModal}
          onSubmit={handleReservationSubmit}
        />
      )}
    </div>
  );
};

export default CarList;

