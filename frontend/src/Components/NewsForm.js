import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const BASE_URL = process.env.REACT_APP_URL;

const NewsForm = () => {
    const [image, setImage] = useState('');
    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('heading', heading);
            formData.append('description', description);

            const response = await axios.post(`${BASE_URL}/news`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('News item created:', response.data);
            // Optionally reset form fields after successful submission
            setImage('');
            setHeading('');
            setDescription('');
        } catch (error) {
            console.error('Error creating news item:', error);
        }
    };

    return (
        <>
        <Navbar />
            <div className='container mt-5 pt-5'>
                <div className='col-lg-6 col-md-7 col-10 mx-auto bg-success-subtle p-5'>
                    <form onSubmit={handleSubmit}>
                        <h2 className='mb-3'>Create News Here</h2>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Image</label>
                            <input
                            className='form-control'
                                type="file"
                                id="image"
                                onChange={(e) => setImage(e.target.files[0])}
                                accept="image/*"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="heading" className="form-label">Heading</label>
                            <input
                            className='form-control'
                                type="text"
                                id="heading"
                                value={heading}
                                onChange={(e) => setHeading(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <input
                            className='form-control'
                                type="text"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-success rounded-0 mt-3">Submit</button>
                    </form>
                    
                </div>
            </div>
        </>
    );
};

export default NewsForm;
