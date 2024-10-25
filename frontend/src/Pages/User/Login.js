import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import "./user.css";

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/auth';

const BASE_URL = process.env.REACT_APP_URL;


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });
  
      if (response && response.data) {
        storeTokenInLS(response.data.token);
        setAlert({ show: true, type: 'success', message: 'Login successful!' });
        setTimeout(() => navigate("/dashboard"), 1500); // Redirect after 1.5 seconds
      } else {
        console.error('Unexpected response format:', response);
      }
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response) {
        setAlert({ show: true, type: 'danger', message: error.response.data.msg || 'Login failed' });
      } else {
        setAlert({ show: true, type: 'danger', message: 'An error occurred. Please try again.' });
      }
    }
  };

  return (
    <>
      <div className='login_page'>
        <Navbar />

        <div className='container3'>
          <div className='header'>
            <div className='box'>
              <h2>Login</h2>
            </div>
          </div>
        </div>
      </div>

      <div className='container6'>
        <div className='single-form'>
          <div className='form-details'>
            <img src="images/white_logo.png" style={{width:"100px"}} alt="logo" />
            <p>
              Don't have an account yet?
              <a href='/signup' className='m-2'>Sign Up</a>
            </p>
          </div>

          {alert.show && (
            <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
              {alert.message}
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className='headings mb-3'>
              <label className='form-label'>Email</label>
              <input
                type='email'
                className='form-control'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className='headings mb-3'>
              <label className='form-label'>Password</label>
              <input
                type='password'
                className='form-control'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className='mb-3'>
              <p>
                <a href=''>Forgot Password</a>
              </p>
            </div>

            <button type='submit' className='btn btn-primary'>LOGIN</button>
          </form>

          <div className='foot'>
            <p>Or connect with</p>
            <ul className='social-items2'>
              <a href='https://www.gmail.com/'><i className="fa-regular fa-envelope me-3"></i></a>
              <a href='https://www.facebook.com/'><i className="fa-brands fa-facebook-f me-3"></i></a>
              <a href='https://www.twitter.com/'><i className="fa-brands fa-twitter me-3"></i></a>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
