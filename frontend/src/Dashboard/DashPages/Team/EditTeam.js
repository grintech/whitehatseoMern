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

const EditTeam = () => {
    const initialFormData = {
        image: '',
        title: '',
        role: '',
        description: '',
        link1: '', // New link fields
        link2: '',
        link3: '',
        link4: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [imagePreview, setImagePreview] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null); // State for success message
    const { id } = useParams();

    useEffect(() => {
        const fetchTeamMember = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/team/${id}`);
                const { image, title, role, description, link1, link2, link3, link4 } = response.data; // Include links
                setFormData({ image, title, role, description, link1, link2, link3, link4 }); // Include links
                setImagePreview(`/teamimg/${image}`);
            } catch (error) {
                console.error('Error fetching team member:', error);
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
        setSuccess(null); // Reset success message

        try {
            const formDataWithFile = new FormData();
            formDataWithFile.append('image', formData.image);
            formDataWithFile.append('title', formData.title);
            formDataWithFile.append('role', formData.role);
            formDataWithFile.append('description', formData.description);
            formDataWithFile.append('link1', formData.link1); // Append links
            formDataWithFile.append('link2', formData.link2); // Append links
            formDataWithFile.append('link3', formData.link3); // Append links
            formDataWithFile.append('link4', formData.link4); // Append links

            await axios.put(`${BASE_URL}/team/${id}`, formDataWithFile, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSuccess('Team member updated successfully!'); // Set success message

            // Hide success message after 2 seconds
            setTimeout(() => {
                setSuccess("");
            }, 2000);

        } catch (error) {
            console.error('Error updating team member:', error);
            setError('Failed to update team member');

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
                            <div className="container-fluid d-flex justify-content-between">
                                <h5 className='mb-0'>Edit Team</h5>
                                <Link to='/team-list' className="btn btn-warning btn-sm">All Team</Link>
                            </div>
                        </div>
                        <div className="p-3 mt-4">
                            <form onSubmit={handleSubmit}>
                                <div className='d-flex flex-wrap'>
                                    <div className="col-md-8 col-12 px-2 mb-4 mb-md-0">
                                        <div className="bg-white row p-4">
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
                                            <div className='col-lg-6 mb-3'>
                                                <label htmlFor="link1">Link 1:</label>
                                                <input
                                                    className='form-control'
                                                    type="text"
                                                    id="link1"
                                                    name="link1"
                                                    value={formData.link1}
                                                    onChange={handleChange}
                                                    placeholder="Enter link"
                                                />
                                            </div>
                                            <div className='col-lg-6 mb-3'>
                                                <label htmlFor="link2">Link 2:</label>
                                                <input
                                                    className='form-control'
                                                    type="text"
                                                    id="link2"
                                                    name="link2"
                                                    value={formData.link2}
                                                    onChange={handleChange}
                                                    placeholder="Enter link"
                                                />
                                            </div>
                                            <div className='col-lg-6 mb-3'>
                                                <label htmlFor="link3">Link 3:</label>
                                                <input
                                                    className='form-control'
                                                    type="text"
                                                    id="link3"
                                                    name="link3"
                                                    value={formData.link3}
                                                    onChange={handleChange}
                                                    placeholder="Enter link"
                                                />
                                            </div>
                                            <div className='col-lg-6 mb-3'>
                                                <label htmlFor="link4">Link 4:</label>
                                                <input
                                                    className='form-control'
                                                    type="text"
                                                    id="link4"
                                                    name="link4"
                                                    value={formData.link4}
                                                    onChange={handleChange}
                                                    placeholder="Enter link"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-12 px-2">
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

export default EditTeam;
