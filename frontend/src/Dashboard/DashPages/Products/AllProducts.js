import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../../Sidebar";
import DashNav from "../../DashNav";
import FootDash from "../../FootDash";

const BASE_URL = process.env.REACT_APP_URL;

const AllProducts = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/products`);
            setBlogs(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to fetch products');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/products/${id}`);
            setBlogs(blogs.filter(blog => blog._id !== id));
            setShowDeleteModal(false);
            setDeleteId(null);
        } catch (error) {
            console.error('Error deleting product:', error);
            setError('Failed to delete the product');
        }
    };

    const handleDeleteAll = async () => {
        try {
            const response = await axios.delete(`${BASE_URL}/products`);
            if (response.status === 200) {
                setBlogs([]);
                setShowDeleteAllModal(false);
                console.log(response.data.message); // Output success message
            } else {
                console.error('Error deleting products:', response.data.message); // Log error message
            }
        } catch (error) {
            console.error('Error deleting products:', error); // Log fetch error
        }
    };

    const closeModal = () => {
        setShowDeleteModal(false);
        setShowDeleteAllModal(false);
        setDeleteId(null);
    };

    const openDeleteModal = (id) => {
        setShowDeleteModal(true);
        setDeleteId(id);
    };

    const openDeleteAllModal = () => {
        setShowDeleteAllModal(true);
    };

    const handleSelectProduct = (id) => {
        if (selectedProducts.includes(id)) {
            setSelectedProducts(selectedProducts.filter(pid => pid !== id));
        } else {
            setSelectedProducts([...selectedProducts, id]);
        }
    };

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
                    <div className='all_blogs container-fluid mt-5 mb-5 pb-5'>
                        <div className="bg-white pt-4">
                            <div className=" py-3 px-3">
                                <div className="container-fluid d-flex flex-wrap justify-content-between ">
                                    <h4 className='mb-0'>All Products</h4>
                                    <div>
                                        {/* <button className="btn btn-danger btn-sm me-2" onClick={openDeleteAllModal}>Delete All</button> */}
                                        <Link to='/add-product' className="btn btn-warning btn-sm">Add Product <i className='fa-solid fa-plus'></i></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="container-fluid table-responsive">
                                {error && <p className="text-danger">{error}</p>}
                                <table className="table table-striped mt-5" >
                                    <thead>
                                        <tr>
                                            <th scope="col">No.</th>
                                            <th scope="col">Image</th>
                                            <th scope="col">Product Name</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Brand</th>
                                            <th scope="col">Regular Price</th>
                                            <th scope="col">Discount Price</th>
                                            <th scope="col" className='text-center'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentBlogs.map((blog, index) => (
                                            <tr key={blog._id}>
                                                <td><b>{index + 1}</b></td>
                                                <td>
                                                    <img src={`/productimg/${blog.image}`} alt={blog.title} style={{ width: '50px' }} />
                                                </td>
                                                <td><div className="table_title">{blog.name}</div></td>
                                                <td><div className="table_desc" dangerouslySetInnerHTML={{ __html: blog.description }} /></td>
                                                <td>{blog.brand}</td>
                                                <td>Rs {blog.regularPrice}</td>
                                                <td>Rs {blog.discountPrice}</td>
                                                <td>
                                                    <div className="d-flex justify-content-around pt-1">
                                                        <Link to={`/edit-product/${blog._id}`}><i className='fa-solid fa-pencil mx-2 text-warning'></i></Link>
                                                        <i
                                                            className='fa-solid fa-trash mx-2 text-danger'
                                                            onClick={() => openDeleteModal(blog._id)}
                                                            style={{ cursor: 'pointer' }}
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#deleteModal"
                                                        ></i>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="d-flex justify-content-center mt-4 mb-4">
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

            {/* Delete Single Product Modal */}
            <div className={`modal fade ${showDeleteModal ? 'show' : ''}`} id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" style={{ display: showDeleteModal ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteModalLabel">Delete Product</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={closeModal} data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this product?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary btn-sm rounded-0" onClick={closeModal} data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger btn-sm rounded-0" onClick={() => handleDelete(deleteId)} data-bs-dismiss="modal" >Confirm</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete All Products Modal */}
            <div className={`modal fade ${showDeleteAllModal ? 'show' : ''}`} id="deleteAllModal" tabIndex="-1" aria-labelledby="deleteAllModalLabel" aria-hidden="true" style={{ display: showDeleteAllModal ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteAllModalLabel">Delete All Products</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={closeModal} data-bs-dismiss="modal" ></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete all products?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary btn-sm rounded-0" onClick={closeModal} data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger btn-sm rounded-0" onClick={handleDeleteAll} data-bs-dismiss="modal">Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AllProducts;
