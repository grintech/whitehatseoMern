import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

import Sidebar from '../../Sidebar';
import DashNav from '../../DashNav';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import SmallCard from '../SmallCard';
import FootDash from '../../FootDash';

const BASE_URL = process.env.REACT_APP_URL;

const EditTest = () => {
    const initialFormData = {
        image: '',
        title: '',
        role: '',
        description: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [imagePreview, setImagePreview] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);  // State for success message
    const { id } = useParams();

    useEffect(() => {
        const fetchTeamMember = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/testimonial/${id}`);
                const { image, title, role, description } = response.data;
                setFormData({ image, title, role, description });
                setImagePreview(`/testimg/${image}`);
            } catch (error) {
                console.error('Error fetching testimonial :', error);
                setError('Failed to fetch data');
            }
        };

        fetchTeamMember();
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
        setSuccess(null);  // Reset success message

        try {
            const formDataWithFile = new FormData();
            formDataWithFile.append('image', formData.image);
            formDataWithFile.append('title', formData.title);
            formDataWithFile.append('role', formData.role);
            formDataWithFile.append('description', formData.description);

            await axios.put(`${BASE_URL}/testimonial/${id}`, formDataWithFile, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSuccess('Testimonial updated successfully!');  // Set success message

              // Hide success message after 2 seconds
              setTimeout(() => {
                setSuccess("");
            }, 2000);

        } catch (error) {
            console.error('Error updating testimonial:', error);
            setError('Failed to update testimonial');

            setTimeout(() => {
                setError("");
            }, 2000);

        } finally {
            setLoading(false);
        }
    };

    const modules = {
        toolbar: [
            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
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
                            <div className="container-fluid d-flex justify-content-between">
                                <h5 className='mb-0'>Edit Testimonial</h5>
                                <Link to='/testimonial-list' className="btn btn-warning btn-sm">All Testimonials</Link>
                            </div>
                        </div>
                        <div className="p-3 mt-4">
                            <form onSubmit={handleSubmit}>
                                <div className='d-flex flex-column flex-lg-row'>
                                    <div className="col-lg-8 px-2">
                                        <div className="bg-white p-4">
                                            <div className='mb-3'>
                                                <label htmlFor="title">Title:</label>
                                                <input className='form-control' type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
                                            </div>
                                            <div className='mb-3'>
                                                <label htmlFor="role">Role:</label>
                                                <input className='form-control' type="text" id="role" name="role" value={formData.role} onChange={handleChange} required />
                                            </div>
                                            <div className='mb-3'>
                                                <label htmlFor="description">Description:</label>
                                                <ReactQuill
                                                    theme='snow'
                                                    value={formData.description}
                                                    onChange={handleDescriptionChange}
                                                    modules={modules}
                                                    formats={formats}
                                                    id="description"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 px-2">
                                        <SmallCard />
                                        <div className="bg-white p-4 mb-4">
                                            <div className='mb-3'>
                                                <label htmlFor="image">Image:</label>
                                                {imagePreview && (
                                                    <div>
                                                        <img
                                                            src={imagePreview}
                                                            alt="Current Team Member"
                                                            style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '10px' }}
                                                        />
                                                    </div>
                                                )}
                                                <input className='form-control' type="file" id="image" name="image" onChange={handleChange} accept="image/*" />
                                            </div>
                                            <button type="submit" className="btn btn-primary rounded-0 mt-3" disabled={loading}>
                                                {loading ? 'Updating...' : 'Update'}
                                            </button>
                                            {success && <p className="text-success mt-3">{success}</p>}
                                            {error && <p className="text-danger mt-3">{error}</p>}
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

export default EditTest;
