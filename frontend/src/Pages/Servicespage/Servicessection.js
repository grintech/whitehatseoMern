import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { Link } from 'react-router-dom';


const BASE_URL = process.env.REACT_APP_URL;

// Utility function to strip HTML tags from a string
const stripHtmlTags = (str) => {
    if (!str) return "";
    return str.replace(/<\/?[^>]+(>|$)/g, "");
};


const Servicessection = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/services`);
                setServices(response.data);
            } catch (error) {
                setError('Failed to fetch services');
                console.error('Error fetching services:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    return (
        <>
            <div className='servicespage'>
                <Navbar />
                <div className='container3'>
                    <div className='header'>
                        <div className='box'>
                            <h2>Services</h2>

                            <div className="all-animation">

                                <div className="all-animation1">
                                    <img src='all-animations/all-animation1.png' className='circle-img' alt='moon' />

                                </div>

                                <div className="all-animation2">
                                    <img src='all-animations/all-animation2.svg' className='cross-img' alt='cross' />

                                </div>

                                <div className="all-animation3">
                                    <img src='all-animations/all-animation3.svg' className='circle-img' alt='circle' />

                                </div>

                                <div className="all-animation4">
                                    <img src='all-animations/all-animation4.svg' className='triangle-img' alt='triangle' />
                                </div>

                                <div className="all-animation5">
                                    <img src='all-animations/all-animation5.png' className='design1' alt='zig-zag' />

                                </div>

                                <div className="all-animation6">
                                    <img src='all-animations/all-animation6.svg' className='triangle3' alt='triangle' />

                                </div>

                                <div className="all-animation7">
                                    <img src='all-animations/all-animation7.svg' className='triangle3' alt='triangle' />

                                </div>

                                <div className="all-animation8">
                                    <img src='all-animations/all-animation8.svg' className='triangle3' alt='triangle' />

                                </div>


                            </div>


                        </div>
                    </div>
                </div>

                <div className='services-section py-5'>
                    <div className='container'>
                        <h2 className='text-center mb-5'>We provide the necessary services to you</h2>
                        <div className='row'>
                            {loading && <p>Loading...</p>}
                            {error && <p className="text-danger">{error}</p>}
                            {!loading && services.map((service) => (
                                <div className='col-lg-4 col-sm-6 mb-4' key={service._id}>
                                    <div className='box'>
                                        <img src={`/serviceimg/${service.image}`} className='img1' alt={service.title} />
                                        <h3><Link to={`/single-service/${service.slug}`}>{service.title}</Link></h3>
                                        {/* <p dangerouslySetInnerHTML={{ __html : service.description}}/> */}
                                        <p>{stripHtmlTags(service.description)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
};

export default Servicessection;
