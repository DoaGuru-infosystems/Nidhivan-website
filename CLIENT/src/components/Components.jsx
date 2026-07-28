import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Header from './Common/Header';
import Footer from './Common/Footer';
import About from './Pages/About';

import ProjectGrid3 from './Pages/ProjectGrid3';
import ProjectMasonary3 from './Pages/ProjectMasonary3';
import ProjectCorousel from './Pages/ProjectCorousel';
import ProjectDetail1 from './Pages/ProjectDetail1';

import BlogGrid from './Pages/BlogGrid';
import BlogSingle from './Pages/BlogSingle';

import Terms from './Pages/Terms';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import Gallery from './Pages/Gallery';


import ContactUs from './Pages/ContactUs';
import ScrollToTop from './Common/ScrollToTop';

class Components extends React.Component {
    render() {
        return (
            <BrowserRouter basename="/">
                <ScrollToTop />
                <div className="page-wraper">
                        <Header />
                        <Routes>
                            <Route path='/' element={<Home/>} />

                            <Route path='/about' element={<About/>} />

                            <Route path='/ongoing-projects' element={<ProjectGrid3/>} />
                            <Route path='/completed-projects' element={<ProjectMasonary3/>} />
                            <Route path='/upcoming-projects' element={<ProjectCorousel/>} />
                            <Route path='/project-detail' element={<ProjectDetail1/>} />

                            <Route path='/blogs' element={<BlogGrid/>} />
                            <Route path='/blog-single' element={<BlogSingle/>} />


                            <Route path='/contact-us' element={<ContactUs/>} />
                            <Route path='/terms' element={<Terms/>} />
                            <Route path='/privacy' element={<PrivacyPolicy/>} />
                            <Route path='/gallery' element={<Gallery/>} />
                            
                            <Route element={<Error/>} />
                        </Routes>
                        <Footer />
                </div>
            </BrowserRouter>
        );
    };
};

export default Components;