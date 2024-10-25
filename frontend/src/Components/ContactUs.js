// src/ContactForm.js

import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';

const BASE_URL = process.env.REACT_APP_URL;


const ContactForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = {
                firstName,
                lastName,
                phone,
                email,
                subject,
                message
            };

            await axios.post(`${BASE_URL}/contact`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setSuccessMessage('Contact submitted successfully!');
            setErrorMessage(''); // Clear any previous error message

            // Reset form fields after successful submission
            setFirstName('');
            setLastName('');
            setPhone('');
            setEmail('');
            setSubject('');
            setMessage('');
            e.target.reset(); // Reset form fields

            // Hide success message after 5 seconds
            setTimeout(() => {
                setSuccessMessage('');
            }, 5000);
        } catch (error) {
            setErrorMessage(error.response?.data?.error || 'Error submitting contact. Please try again.');
            setSuccessMessage(''); // Clear any previous success message

            // Hide error message after 5 seconds
            setTimeout(() => {
                setErrorMessage('');
            }, 5000);
        }
    };

    return (
        <>
            <Navbar />

            <div className='mt-5 pt-4 mb-5 pb-4'>
               
                <div className='col-lg-6 col-md-7 col-10 mx-auto bg-success-subtle p-5 mt-4'>
                    <form onSubmit={handleSubmit}>
                        <h2 className='mb-4'>Contact Us</h2>
                       <div className="row">
                       <div className="col-md-6 mb-3">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input
                                className='form-control'
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input
                                className='form-control'
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input
                                className='form-control'
                                type="text"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                className='form-control'
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-12 mb-3">
                            <label htmlFor="subject" className="form-label">Subject</label>
                            <input
                                className='form-control'
                                type="text"
                                id="subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-12 mb-3">
                            <label htmlFor="message" className="form-label">Message</label><br />
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                cols="50"
                                className='form-control'
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />
                        </div>
                       </div>
                        <button type="submit" className="btn btn-success rounded-0 mt-3">Submit</button>
                        {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                        {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                    </form>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ContactForm;
