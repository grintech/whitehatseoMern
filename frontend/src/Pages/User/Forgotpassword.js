import React from 'react'
import "./user.css"
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'


const Forgotpassword = () => {
    return (
        <div className='forgot_password'>

            <Navbar />
            <div className='container3'>
                <div className='header'>
                    <div className='box'>
                        <h2>Forgot Password</h2>
                    </div>
                </div>


            </div>


            <div className='container6'>

                <div className='single-form '>

                    <div className='form-details'>
                        <img src="images/white_logo.png" style={{width:"100px"}} alt="logo"></img>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                        </p>
                    </div>

                    <form>
                        <div className='headings mb-3'>
                            <label className='form-label'>Email</label>
                            <input type='email' className='form-control'></input>
                        </div>
                        <button type='submit' className='btn btn-primary'>RESET PASSWORD</button>
                    </form>


                </div>
            </div>

           <Footer />

        </div>
    )
}

export default Forgotpassword
