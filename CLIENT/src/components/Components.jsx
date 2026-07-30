import React from 'react';
import { BrowserRouter, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import Home from './Pages/client/Home';
import Header from './Common/Header';
import Footer from './Common/Footer';
import About from './Pages/client/About';

import ProjectGrid3 from './Pages/client/ProjectGrid3';
import ProjectMasonary3 from './Pages/client/ProjectMasonary3';
import ProjectCorousel from './Pages/client/ProjectCorousel';
import ProjectDetail1 from './Pages/client/ProjectDetail1';

import BlogGrid from './Pages/client/BlogGrid';
import BlogSingle from './Pages/client/BlogSingle';

import Terms from './Pages/client/Terms';
import PrivacyPage from './Pages/client/PrivacyPage';
import Gallery from './Pages/client/Gallery';
import Error from './Pages/client/Error';
import ContactUs from './Pages/client/ContactUs';
import ScrollToTop from './Common/ScrollToTop';

// Admin Pages
import AdminLogin from './Pages/admin/AdminLogin';
import AdminLayout from './Pages/admin/AdminLayout';
import BlogManagement from './Pages/admin/BlogManagement';
import BlogEditor from './Pages/admin/BlogEditor';
import TestimonialManagement from './Pages/admin/TestimonialManagement';
import GalleryManagement from './Pages/admin/GalleryManagement';
import ContactLeadsManagement from './Pages/admin/ContactLeadsManagement';
import ProjectManagement from './Pages/admin/ProjectManagement';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }
    return children;
};

const ClientLayout = () => {
    return (
        <div className="page-wraper">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

class Components extends React.Component {
    render() {
        return (
            <BrowserRouter basename="/">
                <ScrollToTop />
                <Routes>
                    {/* ADMIN LOGIN - No Layout */}
                    <Route path="/admin/login" element={<AdminLogin />} />

                    {/* ADMIN LAYOUT - Sidebar + Protected */}
                    <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                        <Route path="/admin/blogs" element={<BlogManagement />} />
                        <Route path="/admin/blogs/new" element={<BlogEditor />} />
                        <Route path="/admin/blogs/edit/:id" element={<BlogEditor />} />
                        <Route path="/admin/testimonials" element={<TestimonialManagement />} />
                        <Route path="/admin/gallery" element={<GalleryManagement />} />
                        <Route path="/admin/leads" element={<ContactLeadsManagement />} />
                        <Route path="/admin/projects" element={<ProjectManagement />} />
                    </Route>

                    {/* CLIENT LAYOUT - Header & Footer */}
                    <Route element={<ClientLayout />}>
                        <Route path='/' element={<Home/>} />
                        <Route path='/about' element={<About/>} />
                        <Route path='/ongoing-projects' element={<ProjectGrid3/>} />
                        <Route path='/completed-projects' element={<ProjectMasonary3/>} />
                        <Route path='/upcoming-projects' element={<ProjectCorousel/>} />
                        <Route path='/project-detail' element={<ProjectDetail1/>} />
                        <Route path='/project-detail/:id' element={<ProjectDetail1/>} />
                        <Route path='/blogs' element={<BlogGrid/>} />
                        <Route path='/blog-single' element={<BlogSingle/>} />
                        <Route path='/blog-single/:id' element={<BlogSingle/>} />
                        <Route path='/contact-us' element={<ContactUs/>} />
                        <Route path='/terms' element={<Terms/>} />
                        <Route path='/privacy' element={<PrivacyPage/>} />
                        <Route path='/gallery' element={<Gallery/>} />
                        <Route path='*' element={<Error/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        );
    };
};

export default Components;
