import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Banner from './Banner'
import "./homepage.css"
import Cards from './Cards'
import Homesection from './Homesection'
import Features from './Features'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import Readytotalk from '../../Components/Readytotalk'



const BASE_URL = process.env.REACT_APP_URL;



const Homepage = () => {

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchBlogs = async () => {
          try {
              const response = await axios.get(`${BASE_URL}/blog`);
              setBlogs(response.data);
          } catch (error) {
              setError('Failed to fetch blogs');
              console.error(error);
          } finally {
              setLoading(false);
          }
      };

      fetchBlogs();
  }, []);


  return (
    <div className='full_home_page'>
      <Navbar/>
      <Banner/>
      <Cards />
      <Homesection/>
      <Features/>
      <Readytotalk />
      <div className='mt-5 pt-5 blogs'>
        <div className='col-lg-6 col-md-8 mx-auto d-flex flex-column align-items-center justify-content-center '>
        <h2>The News From Our Blog</h2>
        <div className='bar'></div>
        <p className='text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>

        <div className='container'>
                <div className='row mt-5'>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-danger">{error}</p>}
                    {!loading && !error && blogs.slice(0, 3).map((blog) => (
                        <div className='col-lg-4 col-md-6 mb-5' key={blog._id}>
                            <div className='single-blog'>
                                <img src={`/blogimg/${blog.image}`} className='img1' alt='blog' />
                                <div className='content position-relative'>
                                    <div className='dates'>
                                        <i className="fa-solid fa-calendar-days"></i>
                                        {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' })}
                                    </div>
                                    <h3>{blog.heading}</h3>
                                    <p>By Admin</p>
                                    <p dangerouslySetInnerHTML={{ __html: blog.description }} />
                                    <Link>Read more <i className='fa-solid fa-arrow-right'></i></Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
      

      </div>
      <Footer />
   
      
     
   
    </div>


  )
}

export default Homepage
