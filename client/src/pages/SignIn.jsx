import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/SignIn.css';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const SignIn = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await signIn(credentials.username, credentials.password);
    if (success) {
      navigate('/CarList'); 
      showToast('Successfully Signed In','success');
    } else {
      setError('Invalid credentials! Please try again.');
    }
  };

  return (
    <div className="sign-in-container">
      <form className="sign-in-form" onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="sign-in-button">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;