import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Sidebar from '../../Sidebar';
import DashNav from '../../DashNav';
import SmallCard from '../SmallCard';
import FootDash from '../../FootDash';

const BASE_URL = process.env.REACT_APP_URL;

const ProductForm = () => {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [regularPrice, setRegularPrice] = useState('');
    const [discountPrice, setDiscountPrice] = useState('');
    const [productType, setProductType] = useState('normal');
    const [brand, setBrand] = useState('');
    const [stock, setStock] = useState('');
    const [rating, setRating] = useState('');

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('name', name);
            formData.append('description', description);
            formData.append('regularPrice', regularPrice);
            formData.append('discountPrice', discountPrice);
            formData.append('productType', productType);
            formData.append('brand', brand);
            formData.append('stock', stock);
            formData.append('rating', rating);

            await axios.post(`${BASE_URL}/products`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setSuccessMessage('Product Created Successfully!');
            setErrorMessage(''); // Clear any previous error message

            // alert('Product created successfully!');
            // Reset form fields after successful submission
            setImage(null);
            setImagePreview('');
            setName('');
            setDescription('');
            setRegularPrice('');
            setDiscountPrice('');
            setProductType('normal');
            setBrand('');
            setStock('');
            setRating('');

             // Hide success message after 2 seconds
             setTimeout(() => {
                setSuccessMessage('');
            }, 2000);

        } catch (error) {
            setErrorMessage('Error creating product . Please try again.');
            setSuccessMessage(''); // Clear any previous success message

            // Hide error message after 2 seconds
            setTimeout(() => {
                setErrorMessage('');
            }, 2000);
        }
    };

    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image'],
            ['clean'],
        ],
    };

    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
    ];

    return (

        <div className="main_wrapper">
        <Sidebar />
      
        <div className="main_content">
           <DashNav />
           <div className="container-fluid pt-4 mb-5 pb-5">
            <div className="py-3">
                <div className="container-fluid d-flex justify-content-between">
                    <h4 className="mb-0">Add Product</h4>
                    <Link to="/products-list" className="btn btn-warning btn-sm">
                        All Products
                    </Link>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className=" d-flex flex-wrap">
                    <div className="col-md-8 col-12 px-2 mb-4 mb-md-0">
                        <div className="bg-white row p-4">
                            <div className="col-12 mb-3">
                                <label htmlFor="name" className="form-label">
                                   Product Name
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-12 mb-3">
                                <label htmlFor="description" className="form-label">
                                Product Description
                                </label>
                                <ReactQuill
                                    theme="snow"
                                    value={description}
                                    onChange={(value) => setDescription(value)}
                                    modules={modules}
                                    formats={formats}
                                />
                            </div>
                            <div className="col-12 mb-3">
                                <label htmlFor="brand" className="form-label">
                                    Brand
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="brand"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label htmlFor="regularPrice" className="form-label">
                                    Regular Price
                                </label>
                                <input
                                    className="form-control"
                                    type="number"
                                    id="regularPrice"
                                    value={regularPrice}
                                    onChange={(e) => setRegularPrice(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label htmlFor="discountPrice" className="form-label">
                                    Discount Price
                                </label>
                                <input
                                    className="form-control"
                                    type="number"
                                    id="discountPrice"
                                    value={discountPrice}
                                    onChange={(e) => setDiscountPrice(e.target.value)}
                                />
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label htmlFor="productType" className="form-label">
                                    Product Type
                                </label>
                                <select
                                    className="form-control"
                                    id="productType"
                                    value={productType}
                                    onChange={(e) => setProductType(e.target.value)}
                                >
                                    <option value="normal">Normal</option>
                                    <option value="variation">Variation</option>
                                </select>
                            </div>
                            
                            <div className="col-lg-6 mb-3">
                                <label htmlFor="stock" className="form-label">
                                    Stock
                                </label>
                                <input
                                    className="form-control"
                                    type="number"
                                    id="stock"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    required
                                />
                            </div>
                           
                        </div>
                    </div>
                    <div className="col-lg-4 col-12 px-3">
                        <SmallCard />
                        <div className="bg-white p-4">
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">
                                    Image
                                </label>
                                {imagePreview && (
                                    <div>
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            style={{ width: '70px', height: '70px', objectFit: 'cover', marginBottom: '15px' }}
                                        />
                                    </div>
                                )}
                                <input
                                    className="form-control"
                                    type="file"
                                    id="image"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    required
                                     
                                />
                            </div>
                           
                            <button type="submit" className="btn btn-primary rounded-0 mt-3">
                                Submit
                            </button>

                            {successMessage && <h6 className="text-success mt-3">{successMessage}</h6>}
                            {errorMessage && <h6 className="text-danger mt-3">{errorMessage}</h6>}
                        </div>
                    </div>
                </div>
            </form>
          </div>

          <FootDash />
        </div>
    </div>

      
    );
};

export default ProductForm;
