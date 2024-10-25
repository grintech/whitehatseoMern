import React from 'react'
import { Link } from 'react-router-dom'


const StripeSuccess = () => {
  return (
   <>
        <div className="stripe_card ">
            <img src="images/white_logo.png" style={{width:"150px"}} alt="" />
            <div className="card border-0 shadow mt-5">
                <div className="card-body text-center d-flex flex-column p-3 py-lg-5 px-lg-4">
                    <i className="fa-solid fa-check-circle text-green"></i>
                    <h2 className='text-green fw-bold mb-2'>Your payment was <br />succcessful </h2>
                    <p className='m-0'>Thank you for subscribing us !</p>
                    <Link to='/' className=' mt-3 rounded-0'>Back to home</Link>
                </div>
            </div>
           
        </div>
   </>
  )
}

export default StripeSuccess