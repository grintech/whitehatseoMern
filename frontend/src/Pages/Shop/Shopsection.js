import { React, useState, useEffect } from 'react'
import axios from 'axios';
import "./shop.css"
import Navbar from '../../Components/Navbar'
import { Link } from 'react-router-dom';
import Footer from '../../Components/Footer';

const BASE_URL = process.env.REACT_APP_URL;

const Shopsection = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/products`);
        setProducts(response.data);
        // console.log(response.data);
      } catch (error) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);



  return (
    <div className='shop_page'>
      <Navbar />

      <div className='container3'>
        <div className='header'>
          <div className='box'>
            <h2>Products</h2>

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

      <div className='shop-section'>

        <div className='container'>

          <div className='products_heading '>

            <div className='row'>

              <div className='col-lg-9'>
                <div className='products_count'>
                  <p>Showing 1-8 of 14 results</p>

                </div>

              </div>

              <div className='col-lg-3 col-md-6 col-sm-6 '>
                <div className='products_popularity'>
                  <select className='selection'>
                    <option value={1}>Sort by Popularity </option>
                    <option value={2}>Sort by Average Rating </option>
                    <option value={3}>Sort by Latest </option>
                    <option value={4}>Sort by Price: Low to High </option>
                    <option value={5}>Sort by Price: High to Low </option>
                    <option value={6}>Sort by New</option>
                  </select>
                </div>
              </div>

            </div>

          </div>



          <div className='row'>
            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}

            {!loading && products.map((product, index) => (
              <div className='col-lg-3 col-md-6 col-sm-6' key={index}>
                <div className='single-product'>
                  <div className='product-img'>
                    <img src={`/productimg/${product.image}`} className='img1' alt='' />
                    <ul className='d-flex align-items-center'>

                      <li>
                        <button type='button' className='no-border-btn m-2'>
                          <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                      </li>

                      <li>
                        <button type='button' className='no-border-btn m-2'>
                          <i className="fa-regular fa-heart"></i>
                        </button>
                      </li>

                      <li className=''>
                        <button type='button' className='no-border-btn m-2'>
                          <i className="fa-solid fa-share"></i>
                        </button>
                      </li>

                    </ul>
                  </div>

                  <div className='product-content py-4'>

                    <Link to=""><h3>{product.name}</h3></Link>
                    <span><b> Rs</b> {product.discountPrice}</span>
                    <ul className='d-flex justify-content-center mt-2 p-0'>
                      <li><i className="fa-regular fa-star"></i></li>
                      <li><i className="fa-regular fa-star"></i></li>
                      <li><i className="fa-regular fa-star"></i></li>
                      <li><i className="fa-regular fa-star"></i></li>
                      <li><i className="fa-regular fa-star"></i></li>
                    </ul>

                    <Link to=""><button className='add-to-cart'>ADD TO CART</button></Link>

                  </div>
                </div>
              </div>
            ))
            }



            {/* <div className='col-lg-3 col-md-6 col-sm-6 '>
              <div className='single-product'>
                <div className='product-img'>
                  <img src='shopimages/shop-image2.jpg' className='img2' alt='t-shirt' />
                  <ul className='d-flex'>

                    <li>
                      <button type='button' className='no-border-btn m-2'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </button>
                    </li>

                    <li>
                      <button type='button' className='no-border-btn m-2'>
                        <i className="fa-regular fa-heart"></i>
                      </button>
                    </li>

                    <li className=''>
                      <button type='button' className='no-border-btn m-2'>
                        <i className="fa-solid fa-share"></i>
                      </button>
                    </li>

                  </ul>
                </div>

                <div className='product-content m-5'>

                  <Link to="/wood-pencil"><h3>T-Shirt</h3></Link>
                  <span>
                    $22.99
                  </span>
                  <ul className='d-flex mt-2'>
                    <li><i className="fa-regular fa-star"></i></li>
                    <li><i className="fa-regular fa-star"></i></li>
                    <li><i className="fa-regular fa-star"></i></li>
                    <li><i className="fa-regular fa-star"></i></li>
                    <li><i className="fa-regular fa-star"></i></li>
                  </ul>

                  <Link to="/shop"><button className='add-to-cart'>ADD TO CART</button></Link>

                </div>
              </div>
            </div>

            <div className='col-lg-3 col-md-6 col-sm-6 '>
              <div className='single-product'>
                <div className='product-img'>
                  <img src='shopimages/shop-image3.jpg' className='img3' alt='shoe' />
                  <ul className='d-flex align-items-center'>

                    <li>
                      <button type='button' className='no-border-btn m-2'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </button>
                    </li>

                    <li>
                      <button type='button' className='no-border-btn m-2'>
                        <i className="fa-regular fa-heart"></i>
                      </button>
                    </li>

                    <li className=''>
                      <button type='button' className='no-border-btn m-2'>
                        <i className="fa-solid fa-share"></i>
                      </button>
                    </li>

                  </ul>
                </div>

                <div className='product-content m-5'>

                  <Link to="/wood-pencil"><h3>Casual Shoe</h3></Link>
                  <span>
                    $31.99
                  </span>
                  <ul className='d-flex mt-2'>
                    <li><i className="fa-regular fa-star"></i></li>
                    <li><i className="fa-regular fa-star"></i></li>
                    <li><i className="fa-regular fa-star"></i></li>
                    <li><i className="fa-regular fa-star"></i></li>
                    <li><i className="fa-regular fa-star"></i></li>
                  </ul>

                  <Link to="/shop"><button className='add-to-cart'>ADD TO CART</button></Link>

                </div>
              </div>
            </div>

            <div className='col-lg-3 col-md-6 col-sm-6'>
              <div className='single-product'>
                <div className='product-img'>
                  <img src='shopimages/shop-image4.jpg' className='img4' alt='bag' />
                  <ul className='d-flex align-items-center'>

                    <li>
                      <button type='button' className='no-border-btn m-2'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </button>
                    </li>

                    <li>
                      <button type='button' className='no-border-btn m-2'>
                        <i className="fa-regular fa-heart"></i>
                      </button>
                    </li>

                    <li className=''>
                      <button type='button' className='no-border-btn m-2'>
                        <i className="fa-solid fa-share"></i>
                      </button>
                    </li>

                  </ul>
                </div>

                <div className='product-content m-5'>

                  <Link to="/wood-pencil"><h3>Coffee Bag</h3></Link>
                  <span>
                    $4.99
                  </span>
                  <ul className='d-flex mt-2'>
                    <li><i className="fa-regular fa-star"></i></li>
                    <li><i className="fa-regular fa-star"></i></li>
                    <li><i className="fa-regular fa-star"></i></li>
                    <li><i className="fa-regular fa-star"></i></li>
                    <li><i className="fa-regular fa-star"></i></li>
                  </ul>

                  <Link to="/shop"><button className='add-to-cart'>ADD TO CART</button></Link>

                </div>
              </div>
            </div>

            <div className='col-lg-3 col-md-6 col-sm-6'>
              <div className='single-product'>
                <div className='product-img'>
                  <img src='shopimages/shop-image5.jpg' className='img5' alt='chair' />
                  <ul className='d-flex align-items-center'>

                    <li>
                      <button type='button' className='no-border-btn m-2'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </button>
                    </li>

                    <li>
                      <button type='button' className='no-border-btn m-2'>
                        <i className="fa-regular fa-heart"></i>
                      </button>
                    </li>

                    <li className=''>
                      <button type='button' className='no-border-btn m-2'>
                        <i className="fa-solid fa-share"></i>
                      </button>
                    </li>

                  </ul>
                </div>

                <div className='product-content m-5'>

                  <Link to="/wood-pencil"><h3>Single Chair</h3></Link>
                  <span>
                    $149.99
                  </span>
                  <ul className='d-flex mt-2'>
                    <li><i className="fa-regular fa-star"></i></li>
                    <li><i className="fa-regular fa-star"></i></li>
                    <li><i className="fa-regular fa-star"></i></li>
                    <li><i className="fa-regular fa-star"></i></li>
                    <li><i className="fa-regular fa-star"></i></li>
                  </ul>

                  <Link to="/shop"><button className='add-to-cart'>ADD TO CART</button></Link>

                </div>
              </div>
            </div>

            <div className='col-lg-3 col-md-6 col-sm-6'>
              <div className='single-product'>
                <div className='product-img'>
                  <img src='shopimages/shop-image6.jpg' className='img6' alt='shopping-card' />
                  <ul className='d-flex align-items-center'>

                    <li>
                      <button type='button' className='no-border-btn m-2'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </button>
                    </li>

                    <li>
                      <button type='button' className='no-border-btn m-2'>
                        <i className="fa-regular fa-heart"></i>
                      </button>
                    </li>

                    <li className=''>
                      <button type='button' className='no-border-btn m-2'>
                        <i className="fa-solid fa-share"></i>
                      </button>
                    </li>

                  </ul>
                </div>

                <div className='product-content m-5'>

                  <Link to="/wood-pencil"><h3>Business Card</h3></Link>
                  <span>
                    $1.99
                  </span>
                  <ul className='d-flex mt-2'>
                    <li><i className="fa-regular fa-star"></i></li>
                    <li><i className="fa-regular fa-star"></i></li>
                    <li><i className="fa-regular fa-star"></i></li>
                    <li><i className="fa-regular fa-star"></i></li>
                    <li><i className="fa-regular fa-star"></i></li>
                  </ul>

                  <Link to="/shop"><button className='add-to-cart'>ADD TO CART</button></Link>

                </div>
              </div>
            </div>

            <div className='col-lg-3 col-md-6 col-sm-6'>
              <div className='single-product'>
                <div className='product-img'>
                  <img src='shopimages/shop-image7.jpg' className='img7' alt='book' />
                  <ul className='d-flex align-items-center'>

                    <li>
                      <button type='button' className='no-border-btn m-2'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </button>
                    </li>

                    <li>
                      <button type='button' className='no-border-btn m-2'>
                        <i className="fa-regular fa-heart"></i>
                      </button>
                    </li>

                    <li className=''>
                      <button type='button' className='no-border-btn m-2'>
                        <i className="fa-solid fa-share"></i>
                      </button>
                    </li>

                  </ul>
                </div>

                <div className='product-content m-5'>

                  <Link to="/wood-pencil"><h3>Book Cover</h3></Link>
                  <span>
                    $3.99
                  </span>
                  <ul className='d-flex mt-2'>
                    <li><i className="fa-regular fa-star"></i></li>
                    <li><i className="fa-regular fa-star"></i></li>
                    <li><i className="fa-regular fa-star"></i></li>
                    <li><i className="fa-regular fa-star"></i></li>
                    <li><i className="fa-regular fa-star"></i></li>
                  </ul>

                  <Link to="/shop"><button className='add-to-cart'>ADD TO CART</button></Link>

                </div>
              </div>
            </div>

            <div className='col-lg-3 col-md-6 col-sm-6'>
              <div className='single-product'>
                <div className='product-img'>
                  <img src='shopimages/shop-image8.jpg' className='img8' alt='clock' />
                  <ul className='d-flex align-items-center'>

                    <li>
                      <button type='button' className='no-border-btn m-2'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </button>
                    </li>

                    <li>
                      <button type='button' className='no-border-btn m-2'>
                        <i className="fa-regular fa-heart"></i>
                      </button>
                    </li>

                    <li className=''>
                      <button type='button' className='no-border-btn m-2'>
                        <i className="fa-solid fa-share"></i>
                      </button>
                    </li>

                  </ul>
                </div>

                <div className='product-content m-5'>

                  <Link to="/wood-pencil"><h3>Wall Watch</h3></Link>
                  <span>
                    $9.99
                  </span>
                  <ul className='d-flex mt-2'>
                    <li><i className="fa-regular fa-star"></i></li>
                    <li><i className="fa-regular fa-star"></i></li>
                    <li><i className="fa-regular fa-star"></i></li>
                    <li><i className="fa-regular fa-star"></i></li>
                    <li><i className="fa-regular fa-star"></i></li>
                  </ul>

                  <Link to="/shop"><button className='add-to-cart'>ADD TO CART</button></Link>

                </div>
              </div>
            </div> */}

            <nav className='mt-5' aria-label="Page navigation example " >
              <ul className="pagination justify-content-center">
                <li className="page-item">
                  <Link className="page-link">Prev</Link>
                </li>
                <li className="page-item"><Link className="page-link active" href="#">1</Link></li>
                <li className="page-item"><Link className="page-link" href="#">2</Link></li>
                <li className="page-item"><Link className="page-link" href="#">3</Link></li>
                <li className="page-item">
                  <Link className="page-link" href="#">Next</Link>
                </li>
              </ul>
            </nav>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Shopsection
