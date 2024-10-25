import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../store/auth';



const WEBSITE_URL = process.env.REACT_APP_FRONTEND;

const Navbar = () => {

  const { logout, isAuthenticated } = useAuth();

  return (
    <nav id="website-navbar1" className="navbar navbar-expand-lg fixed-top ">
      <div className="container">
        <a className="navbar-brand" href="/"><img src={`${WEBSITE_URL}/images/white_logo.png`} style={{width:"100px"}} alt='logo'></img></a>

        <div className='other-option2 d-block d-lg-none ms-auto '>
          {/* <Link className="fa-solid fa-cart-shopping" to='cart'>
            <span>0</span>
          </Link> */}
            <Link to='/contact'>
            <button className="btn-purple1 btn-hover" type="">Support</button>
            </Link>
            { !isAuthenticated() ? (<Link to='/login'>
            <button className="btn-purple2" type="">login</button>
            </Link>) : null }
          </div>

         <div className='d-block d-lg-none me-3'>
         {isAuthenticated() && (
                    <div className="dropdown user_dropdown">
                        <button className="btn btn-secondary dropdown-toggle rounded-circle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className='fa-regular fa-user'></i>
                        </button>
                        <ul className="dropdown-menu">
                            <li><Link target='_blank' className="dropdown-item" to={`${WEBSITE_URL}/dashboard`}>Dashboard</Link></li>
                            <li><Link className="dropdown-item" onClick={logout}>Logout</Link></li>
                        </ul>
                    </div>
                )}
         </div>
        
      
          <button className="navbar-toggler me-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                {/* <span className="navbar-toggler-icon"></span> */}
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </button>


        <div className="collapse navbar-collapse me-4" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " aria-current="page" to="/about">About</Link>
            </li>
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/services">Services</Link>
              </li>
                      
            <li className="nav-item">
              <Link className="nav-link " aria-current="page" to="/blog">Blog</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " aria-current="page" to="/faqs">Faqs</Link>
            </li>
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/contact">Contact</Link>
              </li>
          </ul>
        </div>
          <div className='other-option d-none d-lg-block'>

            {/* <Link className="fa-solid fa-cart-shopping" to='cart'>
              <span>0</span>
            </Link> */}

              <Link to='/contact'>
              <button className="btn-purple1 btn-hover" type="">Support</button>
              </Link>

              {!isAuthenticated() ? (
                        <Link  to='/login'>
                            <button className="btn-purple2" type="">Login</button>
                        </Link>
                    ) : null}

            
          
          </div>
          
          <div className='d-none d-lg-block'>
          {isAuthenticated() && (
                    <div className="dropdown user_dropdown">
                        <button className="btn btn-secondary dropdown-toggle rounded-circle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className='fa-regular fa-user'></i>
                        </button>
                        <ul className="dropdown-menu">
                            <li><Link target='_blank' className="dropdown-item" to={`${WEBSITE_URL}/dashboard`}>Dashboard</Link></li>
                            <li><Link className="dropdown-item" onClick={logout}>Logout</Link></li>
                        </ul>
                    </div>
                )}
          </div>
         



      </div>
    </nav>

  )
}

export default Navbar

