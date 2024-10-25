import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../../Sidebar";
import DashNav from "../../DashNav";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SmallCard from "../SmallCard";
import FootDash from "../../FootDash";

const BASE_URL = process.env.REACT_APP_URL;

const EditSingleBlog = () => {
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [removedImages, setRemovedImages] = useState([]); // Track removed images
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/single-blog/${id}`);
        const { images, heading, description } = response.data;

        const imagePaths = images.map((image) => `/singleblogimg/${image}`);
        setImages(images); // Store original image filenames
        setImagePreviews(imagePaths);
        setHeading(heading);
        setDescription(description);
      } catch (error) {
        console.error("Error fetching blog data:", error);
        setErrorMessage("Error fetching blog data. Please try again.");
      }
    };

    fetchBlogData();
  }, [id]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImagePaths = files.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...newImagePaths]);
    setImagePreviews((prev) => [...prev, ...newImagePaths]);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const handleRemoveImage = (index) => {
    const removedImage = images[index]; // Get the original filename
    setRemovedImages((prev) => [...prev, removedImage]); // Track removed images

    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    
    // Also remove from uploadedFiles if the file exists there
    const updatedUploadedFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updatedUploadedFiles);
  };


  // HandleSubmit  function

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
  
      // Append newly uploaded files
      uploadedFiles.forEach((file) => {
        formData.append("images", file);
      });
  
      // Append removed images as a JSON string
      formData.append("removedImages", JSON.stringify(removedImages));
  
      formData.append("heading", heading);
      formData.append("description", description);
  
      // Send the PUT request to update the blog
      const response = await axios.put(`${BASE_URL}/single-blog/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      // Success message
      if (response.status === 200) {
        setSuccessMessage("Single Blog updated successfully!");  // Set your success message
        setErrorMessage(null);  // Clear any error message
      }
  
      // Optionally, you can reset the form or states if needed
      setUploadedFiles([]); // Reset uploaded files
      setRemovedImages([]); // Reset removed images
      setHeading("");       // Reset heading field
      setDescription("");   // Reset description field

      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
  
    } catch (error) {
      // Error handling
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);  // Set the error message from the backend
      } else {
        setErrorMessage("An error occurred while updating the blog."); // Default error message
      }
      setSuccessMessage(null);  // Clear any success message

      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      
    }
  };
  
  
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
      ["link", "image", "audio", "video" ],
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
    "audio", 
    "video",
  ];

  return (
    <div className="main_wrapper">
      <Sidebar />
      <div className="main_content">
        <DashNav />
        <div className="container-fluid mt-3 pb-5 mb-5">
          <div className="py-3">
            <div className="container-fluid d-flex justify-content-between">
              <h4 className="mb-0">Edit Single Blog</h4>
              <Link to="/singleblog-list" className="btn btn-warning btn-sm">
                All Blogs
              </Link>
            </div>
          </div>
          <div className="mt-4">
            <form onSubmit={handleSubmit}>
              <div className="d-flex flex-wrap">
                <div className="col-md-8 col-12 px-2 mb-4 mb-md-0">
                  <div className="bg-white p-4">
                    <div className="mb-3">
                      <label htmlFor="heading" className="form-label">
                        Heading
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="heading"
                        value={heading}
                        onChange={(e) => setHeading(e.target.value)}
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

                <div className="col-md-4 px-2">
                  <SmallCard />
                  <div className="bg-white p-4">
                    <div className="mb-3">
                      <label htmlFor="image" className="form-label">
                        Images
                      </label>
                      <div className="py-3 d-flex flex-wrap">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} style={{ position: "relative" }}>
                            <img
                              src={preview}
                              alt={`Preview ${index}`}
                              style={{
                                height: "70px",
                                width: "70px",
                                objectFit: "cover",
                                marginRight: "10px",
                              }}
                              className="img-fluid mb-3"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              style={{
                                position: "absolute",
                                top: "-8px",
                                right: "5px",
                                background: "red",
                                color: "white",
                                border: "none",
                                borderRadius: "50%",
                                cursor: "pointer",
                                padding: "1px 5px",
                                fontSize: "10px",
                              }}
                            >
                              X
                            </button>
                          </div>
                        ))}
                      </div>
                      <input
                        className="form-control"
                        type="file"
                        id="image"
                        name="images"
                        onChange={handleImageUpload}
                        accept="image/*"
                        multiple
                       
                      />

                      {/* {uploadedFiles.length > 0 && (
                        <div className="mt-2">
                          <h6>Uploaded Files:</h6>
                          <ul>
                            {uploadedFiles.map((file, index) => (
                              <li key={index}>{file.name}</li>
                            ))}
                          </ul>
                        </div>
                      )} */}

                    </div>

                    <button type="submit" className="btn btn-primary rounded-0 mt-3">
                      Update
                    </button>

                    {successMessage && ( <h6 className="text-success mt-3">{successMessage}</h6> )}
                    {errorMessage && ( <h6 className="text-danger mt-3">{errorMessage}</h6> )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <FootDash />
      </div>
    </div>
  );
};

export default EditSingleBlog;
