import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import "./user.css";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/auth';

const BASE_URL = process.env.REACT_APP_URL;

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
        
    // Basic validation for phone number
    if (!/^\d{10}$/.test(phone)) {
      setAlert({ show: true, type: 'danger', message: 'Phone number must be numeric and exactly 10 digits long.' });
      return;
    }

    if (password !== confirmPassword) {
      setAlert({ show: true, type: 'danger', message: 'Passwords do not match' });
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/register`, {
        username,
        email,
        phone,
        password,
      });

      if (response && response.data) {
        storeTokenInLS(response.data.token);
        setAlert({ show: true, type: 'success', message: 'Sign-up successful!' });
        setTimeout(() => navigate("/login"), 1500); // Redirect after 1.5 seconds
      } else {
        console.error('Unexpected response format:', response);
      }
    } catch (error) {
      console.error('Sign-up failed:', error);
      if (error.response) {
        setAlert({ show: true, type: 'danger', message: error.response.data.msg || 'Sign-up failed' });
      } else {
        setAlert({ show: true, type: 'danger', message: 'An error occurred. Please try again.' });
      }
    }
  };

  return (
    <div>
      <div className='signup_page'>
        <Navbar />

        <div className='container3'>
          <div className='header'>
            <div className='box'>
              <h2>Sign Up</h2>
            </div>
          </div>
        </div>

        <div className='container6'>
          <div className='single-form'>
            <div className='form-details'>
              <img src="images/white_logo.png" style={{width:"100px"}} alt="logo" />
              <p>Create a new account</p>
            </div>

            {alert.show && (
              <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                {alert.message}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            )}

            <form className='row' onSubmit={handleSubmit}>
              <div className='col-12 headings mb-3'>
                <label className='form-label'>Username</label>
                <input
                  type='text'
                  className='form-control'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className='col-lg-6 headings mb-3'>
                <label className='form-label'>Email</label>
                <input
                  type='email'
                  className='form-control'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className='col-lg-6 headings mb-3'>
                <label className='form-label'>Phone</label>
                <input
                  type='tel'
                  className='form-control'
                  value={phone}
                  // onChange={(e) => setPhone(e.target.value)}
                   // Allow only numbers and limit to 10 digits
                  onChange={ (e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                    setPhone(value);
                  }}
                   required
                  maxLength="10"
                />
              </div>
              <div className='col-lg-6 headings mb-3'>
                <label className='form-label'>Password</label>
                <input
                  type='password'
                  className='form-control'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className='col-lg-6 headings mb-3'>
                <label className='form-label'>Confirm Password</label>
                <input
                  type='password'
                  className='form-control'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button type='submit' className='btn btn-primary'>SIGN UP</button>
            </form>

            <div className='foot'>
              <p>Already have an account?
                <a href='/login' className='m-2'>Login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
