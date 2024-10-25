import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar";

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Footer from "../../Components/Footer";


const BASE_URL = process.env.REACT_APP_URL;
const WEBSITE_URL = process.env.REACT_APP_FRONTEND;

const SingleBlog = () => {
  const { slug } = useParams(); // Get slug from the URL
  const [data, setData] =useState('');
  const [images, setImages] = useState([]);
  const [blogContent, setBlogContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    const fetchBlogContent = async () => {
      try {
        const response = await fetch(`${BASE_URL}/single-blog/slug/${slug}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setData(data);
        setBlogContent(data.description);

          // Assuming 'images' is an array in the API response
        if (data.images && data.images.length > 0) {
          setImages(data.images); // Set all images
        }

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogContent();
  }, [slug]); 

  useEffect(() => {
    // Set image styles after content is rendered
    const adjustImageStyles = () => {
        const images = document.querySelectorAll('.blog_content img');
        if (images.length > 0) {
            images[0].style.width = '100%'; // Set first image to full width
            for (let i = 1; i < images.length; i++) {
                images[i].style.width = '50%'; // Set other images to 50%
            }
        }
    };

    adjustImageStyles();
}, [blogContent]);

  return (
    <>
      <Navbar />

      <div className="container3">
        <div className="header">
          <div className="box">
            <h2>Blog Detail</h2>

            <div className="all-animation">
              <div className="all-animation1">
                <img
                  src={`${WEBSITE_URL}/all-animations/all-animation1.png`}
                  className="circle-img"
                  alt="moon"
                />
              </div>

              <div className="all-animation2">
                <img
                  src={`${WEBSITE_URL}/all-animations/all-animation2.svg`}
                  className="cross-img"
                  alt="cross"
                />
              </div>

              <div className="all-animation3">
                <img
                  src={`${WEBSITE_URL}/all-animations/all-animation3.svg`}
                  className="circle-img"
                  alt="circle"
                />
              </div>

              <div className="all-animation4">
                <img
                  src={`${WEBSITE_URL}/all-animations/all-animation4.svg`}
                  className="triangle-img"
                  alt="triangle"
                />
              </div>

              <div className="all-animation5">
                <img
                  src={`${WEBSITE_URL}/all-animations/all-animation5.png`}
                  className="design1"
                  alt="zig-zag"
                />
              </div>

              <div className="all-animation6">
                <img
                  src={`${WEBSITE_URL}/all-animations/all-animation6.svg`}
                  className="triangle3"
                  alt="triangle"
                />
              </div>

              <div className="all-animation7">
                <img
                  src={`${WEBSITE_URL}/all-animations/all-animation7.svg`}
                  className="triangle3"
                  alt="triangle"
                />
              </div>

              <div className="all-animation8">
                <img
                  src={`${WEBSITE_URL}/all-animations/all-animation8.svg`}
                  className="triangle3"
                  alt="triangle"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="blog_details py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-9 pe-md-5">


              {loading ? ( <p>Loading...</p>) : error ? (  <p>Error: {error}</p>  ) : (
              <>
                 <h1>{data.heading}</h1>
                <div className="blog_content" dangerouslySetInnerHTML={{ __html: blogContent }}></div>
              </>
              )}
            </div>
            <div className="col-md-3 gallery_view ps-md-3">
              <h4>Gallery</h4>
              <div className="row">
              {images.map((image, index) => (
              <div className="col-md-4 pe-2 p-0" key={index}>
                <img
                  className="w-100 mb-2 "
                  src={`${WEBSITE_URL}/singleblogimg/${image}`}
                  alt={`Blog image ${index + 1}`}
                  onClick={() => {
                    setPhotoIndex(index);
                    setIsOpen(true);
                  }}
                  style={{ cursor: 'pointer' }} 
                />
              </div>
               ))}

              {/* Lightbox Modal */}
              {isOpen && (
                <Lightbox
                  mainSrc={`${WEBSITE_URL}/singleblogimg/${images[photoIndex]}`}
                  nextSrc={`${WEBSITE_URL}/singleblogimg/${images[(photoIndex + 1) % images.length]}`}
                  prevSrc={`${WEBSITE_URL}/singleblogimg/${images[(photoIndex + images.length - 1) % images.length]}`}
                  onCloseRequest={() => setIsOpen(false)}
                  onMovePrevRequest={() =>
                    setPhotoIndex((photoIndex + images.length - 1) % images.length)
                  }
                  onMoveNextRequest={() =>
                    setPhotoIndex((photoIndex + 1) % images.length)
                  }
                  enableZoom={true}  
                />
              )}

              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SingleBlog;
