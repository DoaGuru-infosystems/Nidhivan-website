import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import PrivacyPolicy from './Pages/client/PrivacyPolicy';
import Gallery from './Pages/client/Gallery';
import Error from './Pages/client/Error';


import ContactUs from './Pages/client/ContactUs';
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