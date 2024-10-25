import React from 'react'
import { Link } from 'react-router-dom'

const Banner = () => {
  return (
    <div className='main-banner'>

      <div className='animation'>

        <div className='shape1'>
          <img src='homeimages/shape1.png' className='shape1' alt='moon' />
        </div>

        <div className='shape3'>
          <img src='homeimages/shape3.svg' className='shape3' alt='circle' />
        </div>

        <div className='shape4'>
          <img src='homeimages/shape4.svg' className='shape4' alt='triangle' />
        </div>

        <div className='shape5'>
          <img src='homeimages/shape5.png' className='shape5' alt='zig-zag' />
        </div>

        <div className='shape6'>
          <img src='homeimages/shape6.svg' className='shape6' alt='traingle' />
        </div>

        <div className='shape7'>
          <img src='homeimages/shape7.svg' className='shape7' alt='cross' />
        </div>

        <div className="all-animation2">
          <img src='all-animations/all-animation2.svg' className='cross-img' alt='cross' />

        </div>

      </div>

      <div className='container'>
        <div className='row'>
          <div className='col-lg-5'>
            <h1 className='text-capitalize'>Transforming Digital Visions into Reality with WHITEHATSEO</h1>
            <p>At WHITEHATSEO, we specialize in transforming your digital presence into a powerful engine for growth. As a leading SEO and digital marketing agency, we are dedicated to driving results through cutting-edge strategies and innovative solutions. Our team of experts leverages the latest tools and techniques to boost your online visibility, attract targeted traffic, and convert visitors into loyal customers.
            </p>
            <div className="d-flex btn-hover">             
           <Link to='/contact'>
             <button className="banner-btn">Book Now</button>
           </Link>
            </div>
          </div>
          <div className='col-lg-6 offset-lg-1'>
            <div className='banner-img position-relative'>
              <img src='homeimages/man.png' className='banner-img1' alt='man' />
              <img src='homeimages/img2.png' className='banner-img2' alt='keyboard' />
              <img src='homeimages/img3.png' className='banner-img3' alt='headphones' />
              <img src='homeimages/img4.png' className='banner-img4' alt='plant' />
              <img src='homeimages/img5.png' className='banner-img5' alt='cactus' />
              <img src='homeimages/img6.png' className='banner-img6' alt='switch' />
              <img src='homeimages/img7.png' className='banner-img7' alt='laptop' />
              <img src='homeimages/img8.png' className='banner-img8' alt='topframe' />
              <img src='homeimages/img9.png' className='banner-img9' alt='mat' />
              <img src='homeimages/img10.png' className='banner-img10' alt='books' />
              <img src='homeimages/img11.png' className='banner-img11' alt='penstand' />
              <img src='homeimages/img12.png' className='banner-img12' alt='table' />
              <img src='homeimages/img13.png' className='banner-img13' alt='tea' />
              <img src='homeimages/img1.png' className='banner-imgnew' alt='dustbin' />
            </div>

            <div className='full-bannerimg1'>
              <img src='frontendImg/main-banner-img.png' className='full-banner1 w-100' alt='man' />

            </div>
          </div>
        </div>




      </div>
    </div>
  )
}

export default Banner
