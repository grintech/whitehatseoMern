import React from 'react'
import Sidebar from '../../Sidebar'
import DashNav from '../../DashNav'
import FootDash from '../../FootDash'
import { Link } from 'react-router-dom'

const Profile = () => {
  return (
    <div>
          <div className="main_wrapper">
        <Sidebar />

        <div className="main_content">
          <DashNav />
          <div>
           <div className="container mt-5 pb-5 mb-5">
                <div className="bg-white ">
                    <div className="card border-0">
                        <div className="card-body">
                             <div className="d-flex justify-content-between flex-wrap py-3">
                             <h3 className='m-0'>Profile</h3>
                             <Link className='btn btn-warning btn-sm '>Edit<i className="fa-solid fa-pencil ms-2"></i></Link>
                             </div>
                               <div className='position-relative'>
                               <img src="/image.png" className='w-100' style={{height:"350px", objectFit:"cover", borderRadius:"10px"}} alt="img" />
                              <img src="/team1.jpg"  className=' profile_img shadow'  alt="img" />
                               </div>

                              <div className="row mt-5 pt-3">
                              <h3 className='text-center'>About Me</h3>
                                
                                <div className="col-12 mt-3">
                                    <h4>Bio</h4>
                                    {/* <div className="d-flex">
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                    </div> */}
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, temporibus. Quam accusamus eaque architecto a assumenda, repudiandae voluptates repellat recusandae fuga in molestiae error vero ducimus quis at porro aspernatur.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, temporibus. Quam accusamus eaque architecto a assumenda, repudiandae voluptates repellat recusandae fuga in molestiae error vero ducimus quis at porro aspernatur.</p>
                                    
                                </div>
                              </div>
                              <div className="row mt-4">
                                <h5 className='mb-3'>Profile Details</h5>
                                <div className="col-lg-6">
                                <div className="row mb-3">
                                <div className="col-md-4"><b>Name:</b></div>
                                <div className="col-md-8">Emily Wilson</div>
                                </div>
                                <div className="row mb-3">
                                  <div className="col-md-4"><b>Email Id:</b></div>
                                  <div className="col-md-8">emily123@example.com</div>
                                </div>
                                <div className="row mb-3">
                                  <div className="col-md-4"><b>Phone:</b></div>
                                  <div className="col-md-8">8797879799</div>
                                </div>
                                <div className="row mb-3">
                                  <div className="col-md-4"><b>Address:</b></div>
                                  <div className="col-md-8">#123 street road</div>
                                </div>
                                <div className="row mb-3">
                                  <div className="col-md-4"><b>Zipcode:</b></div>
                                  <div className="col-md-8">133302</div>
                                </div>
                                <div className="row mb-3">
                                  <div className="col-md-4"><b>Twitter:</b></div>
                                  <div className="col-md-8">https://twitter.com</div>
                                </div>
                                <div className="row mb-3">
                                  <div className="col-md-4"><b>Instagram:</b></div>
                                  <div className="col-md-8">https://instagram.com</div>
                                </div>
                                </div>
                                <div className="col-lg-6">
                                <div className="row mb-3">
                                <div className="col-md-4"><b>Country:</b></div>
                                <div className="col-md-8">USA</div>
                                </div>
                                <div className="row mb-3">
                                  <div className="col-md-4"><b>State</b></div>
                                  <div className="col-md-8">California</div>
                                </div>
                                <div className="row mb-3">
                                  <div className="col-md-4"><b>City:</b></div>
                                  <div className="col-md-8">xyzzzz</div>
                                </div>
                                <div className="row mb-3">
                                  <div className="col-md-4"><b>Address:</b></div>
                                  <div className="col-md-8">#123 street road</div>
                                </div>
                                <div className="row mb-3">
                                  <div className="col-md-4"><b>Zipcode:</b></div>
                                  <div className="col-md-8">133302</div>
                                </div>
                                <div className="row mb-3">
                                  <div className="col-md-4"><b>Twitter:</b></div>
                                  <div className="col-md-8">https://twitter.com</div>
                                </div>
                                <div className="row mb-3">
                                  <div className="col-md-4"><b>Instagram:</b></div>
                                  <div className="col-md-8">https://instagram.com</div>
                                </div>
                                </div>
                              </div>
                        </div>
                    </div>
                </div>
           </div>

           <FootDash />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile