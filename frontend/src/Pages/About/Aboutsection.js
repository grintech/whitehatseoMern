import { React, useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import Teamslider from "../../Components/Teamslider";
import "./aboutsection.css";
import Footer from "../../Components/Footer";
import Readytotalk from "../../Components/Readytotalk";
import Section3 from "../../Components/Section3";

import axios from "axios";

const BASE_URL = process.env.REACT_APP_URL;

const Aboutsection = () => {

  const [about, setAbout] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutus = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/aboutus`);
        setAbout(response.data);
        // console.log(response.data);
      } catch (error) {
        setError('Failed to fetch data');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutus();
  }, []);

  return (
    <>
      <div className="aboutpage">
        <Navbar />

        <div className="container3">
          <div className="header">
            <div className="box">
              <h2>About Us</h2>

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

        <div className="section4">
          <div className="container">
            <div className="">
              {loading && <p>Loading...</p>}
              {error && <p className="text-danger">{error}</p>}
              {
                !loading && about.map((about, index) => {
                  return (
                    <div className="row" key={index}>
                      <div className="col-lg-6 py-3" >
                        <div className="aboutus-img">
                          <img src={`/aboutUs/${about.image}`} className="img1 w-100" alt="about-img" />
                        </div>
                      </div>

                      <div className="col-lg-6" key={about._id}>
                        <div className="section-content">
                          <h2>{about.title}</h2>
                          <div dangerouslySetInnerHTML={{ __html: about.description }} />
                        </div>
                      </div>
                    </div>

                  )
                })
              }
            </div>

            <div className="about-inner">
              <div className="row">
                <div className="col-lg-4">
                  <div className="inner">
                    <h3>Our Mission</h3>
                    <p>
                    Our  aim is to deliver remarkable digital marketing services, along with exceptional SEO and SMM services for our clients, to maximize brand value worldwide and reduce any signs of stagnant leads or organic traffic issues. Furthermore, our goal is always client satisfaction at heart - which drives everything we do!
                    </p>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="inner">
                    <h3>Our Vision</h3>
                    <p>
                    Our vision is to foster collaboration, success, and meaningful branding for businesses of all kinds. The core purpose of the company is providing clients and the business with tangible results; your success is of upmost importance!
                    </p>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="inner">
                    <h3>Our Value</h3>
                    <p>
                    WhiteHatSeo team utilizes cutting-edge strategies to increase website visibility, organic traffic and rank higher on search engines for our clients' benefit. This increases brand prestige, conversion rates and returns while staying ahead in technology advances. Our clients trust in us to exceed their expectations - make the switch today to learn how!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="team-section">
          <div className="container">
            <div className="box2 d-flex flex-column align-items-center justify-contnt-center py-5">
              <h2>Our Awesome Team</h2>
              <div className="bar"></div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>

            <div className="row">
              <Teamslider />
            </div>
          </div>
        </div>

        <Readytotalk />

        <Section3 />
      </div>

      <Footer />
    </>
  );
};

export default Aboutsection;
