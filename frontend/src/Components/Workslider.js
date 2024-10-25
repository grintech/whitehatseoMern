// import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import {React } from 'react';
import{ useState, useEffect} from 'react'
import axios from 'axios';
import { Autoplay, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay'; 
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';


    // Utility function to strip HTML tags from a string
    const stripHtmlTags = (str) => {
      if (!str) return "";
      return str.replace(/<\/?[^>]+(>|$)/g, "");
  };

  const BASE_URL = process.env.REACT_APP_URL;

const Workslider = () => {

  const [workData, setWorkData] = useState([]);
const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch work data
    axios.get(`${BASE_URL}/work`)
    .then(response => {
      setWorkData(response.data);
    })
    .catch(error => {
      setError(error.message);
    });
    }, []);


  return (
    <Swiper
      modules={[Autoplay, Pagination, A11y]}
      spaceBetween={30}
      slidesPerView={1}
      loop={true}
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
        600: {
          slidesPerView: 2,
        },
       
        1024: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
      }}
    
    >
      {
       workData &&  workData.map((item, index) => (
          <SwiperSlide key={index}>
          <div className='work position-relative'>
                      <img src={require(`/public/workimages/${item.image}`)} className='img1' alt='works' />

                      <div className='works-content position-absolute'>
                        <div className='d-flex justify-content-end w-100'>
                            <i className='fa-solid fa-gear'></i>
                        </div>
                      <div className='mt-lg-2 mt-4'>
                      <h3 ><Link to="" className='text-white'>{item.title}</Link></h3>
                    
                      <p>{stripHtmlTags(item.description)}</p>
                      </div>
                      </div>

                    </div>
          </SwiperSlide>
        ))
      }


      {/* <SwiperSlide>
      <div className='work position-relative'>
                  <img src='homeimages/works-image2.jpg' className='img2' alt='works' />

                  <div className='works-content position-absolute'>
                    <div className='d-flex justify-content-end w-100'>
                        <i className='fa-solid fa-gear'></i>
                    </div>
                   <div className='mt-lg-2 mt-4'>
                   <h3>Email Notifications</h3>
                   <p>Lorem ipsum dolor amet, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                   </div>
                  </div>

                </div>
      </SwiperSlide>


      <SwiperSlide>
      <div className='work position-relative'>
                  <img src='homeimages/works-image3.jpg' className='img3' alt='works' />

                  <div className='works-content position-absolute'>
                    <div className='d-flex justify-content-end w-100'>
                        <i className='fa-solid fa-gear'></i>
                    </div>
                   <div className='mt-lg-2 mt-4'>
                   <h3>Email Notifications</h3>
                   <p>Lorem ipsum dolor amet, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                   </div>
                  </div>

                </div>
      </SwiperSlide>


      <SwiperSlide>
      <div className='work position-relative'>
                  <img src='homeimages/works-image4.jpg' className='img4' alt='works' />

                  <div className='works-content position-absolute'>
                    <div className='d-flex justify-content-end w-100'>
                        <i className='fa-solid fa-gear'></i>
                    </div>
                   <div className='mt-lg-2 mt-4'>
                   <h3>Email Notifications</h3>
                   <p>Lorem ipsum dolor amet, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                   </div>
                  </div>

                </div>
      </SwiperSlide>


      <SwiperSlide>
      <div className='work position-relative'>
                <img src='homeimages/works-image5.jpg'  className='img5' alt='works'/>
                
                <div className='works-content position-absolute'>
                <h3>Information Retrieval</h3>
                <p>Lorem ipsum dolor amet, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
              </div>

                </div>
      </SwiperSlide> */}
     
    </Swiper>
  );
};

export default Workslider ;