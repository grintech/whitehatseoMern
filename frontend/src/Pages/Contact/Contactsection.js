import React, { useState } from "react";
import axios from "axios";


const BASE_URL = process.env.REACT_APP_URL;

const Contactsection = () => {
  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Send POST request to the server
      await axios.post(`${BASE_URL}/contact`, formData);

      // If successful, set success state and optionally reset form data
      setSuccess(true);
      setFormData(initialFormData); // Reset form data if needed
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      setError("Failed to send message");
      setTimeout(() => {
        setError("");
      }, 3000);
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="contact-section2 contact_us_form pb-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="contactus-img">
                <img
                  src="homeimages/contact.png"
                  className="img1 w-100"
                  alt="contact-img"
                />
              </div>
            </div>

            <div className="col-lg-6">
              <form onSubmit={handleSubmit}>
                <div className="row mb-4 mt-4">
                  <div className="col-lg-6 mb-4">
                    <div className="form-details">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        className="form-control"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 mb-4">
                    <div className="form-details">
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className="form-control"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 mb-4">
                    <div className="form-details">
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email Address"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 mb-4">
                    <div className="form-details">
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Your Phone Number"
                        className="form-control"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 mb-4">
                    <div className="form-details">
                      <input
                        type="text"
                        name="subject"
                        placeholder="Your Subject"
                        className="form-control"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 mb-4">
                    <div className="form-details">
                      <textarea
                        name="message"
                        cols="30"
                        rows="5"
                        placeholder="Write Your Message"
                        className="form-control"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 mb-4">
                    <button
                      className="btn-purple1"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "SEND MESSAGE"}
                    </button>

                    {success && (
                      <div className="col-lg-12 py-3 ">
                        <h6 className="text-success">
                          Message sent successfully!
                        </h6>
                      </div>
                    )}

                    {error && (
                      <div className="col-lg-12 py-3 ">
                        <h6 className="text-danger">{error}</h6>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contactsection;
