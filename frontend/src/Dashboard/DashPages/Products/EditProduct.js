import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import DashNav from '../../DashNav';
import FootDash from '../../FootDash';
import SmallCard from '../SmallCard';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BASE_URL = process.env.REACT_APP_URL;

const EditProduct = () => {
    const initialFormData = {
        image: '',
        name: '',
        description: '',
        regularPrice: '',
        discountPrice: '',
        productType: 'normal',
        brand: '',
        stock: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [imagePreview, setImagePreview] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/products/${id}`);
                const { image, name, description, regularPrice, discountPrice, productType, brand, stock } = response.data;
                setFormData({ image, name, description, regularPrice, discountPrice, productType, brand, stock });
                setImagePreview(`/productimg/${image}`);
            } catch (error) {
                console.error('Error fetching product data:', error);
                setError('Failed to fetch data');
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        if (e.target.type === 'file') {
            const file = e.target.files[0];
            setFormData({ ...formData, image: file });
            setImagePreview(URL.createObjectURL(file));
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleDescriptionChange = (content) => {
        setFormData({ ...formData, description: content });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const formDataWithFile = new FormData();
            formDataWithFile.append('image', formData.image);
            formDataWithFile.append('name', formData.name);
            formDataWithFile.append('description', formData.description);
            formDataWithFile.append('regularPrice', formData.regularPrice);
            formDataWithFile.append('discountPrice', formData.discountPrice);
            formDataWithFile.append('productType', formData.productType);
            formDataWithFile.append('brand', formData.brand);
            formDataWithFile.append('stock', formData.stock);

            await axios.put(`${BASE_URL}/products/${id}`, formDataWithFile, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSuccess(true);
            
            // Hide success message after 2 seconds
            setTimeout(() => {
                setSuccess("");
            }, 2000);

        } catch (error) {
            setError('Failed to update the product');
            // Hide error message after 2 seconds
            setTimeout(() => {
                setError("");
            }, 2000);
        } finally {
            setLoading(false);
        }
    };

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    return (
        <>
            <div className="main_wrapper">
                <Sidebar />
                <div className="main_content">
                    <DashNav />
                    <div className="mt-3 pb-4 mb-5">
                        <div className="bg-light py-3 px-3">
                            <div className="container-fluid d-flex justify-content-between ">
                                <h4 className='mb-0'>Edit Product</h4>
                                <Link to='/products-list' className="btn btn-warning btn-sm">All Products</Link>
                            </div>
                        </div>
                        <div className="p-3 mt-4">
                            <form onSubmit={handleSubmit}>
                                <div className='d-flex flex-wrap'>
                                    <div className="col-md-8 col-12 px-2 mb-4 mb-md-0">
                                        <div className="bg-white row p-4">
                                            <div className='col-12 mb-3'>
                                                <label htmlFor="name">Product Name</label>
                                                <input
                                                    className='form-control'
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            <div className='col-12 mb-3'>
                                                <label htmlFor="description">Description</label>
                                                <ReactQuill
                                                    theme='snow'
                                                    value={formData.description}
                                                    onChange={handleDescriptionChange}
                                                    modules={modules}
                                                    formats={formats}
                                                    id="description"
                                                />
                                            </div>

                                            <div className='col-12 mb-3'>
                                                <label htmlFor="brand">Brand</label>
                                                <input
                                                    className='form-control'
                                                    type="text"
                                                    id="brand"
                                                    name="brand"
                                                    value={formData.brand}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <label htmlFor="regularPrice">Regular Price</label>
                                                <input
                                                    className='form-control'
                                                    type="number"
                                                    id="regularPrice"
                                                    name="regularPrice"
                                                    value={formData.regularPrice}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <label htmlFor="discountPrice">Discount Price</label>
                                                <input
                                                    className='form-control'
                                                    type="number"
                                                    id="discountPrice"
                                                    name="discountPrice"
                                                    value={formData.discountPrice}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <label htmlFor="productType">Product Type</label>
                                                <select
                                                    className='form-control'
                                                    id="productType"
                                                    name="productType"
                                                    value={formData.productType}
                                                    onChange={handleChange}
                                                >
                                                    <option value="normal">Normal</option>
                                                    <option value="variation">Variation</option>
                                                </select>
                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <label htmlFor="stock">Stock</label>
                                                <input
                                                    className='form-control'
                                                    type="number"
                                                    id="stock"
                                                    name="stock"
                                                    value={formData.stock}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                           
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-12 ">
                                        <SmallCard />

                                        <div className="bg-white p-4 mb-4">
                                            <div className='mb-3'>
                                                <label htmlFor="image">Image:</label>
                                                {imagePreview && (
                                                    <div>
                                                        <img
                                                            src={imagePreview}
                                                            alt="Current Product"
                                                            style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '10px' }}
                                                        />
                                                    </div>
                                                )}
                                                <input
                                                    className='form-control'
                                                    type="file"
                                                    id="image"
                                                    name="image"
                                                    onChange={handleChange}
                                                    accept="image/*"
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="btn btn-primary rounded-0 mt-3"
                                                disabled={loading}
                                            >
                                                {loading ? 'Updating...' : 'Update'}
                                            </button>

                                            {success && <h6 className="text-success mt-3">Product updated successfully!</h6>}
                                            {error && <h6 className="text-danger mt-3">{error}</h6>}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <FootDash />
                </div>
            </div>
        </>
    );
};

export default EditProduct;
