import {React, useState, useEffect} from 'react';
import axios from 'axios';

import { Autoplay, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


  // Utility function to strip HTML tags from a string
    const stripHtmlTags = (str) => {
      if (!str) return "";
      return str.replace(/<\/?[^>]+(>|$)/g, "");
  };

  const BASE_URL = process.env.REACT_APP_URL;   

export default () => {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    // Fetch news data
    axios.get(`${BASE_URL}/testimonial`)
    .then(response => {
      setData(response.data);
    })
    .catch(error => {
      setError(error.message);
    });

  }, []);

  return (
    <Swiper
    className='pb-5'
      modules={[Autoplay, Pagination, A11y]}
      spaceBetween={30}
      slidesPerView={1}
      // loop={true}
      autoplay={{
        delay: 3000, // Change slide every 3 seconds
        disableOnInteraction: false, // Autoplay will not be disabled after user interactions
      }}
      navigation
      pagination={{ clickable: true }}

      breakpoints={{
        475: {
          slidesPerView: 1,
        },
      }}

    >

      {
        data && data.map((item, index) => (
          <SwiperSlide key={index}>
            <div className='card position-relative border-0 '>
              <div className='d-flex align-items-center card-body'>
                <div className='img'>
                  <img src={`testimg/${item.image}`} className='img1' alt='member' />
                </div>

                <div className='input2'>
                  <h3>{item.title}</h3>
                  <span className='test_role'>{item.role}</span>
                  {/* <p dangerouslySetInnerHTML={{__html : item.description}} /> */}
                  <p>{stripHtmlTags(item.description )}</p>
                </div>
              </div>


            </div>
          </SwiperSlide>
        ))
      }

      {/* <SwiperSlide>
     <div className='card position-relative'>
                <div className='d-flex align-items-center'>

                  <div className='img'>
                    <img src='homeimages/teamimg3.jpg' className='img1' alt='member' />
                  </div>

                  <div className='input2'>
                    <h3>Lisa Sauermann</h3>
                    <span>Web Developer</span>
                    <p>Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  </div>
                </div>


              </div>
      </SwiperSlide>
      
      <SwiperSlide>
     <div className='card position-relative'>
                <div className='d-flex align-items-center'>

                  <div className='img'>
                    <img src='homeimages/teamimg1.jpg' className='img1' alt='member' />
                  </div>

                  <div className='input2'>
                    <h3>David Gale</h3>
                    <span>Software Engineer</span>
                    <p>Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  </div>
                </div>


              </div>
      </SwiperSlide>
     

      <SwiperSlide>
     <div className='card position-relative'>
                <div className='d-flex align-items-center'>

                  <div className='img'>
                    <img src='homeimages/teamimg4.jpg' className='img1' alt='member' />
                  </div>

                  <div className='input2'>
                    <h3>Matte Devan</h3>
                    <span>American Actor</span>
                    <p>Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  </div>
                </div>


              </div>
      </SwiperSlide>

      <SwiperSlide>
     <div className='card position-relative'>
                <div className='d-flex align-items-center'>

                  <div className='img'>
                    <img src='homeimages/teamimg5.jpg' className='img1' alt='member' />
                  </div>

                  <div className='input2'>
                    <h3>Jason Momoa</h3>
                    <span>Mathematician</span>
                    <p>Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  </div>
                </div>


              </div>
      </SwiperSlide> */}

    </Swiper>
  );
};