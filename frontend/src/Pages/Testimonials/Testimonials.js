import React from 'react'
import Usersslider from '../../Components/Usersslider'

const WEBSITE_URL = process.env.REACT_APP_FRONTEND;

const Testimonials = () => {
  return (
    <>
          <div className="users">

            <div className="users-animation">

            <div className="user-animation1">
                <img src={`${WEBSITE_URL}/homeimages/user-animation1.png`} className='circle3' alt='moon' />

            </div>


            <div className="user-animation2">
                <img src={`${WEBSITE_URL}/homeimages/user-animation2.svg`} className='circle' alt='circle' />

            </div>

            <div className="user-animation3">
                <img src={`${WEBSITE_URL}/homeimages/user-animation3.svg`} className='circle' alt='circle' />

            </div>

            <div className="user-animation4">
                <img src={`${WEBSITE_URL}/homeimages/user-animation4.svg`} className='user-triangle' alt='triangle' />

            </div>

            <div className="user-animation5">
                <img src={`${WEBSITE_URL}/homeimages/user-animation5.png`} className='user-design' alt='zig-zag' />
            </div>

            <div className="user-animation6">
                <img src={`${WEBSITE_URL}/homeimages/user-animation6.svg`} className='user-triangle2' alt='triangle' />
            </div>

            <div className="user-animation7">
                <img src={`${WEBSITE_URL}/homeimages/user-animation7.svg`} className='user-triangle3' alt='triangle' />
            </div>

            <div className="user-animation8">
                <img src={`${WEBSITE_URL}/homeimages/user-animation8.svg`} className='user-cross' alt='cross' />
            </div>

            </div>

            <div className="container">
            <div className="section d-flex flex-column align-items-center justify-content-center">
                <h2>What Our Client Say</h2>
                <div className="bar"></div>

                {/* <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p> */}
            </div>

            <div className="feedback mt-4">
            <div className="row">
                <div className="col-lg-7 col-md-9 mx-auto">
                <Usersslider />
                </div>
            </div>
            </div>

            </div>

           

        </div>
    </>
  )
}

export default Testimonials