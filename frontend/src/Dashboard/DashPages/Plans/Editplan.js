import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../../Sidebar";
import DashNav from "../../DashNav";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SmallCard from "../SmallCard";
import FootDash from "../../FootDash";

const BASE_URL = process.env.REACT_APP_URL;

const EditPlan = () => {
  const { id } = useParams(); // Get the plan ID from the URL
  const [planName, setPlanName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch the plan details when the component mounts
    const fetchPlanDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/plan/${id}`);
        const { planName, price, duration, description } = response.data;
        setPlanName(planName);
        setPrice(price);
        setDuration(duration);
        setDescription(description);
      } catch (error) {
        setErrorMessage("Error fetching plan details. Please try again.");
      }
    };

    fetchPlanDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        planName,
        price,
        duration,
        description,
      };

      await axios.put(
        `${BASE_URL}/plan/${id}`,
        formData
      );

      setSuccessMessage("Plan updated successfully!");
      setErrorMessage(""); // Clear any previous error message

      // Hide success message after 2 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    } catch (error) {
      setErrorMessage("Error updating plan. Please try again.");
      setSuccessMessage(""); // Clear any previous success message

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
          <div className="container-fluid mt-3 pb-5 mb-5">
            <div className=" py-3 ">
              <div className="container-fluid d-flex justify-content-between">
                <h4 className="mb-0">Edit Plan</h4>
                <Link to="/plan-list" className="btn btn-warning btn-sm">
                  All Plans
                </Link>
              </div>
            </div>
            <div className="mt-4">
              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-wrap">
                  <div className="col-md-8 col-12 px-2 mb-4 mb-md-0">
                    <div className="bg-white p-4">
                      <div className="mb-3">
                        <label htmlFor="planName" className="form-label">
                          Plan Name
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          id="planName"
                          value={planName}
                          onChange={(e) => setPlanName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="price" className="form-label">
                          Price
                        </label>
                        <input
                          className="form-control"
                          type="number"
                          id="price"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="duration" className="form-label">
                          Duration
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          id="duration"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
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

                      <div className="d-flex flex-column align-items-end justify-content-end">
                        <button
                          type="submit"
                          className="btn btn-primary rounded-0 mt-3"
                        >
                          Submit
                        </button>
                        {successMessage && (
                          <h6 className="text-success mt-3">
                            {successMessage}
                          </h6>
                        )}
                        {errorMessage && (
                          <h6 className="text-danger mt-3">
                            {errorMessage}
                          </h6>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4 col-12 px-2">
                    <SmallCard />
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

export default EditPlan;
