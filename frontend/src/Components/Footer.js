import { Link } from 'react-router-dom';

import React from 'react'

const WEBSITE_URL = process.env.REACT_APP_FRONTEND;


const Footer = () => {
    return (
        <>

            <div className='footer pt-5 pb-0' style={{ backgroundColor: "#f7fafd" }}>


                <div className='footer-animation'>

                    <div className='footer-animation1'>
                        <img src={`${WEBSITE_URL}/homeimages/footer-shape1.png`} className='footer-moon' alt='moon'></img>
                    </div>

                    <div className='footer-animation2'>
                        <img src={`${WEBSITE_URL}/homeimages/footer-shape2.svg`} className='footer-cross' alt='cross'></img>
                    </div>
                </div>

                <div className='container '>

                    <div className='row'>

                        <div className='col-lg-3 col-sm-6 mb-4'>
                            <div className='d-flex'>
                                <div className='footer-section'>
                                <img src={`${WEBSITE_URL}/images/white_logo.png`} style={{width:"100px"}} alt='logo'></img>
                                    <p className='mt-3 px-3'> We work with a passion of taking challenges and creating new ones in advertising sector.</p>
                                </div>

                            </div>
                        </div>

                        <div className='col-lg-3 col-sm-6 mb-4'>
                            <div className='d-flex justify-content-lg-center'>
                                <div className='footer-section text-align-center'>
                                    <h3>Company</h3>
                                    <ul className='p-0'>
                                        <li>About Us</li>
                                        <li>Services</li>
                                        <li>Features</li>
                                        {/* <li>Our Pricing</li> */}
                                        <li>Latest News</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div className='col-lg-3 col-sm-6 mb-4'>
                            <div className='d-flex justify-content-lg-center'>
                                <div className='footer-section'>
                                    <h3>Support</h3>
                                    <ul className='p-0'>
                                        <li>FAQ's</li>
                                        <li><Link to='/privacy-policy' >Privacy Policy</Link></li>
                                        <li><Link to='/terms-conditions' >Terms & Conditions</Link></li>
                                        <li>Contact Us</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div className='col-lg-3 col-sm-6 mb-4'>
                            <div className='d-flex justify-content-lg-center'>
                                <div className='footer-section'>
                                    <h3>Address</h3>
                                    <ul className='p-0'>
                                        <li>9th Floor, Bestech Business Tower,
                                        B-905/1</li>
                                        <li>Email: info@whitehatseo.in</li>
                                        <li>Phone: +91-9418960274</li>
                                    </ul>

                                    <div className='footer-social  m-0'>
                                        <div className='d-flex justify-content-start'>
                                            <Link><i className='fa-brands fa-facebook me-2'></i></Link>
                                            <Link><i className='fa-brands fa-twitter me-2'></i></Link>
                                            <Link><i className='fa-brands fa-instagram me-2'></i></Link>
                                            <Link><i className='fa-brands fa-linkedin me-2'></i></Link>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='footer-copyright border-top'>
                        <div className='container'>
                            <div className='content py-3'>
                                <p className='m-0'>© Copyright 2024 Whitehatseo | All Rights Reserved. </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>





        </>
    )
}

export default Footer
