import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import DashNav from '../../DashNav';


import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SmallCard from '../SmallCard';
import FootDash from '../../FootDash';

const BASE_URL = process.env.REACT_APP_URL;

const AddWork = () => {
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
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
            formData.append('title', title);
            formData.append('description', description);

            await axios.post(`${BASE_URL}/work`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setSuccessMessage('New Work Created Successfully!');
            setErrorMessage(''); // Clear any previous error message

            // Reset form fields after successful submission
            setImage('');
            setImagePreview('');
            setTitle('');
            setDescription('');
            e.target.reset(); // Reset form fields

            // Hide success message after 2 seconds
            setTimeout(() => {
                setSuccessMessage('');
            }, 2000);
        } catch (error) {
            setErrorMessage('Error creating work item. Please try again.');
            setSuccessMessage(''); // Clear any previous success message

            // Hide error message after 2 seconds
            setTimeout(() => {
                setErrorMessage('');
            }, 2000);
        }
    };

 // ------------React Quill---------------

    const modules = {
        toolbar: [
          [{ header: "1" }, { header: "2" }, { font: [] }],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
      };
    
      const formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
      ];

    return (
        <>  
                <div className="main_wrapper">
                <Sidebar />
              
                <div className="main_content">
                   <DashNav />
                   <div className='container-fluid pt-4 mb-5 pb-5'>
                <div className=" py-3">
                    <div className="container-fluid d-flex justify-content-between">
                        <h4 className='mb-0'>Add Work</h4>
                        <Link to='/work-list' className="btn btn-warning btn-sm">All Works</Link>
                    </div>
                </div>
                <div className=' mt-4'>
                    <form onSubmit={handleSubmit}>
                        <div className="d-flex flex-wrap">
                            <div className="col-md-8 col-12 px-2 mb-4 mb-md-0">
                                <div className="bg-white p-4">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input
                                        className='form-control'
                                        type="text"
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">
                                    Description
                                    </label>
                                    <ReactQuill
                                    theme="snow"
                                    value={description}
                                    onChange={(content) => setDescription(content)}
                                    modules={modules}
                                    formats={formats}
                                    id="description"
                                    />
                                </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-12 px-2">
                                <SmallCard />
                                <div className="bg-white p-4">
                                <div className="mb-3">
                            <label htmlFor="image" className="form-label">Image</label>
                            {imagePreview && (
                               <div>
                                 <img
                                    src={imagePreview}
                                    alt="Preview"
                                    style={{ width: '70px', height: '70px', objectFit: 'cover', marginBottom: '15px'}}
                                />
                                 </div>
                            )}
                            <input
                                className='form-control'
                                type="file"
                                id="image"
                                onChange={handleImageChange}
                                accept="image/*"
                                required
                            />
                          
                                </div>
                                <button type="submit" className="btn btn-primary rounded-0 mt-3">Submit</button>
                                {successMessage && <h6 className="text-success mt-3">{successMessage}</h6>}
                                {errorMessage && <h6 className="text-danger mt-3">{errorMessage}</h6>}
                                </div>
                            </div>
                        </div>
                      
                        
                        {/* <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <input
                                className='form-control'
                                type="text"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div> */}

                       
                    </form>
                </div>
                  </div>

                  <FootDash />
                </div>
            </div>

          

        </>
    );
};

export default AddWork;
