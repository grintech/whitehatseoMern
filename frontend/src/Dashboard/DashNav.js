import {React} from 'react'
import { Link } from 'react-router-dom'; 

import { useAuth } from '../store/auth';

const WEBSITE_URL = process.env.REACT_APP_FRONTEND;

const DashNav = () => {
    const { logout, toggleSidebar } = useAuth();
   
  return (
    <>
         <nav className="navbar navbar-expand-lg bg-body-tertiary px-2">
            <div className="container-fluid">
                {/* <Link className="navbar-brand" href="#">Navbar</Link> */}

                <i className="fa-solid fa-bars toggle_bar " onClick={toggleSidebar}></i>

                <form className=" form-inline ms-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                    <div className="input-group">
                        <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                                <i className="fas fa-search fa-sm"></i>
                            </button>
                        </div>
                    </div>
                </form>
                <ul className="navbar-nav   mb-lg-0">
                    <li className="nav-item dropdown message_icon">
                    <Link className="text-center dropdown-toggle" href="#" role="button"     data-bs-toggle="dropdown" aria-expanded="false">
                        <div className='position-relative'>
                            <i className="fa-solid fa-envelope"></i>
                            <span className="msg_count">2</span>
                        </div>
                    </Link>
                    <ul className="dropdown-menu shadow border-0">
                        <h6 className='text-uppercase m-0'>Alert center</h6>
                        <li><Link className="dropdown-item" href="#">
                            <div>
                            <div className="small text-gray-500">December 12, 2019</div>
                            <span className="small text-dark font-weight-bold text-wrap">A new monthly report is ready to download!</span>
                        </div>
                        </Link></li>
                        <hr className='m-0' />
                        <li><Link className="dropdown-item" href="#">
                            <div>
                            <div className="small text-gray-500">December 12, 2019</div>
                            <span className="small text-dark font-weight-bold text-wrap">A new monthly report is ready to download!</span>
                        </div>
                        </Link></li>
                        <hr className='m-0' />
                        <li><Link className="dropdown-item small text-gray-500 " href="#">Show All Alerts</Link></li>
                    </ul>
                    </li>
                    <li className="nav-item dropdown user_item  border-start">
                        <Link className="nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img style={{width:"35px",height:"35px", borderRadius:"50%"}}
                            src={`${WEBSITE_URL}/user.png`} alt="user" />
                            {/* <i className='fa-regular fa-user'></i> */}
                        </Link>
                        <ul className="dropdown-menu shadow border-0">
                            <li><Link className="dropdown-item" to=" "><i className='fa-solid fa-user w-auto me-2'></i> Profile</Link></li>
                            <li><Link className="dropdown-item" href="#"><i className='fa-solid fa-user fa-gear w-auto me-2'></i> Settings</Link></li>
                            <hr className='m-0' />
                            <li><Link type='button' onClick={logout} className="dropdown-item" href="#"><i className="fa-solid fa-right-from-bracket w-auto me-2"></i> Logout</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    </>
  )
}

export default DashNav