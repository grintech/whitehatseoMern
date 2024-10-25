import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';

const BASE_URL = process.env.REACT_APP_URL;

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    gender: 'male',
    phone: '',
    age: '',
    password: '',
    confirmpassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/register`, formData);
      console.log('Registration successful:', response.data);
        // Reset the form fields after successful registration
        setFormData({
            firstname: '',
            lastname: '',
            email: '',
            gender: 'male',
            phone: '',
            age: '',
            password: '',
            confirmpassword: '',
        });
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='container mt-5 mb-5 pb-5 pt-5'>
        <div className='col-lg-6 mx-auto'>
          <form className="py-4 px-4 bg-success-subtle" onSubmit={handleSubmit}>
            <h2 className='mb-4 text-center'>Register Now</h2>
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="firstname" className="form-label">First Name</label>
                  <input type="text" className="form-control" name="firstname" value={formData.firstname} onChange={handleChange} id="firstname" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="lastname" className="form-label">Last Name</label>
                  <input type="text" className="form-control" name="lastname" value={formData.lastname} onChange={handleChange} id="lastname" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Your Email</label>
                  <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} id="email" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex h-100">
                  <div className="form-check d-flex align-items-center me-2">
                    <input className="form-check-input me-1 mb-1" type="radio" name="gender" value="male" id="radio1" checked={formData.gender === 'male'} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="radio1">
                      Male
                    </label>
                  </div>
                  <div className="form-check d-flex align-items-center me-2">
                    <input className="form-check-input me-1 mb-1" type="radio" name="gender" value="female" id="radio2" checked={formData.gender === 'female'} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="radio2">
                      Female
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} id="phone" minLength="10" maxLength="10" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="age" className="form-label">Age</label>
                  <input type="text" className="form-control" name="age" value={formData.age} onChange={handleChange} id="age" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password *</label>
                  <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} id="password" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="confirmpassword" className="form-label">Confirm Password *</label>
                  <input type="password" className="form-control" name="confirmpassword" value={formData.confirmpassword} onChange={handleChange} id="confirmpassword" />
                </div>
              </div>
              <button type="submit" className="btn btn-success  rounded-0 w-auto mt-3">Register</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterForm;
