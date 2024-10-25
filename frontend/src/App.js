import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';
import ContactUs from './Components/ContactUs';
import RegisterForm from './Components/RegisterForm';
import AddAbout from './Dashboard/DashPages/About/AddAbout';
import AllAboutUs from './Dashboard/DashPages/About/AllAboutUs';
import EditAbout from './Dashboard/DashPages/About/EditAbout';
import AddBlog from './Dashboard/DashPages/Blogs/AddBlog';
import AllBlogs from './Dashboard/DashPages/Blogs/AllBlogs';
import EditBlog from './Dashboard/DashPages/Blogs/Editblog';
import AddWork from './Dashboard/DashPages/OurWorks/AddWork';
import AllWorks from './Dashboard/DashPages/OurWorks/AllWorks';
import EditWork from './Dashboard/DashPages/OurWorks/EditWork';
import AddProduct from './Dashboard/DashPages/Products/AddProduct';
import AddService from './Dashboard/DashPages/Services/AddService';
import AllServices from './Dashboard/DashPages/Services/AllServices';
import EditService from './Dashboard/DashPages/Services/EditService';
import AddTeam from './Dashboard/DashPages/Team/AddTeam';
import AllTeam from './Dashboard/DashPages/Team/AllTeam';
import EditTeam from './Dashboard/DashPages/Team/EditTeam';
import NewDashboard from './Dashboard/NewDashboard';
import Homepage from './Pages/Homepage/Homepage';
import Aboutpage from './Pages/About/Aboutpage';
import Contactpage from './Pages/Contact/Contactpage';
import Blogpage from './Pages/Blogs/Blogpage';
import Servicespage from './Pages/Servicespage/Servicespage';
import Login from './Pages/User/Login';
import Signup from './Pages/User/Signup';
import Forgotpassword from './Pages/User/Forgotpassword';
import Shopsection from './Pages/Shop/Shopsection';
import AllProducts from './Dashboard/DashPages/Products/AllProducts';
import EditProduct from './Dashboard/DashPages/Products/EditProduct';
import AllTestimonial from './Dashboard/DashPages/Testimonials/AllTestimonial';
import EditTest from './Dashboard/DashPages/Testimonials/EditTest';
import AddTest from './Dashboard/DashPages/Testimonials/AddTest';
import AllUsers from './Dashboard/DashPages/Users/AllUsers';
import Profile from './Dashboard/DashPages/Users/Profile';

import { useAuth } from './store/auth';
import useIdleTimer from './Components/IdleTimer';
import AddPlan from './Dashboard/DashPages/Plans/AddPlan';
import EditPlan from './Dashboard/DashPages/Plans/Editplan';
import AllPlans from './Dashboard/DashPages/Plans/AllPlans';
import StripeSuccess from './Components/StripeSuccess';
import StripeFailed from './Components/StripeFailed';
import Faq from './Pages/Faqs/Faq';
import Policy from './Pages/Policy/Policy';
import TermsAndConditions from './Pages/Policy/TermsAndConditions';
import ScrollToTop from './Components/ScrollToTop';
import SingleBlog from './Pages/Blogs/SingleBlog';
import AddSingleBlog from './Dashboard/DashPages/SingleBlog/AddSingleBlog';
import SingleBlogList from './Dashboard/DashPages/SingleBlog/SingleBlogList';
import EditSingleBlog from './Dashboard/DashPages/SingleBlog/EditSingleBlog';
import StartFromTop from './Components/StartFromTop';
import ServiceSingle from './Pages/Servicespage/ServiceSingle';
import AddSingleService from './Dashboard/DashPages/SingleServices/AddSingleService';
import SingleServiceList from './Dashboard/DashPages/SingleServices/SingleServiceList';
import EditSingleService from './Dashboard/DashPages/SingleServices/EditSingleService';

function App() {

  const { logout } = useAuth();
  useIdleTimer( 900000, logout);

  

  
  return (
  <>
    <StartFromTop />
    <Routes>
    
    <Route path="/" element={<Homepage />} />
    <Route path="/about" element={<Aboutpage />} />
    <Route path="/contact" element={<Contactpage />} />
    <Route path="/blog" element={<Blogpage />} />
    <Route path="/single-blog/:slug" element={<SingleBlog />} />
    <Route path="/faqs" element={<Faq />} />
    <Route path="/terms-conditions" element={<TermsAndConditions />} />
    <Route path="/privacy-policy" element={<Policy />} />
    <Route path="/services" element={<Servicespage />} />
    <Route path="/single-service/:slug" element={<ServiceSingle />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/forgotpassword" element={<Forgotpassword />} />
    <Route path="/shop" element={<Shopsection />} />
    <Route path="/success" element={<StripeSuccess />} />
    <Route path="/cancel" element={<StripeFailed />} />
    


    {/* Protected Dashboard Pages */}
    <Route path="/dashboard" element={<ProtectedRoute element={NewDashboard} />} />
    <Route path="/addblog" element={<ProtectedRoute element={AddBlog} />} />
    <Route path="/editblog/:id" element={<ProtectedRoute element={EditBlog} />} />
    <Route path="/blog-list" element={<ProtectedRoute element={AllBlogs} />} />
    <Route path="/add-singleblog" element={<ProtectedRoute element={AddSingleBlog} />} />
    <Route path="/edit-singleblog/:id" element={<ProtectedRoute element={EditSingleBlog} />} />
    <Route path="/singleblog-list" element={<ProtectedRoute element={SingleBlogList} />} />
    <Route path="/register" element={<ProtectedRoute element={RegisterForm} />} />
    <Route path="/work-list" element={<ProtectedRoute element={AllWorks} />} />
    <Route path="/addwork" element={<ProtectedRoute element={AddWork} />} />
    <Route path="/editwork/:id" element={<ProtectedRoute element={EditWork} />} />
    <Route path="/add-about" element={<ProtectedRoute element={AddAbout} />} />
    <Route path="/edit-about/:id" element={<ProtectedRoute element={EditAbout} />} />
    <Route path="/about-list" element={<ProtectedRoute element={AllAboutUs} />} />
    <Route path="/add-service" element={<ProtectedRoute element={AddService} />} />
    <Route path="/edit-service/:id" element={<ProtectedRoute element={EditService} />} />
    <Route path="/service-list" element={<ProtectedRoute element={AllServices} />} />
    <Route path="/add-single-service" element={<ProtectedRoute element={AddSingleService} />} />
    <Route path="/edit-single-service/:id" element={<ProtectedRoute element={EditSingleService} />} />
    <Route path="/singleService-list" element={<ProtectedRoute element={SingleServiceList} />} />
    <Route path="/team-list" element={<ProtectedRoute element={AllTeam} />} />
    <Route path="/add-team" element={<ProtectedRoute element={AddTeam} />} />
    <Route path="/edit-team/:id" element={<ProtectedRoute element={EditTeam} />} />
    <Route path="/products-list" element={<ProtectedRoute element={AllProducts} />} />
    <Route path="/add-product" element={<ProtectedRoute element={AddProduct} />} />
    <Route path="/edit-product/:id" element={<ProtectedRoute element={EditProduct} />} />
    <Route path="/contact-list" element={<ProtectedRoute element={ContactUs} />} />
    <Route path="/testimonial-list" element={<ProtectedRoute element={AllTestimonial} />} />
    <Route path="/add-test" element={<ProtectedRoute element={AddTest} />} />
    <Route path="/edit-test/:id" element={<ProtectedRoute element={EditTest} />} />
    <Route path="/all-users" element={<ProtectedRoute element={AllUsers} />} />
    <Route path="/user-profile" element={<ProtectedRoute element={Profile} />} />
    
    <Route path="/plan-list" element={<ProtectedRoute element={AllPlans} />} />
    <Route path="/add-plan" element={<ProtectedRoute element={AddPlan} />} />
    <Route path="/edit-plan/:id" element={<ProtectedRoute element={EditPlan} />} />
     

  </Routes>
  <ScrollToTop />
  </>
  );
}

export default App;
