import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../../Sidebar";
import DashNav from "../../DashNav";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SmallCard from "../SmallCard";
import FootDash from "../../FootDash";

const BASE_URL = process.env.REACT_APP_URL;

const AddSingleBlog = () => {
  const [image, setImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Function to handle image uploads
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImage((prev) => [...prev, ...files]); // Append new files to the existing state
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreview((prev) => [...prev, ...previews]); // Append new previews
  };

  // Function to remove an image
  const handleRemoveImage = (index) => {
    setImage((prev) => prev.filter((_, i) => i !== index)); // Remove the image from the state
    setImagePreview((prev) => prev.filter((_, i) => i !== index)); // Remove the preview from the state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Append multiple files
      image.forEach((file) => {
        formData.append("images", file);
      });

      formData.append("heading", heading);
      formData.append("description", description);

      const response = await axios.post(`${BASE_URL}/single-blog`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle success
      setSuccessMessage("Single Blog created successfully!");
      setErrorMessage("");

      // Reset form fields after successful submission
      setImage([]);
      setImagePreview([]);
      setHeading("");
      setDescription("");
      e.target.reset();

      // Hide success message after 2 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    } catch (error) {
      setErrorMessage("Error creating blog. Please try again.");
      setSuccessMessage("");

      // Hide error message after 2 seconds
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
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
      ["link", "image", "audio", "video"],
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
    <>
      <div className="main_wrapper">
        <Sidebar />

        <div className="main_content">
          <DashNav />
          <div className="container-fluid mt-3 pb-5 mb-5">
            <div className="py-3">
              <div className="container-fluid d-flex justify-content-between">
                <h4 className="mb-0">Create Single Blog</h4>
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

                  <div className="col-md-4 col-12 px-2">
                    <SmallCard />
                    <div className="bg-white p-4">
                      <div className="mb-3">
                        <label htmlFor="image" className="form-label">
                          Image
                        </label>
                        <div className="py-3 d-flex flex-wrap">
                          {imagePreview.map((preview, index) => (
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
                                  right: '5px',
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
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary rounded-0 mt-3"
                      >
                        Submit
                      </button>
                      {successMessage && (
                        <h6 className="text-success mt-3">{successMessage}</h6>
                      )}
                      {errorMessage && (
                        <h6 className="text-danger mt-3">{errorMessage}</h6>
                      )}
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

export default AddSingleBlog;
