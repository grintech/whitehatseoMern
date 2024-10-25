import React from 'react'
import { Link } from 'react-router-dom'

const StripeFailed = () => {
  return (
   <>
          <div className="stripe_card stripe_failed">
            <img src="images/white_logo.png" style={{width:"150px"}} alt="" />
            <div className="card border-0 shadow mt-5">
                <div className="card-body text-center d-flex flex-column p-3 py-lg-5 px-lg-4">
                    <i className="fa-solid fa-circle-xmark text-red"></i>
                    <h2 className='text-red fw-bold mb-2'>Your payment <br /> failed </h2>
                    <p className='m-0'>Try again later !</p>
                    <Link to='/' className=' mt-3 rounded-0'>Back to home</Link>
                   
                </div>
            </div>
           
        </div>
   </>
  )
}

export default StripeFailed