import React from 'react'

import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import Allblogs from './Allblogs'


const Blogsection = () => {
  return (
    <>
      <div className='blogpage'>

        <Navbar />

        <div className='container3'>
          <div className='header'>
            <div className='box'>
              <h2>Blog Grid</h2>

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

        <Allblogs />


        <Footer />


      </div>



    </>
  )
}

export default Blogsection
