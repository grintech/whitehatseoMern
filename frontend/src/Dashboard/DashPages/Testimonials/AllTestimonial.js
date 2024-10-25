import { useState, useEffect } from "react";
import axios from "axios";


import { Link } from "react-router-dom";
import Sidebar from "../../Sidebar";
import DashNav from "../../DashNav";
import FootDash from "../../FootDash";

const BASE_URL = process.env.REACT_APP_URL;

const AllTestimonial = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const itemsPerPage = 10;

    // Utility function to strip HTML tags from a string
        const stripHtmlTags = (str) => {
            if (!str) return "";
            return str.replace(/<\/?[^>]+(>|$)/g, "");
        };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/testimonial`);
                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/testimonial/${id}`);
            setBlogs(blogs.filter(blog => blog._id !== id));
            setShowModal(false);
            setDeleteId(null);
        } catch (error) {
            console.error('Error deleting blog:', error);
            setError('Failed to delete the blog');
        }
    };

    const openModal = (id) => {
        setShowModal(true);
        setDeleteId(id);
    };

    const closeModal = () => {
        setShowModal(false);
        setDeleteId(null);
    };

    const confirmDelete = () => {
        handleDelete(deleteId);
    };

    // Calculate the displayed blogs based on current page
    const indexOfLastBlog = currentPage * itemsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - itemsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const totalPages = Math.ceil(blogs.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    

    return (
        <>
             <div className="main_wrapper">
                <Sidebar />
              
                <div className="main_content">
                   <DashNav />

                  

                   <div className='all_blogs container-fluid mb-5 pb-5'>
                <div className="bg-white mt-5 pt-4 ">
                    <div className=" py-3 px-3">
                    {/* {message && <h5 className="text-success text-center">{message}</h5>}
                    {error && <h5 className="text-danger text-center">{error}</h5>} */}
                        <div className="container-fluid d-flex justify-content-between ">
                            <h4 className='mb-0'>All Testimonials</h4>
                            <Link to='/add-test' className="btn btn-warning btn-sm">Add New <i className='fa-solid fa-plus'></i></Link>
                        </div>
                    </div>
                    <div className="container-fluid table-responsive">
                        <table className="table table-striped mt-5" >
                            <thead>
                                <tr>
                                    <th scope="col">No.</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Description</th>
                                    <th scope="col" className='text-center'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentBlogs.map((blog, index) => (
                                    <tr key={blog._id}>
                                        <td className=""><b>{index +1}</b></td>
                                        <td>
                                            <img src={`/testimg/${blog.image}`} alt={blog.title} style={{ width: '50px' }} />
                                        </td>
                                        <td><div className="table_title">{blog.title}</div></td>
                                        <td><div className="table_role">{blog.role}</div></td>
                                        <td><div className="table_desc" >{stripHtmlTags(blog.description)}</div></td>
                                        <td>
                                            <div className="d-flex justify-content-around pt-1">
                                                <Link to={`/edit-test/${blog._id}`}>
                                                <i className='fa-solid fa-pencil mx-2 text-warning'></i>
                                                </Link>
                                                <i className='fa-solid fa-trash mx-2 text-danger'
                                                    onClick={() => openModal(blog._id)}
                                                    style={{ cursor: 'pointer' }}
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#exampleModal"
                                                ></i>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="d-flex justify-content-center mt-4">
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <button className="page-link" onClick={() => paginate(currentPage - 1)}>Previous</button>
                                    </li>
                                    {[...Array(totalPages)].map((_, index) => (
                                        <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                            <button className="page-link" onClick={() => paginate(index + 1)}>
                                                {index + 1}
                                            </button>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                        <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                 </div>
                 <FootDash />
                </div>
            </div>

           

            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel"> Delete</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this item?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary btn-sm rounded-0" data-bs-dismiss="modal" onClick={closeModal}>Cancel</button>
                            <button type="button" className="btn btn-danger btn-sm rounded-0" data-bs-dismiss="modal" onClick={confirmDelete}>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>

            
        </>
    );
}

export default AllTestimonial;
