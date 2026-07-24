import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Header from './Common/Header';
import Footer from './Common/Footer';
import About from './Pages/About';

import FontIcons from './Pages/FontIcons';
import Error from './Pages/Error';

import ProjectGrid3 from './Pages/ProjectGrid3';
import ProjectGridNoGap3 from './Pages/ProjectGridNoGap3';
import ProjectGrid4 from './Pages/ProjectGrid4';
import ProjectGridNoGap4 from './Pages/ProjectGridNoGap4';
import ProjectGrid5 from './Pages/ProjectGrid5';
import ProjectGridNoGap5 from './Pages/ProjectGridNoGap5';

import ProjectMasonary3 from './Pages/ProjectMasonary3';
import ProjectMasonaryNoGap3 from './Pages/ProjectMasonaryNoGap3';
import ProjectMasonary4 from './Pages/ProjectMasonary4';
import ProjectMasonaryNoGap4 from './Pages/ProjectMasonaryNoGap4';
import ProjectMasonary5 from './Pages/ProjectMasonary5';
import ProjectMasonaryNoGap5 from './Pages/ProjectMasonaryNoGap5';

import ProjectCorousel from './Pages/ProjectCorousel';
import ProjectDetail1 from './Pages/ProjectDetail1';
import ProjectDetail2 from './Pages/ProjectDetail2';

import BlogGrid from './Pages/BlogGrid';
import BlogListing from './Pages/BlogListing';
import BlogMasonary from './Pages/BlogMasonary';
import BlogSingle from './Pages/BlogSingle';
import PostRightSidebar from './Pages/PostRightSidebar';

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

                            <Route path='/icon-font' element={<FontIcons/>} />
                            <Route path='/error-404' element={<Error/>} />

                            <Route path='/project-grid-3-columns' element={<ProjectGrid3/>} />
                            <Route path='/project-grid-3-columns-no-gap' element={<ProjectGridNoGap3/>} />
                            <Route path='/project-grid-4-columns' element={<ProjectGrid4/>} />
                            <Route path='/project-grid-4-columns-no-gap' element={<ProjectGridNoGap4/>} />
                            <Route path='/project-grid-5-columns' element={<ProjectGrid5/>} />
                            <Route path='/project-grid-5-columns-no-gap' element={<ProjectGridNoGap5/>} />

                            <Route path='/project-masonry-3-columns' element={<ProjectMasonary3/>} />
                            <Route path='/project-masonry-3-columns-no-gap' element={<ProjectMasonaryNoGap3/>} />
                            <Route path='/project-masonry-4-columns' element={<ProjectMasonary4/>} />
                            <Route path='/project-masonry-4-columns-no-gap' element={<ProjectMasonaryNoGap4/>} />
                            <Route path='/project-masonry-5-columns' element={<ProjectMasonary5/>} />
                            <Route path='/project-masonry-5-columns-no-gap' element={<ProjectMasonaryNoGap5/>} />

                            <Route path='/project-carousel' element={<ProjectCorousel/>} />
                            <Route path='/project-detail1' element={<ProjectDetail1/>} />
                            <Route path='/project-detail2' element={<ProjectDetail2/>} />

                            <Route path='/blog-grid' element={<BlogGrid/>} />
                            <Route path='/blog-listing' element={<BlogListing/>} />
                            <Route path='/blog-masonry' element={<BlogMasonary/>} />
                            <Route path='/blog-single' element={<BlogSingle/>} />
                            <Route path='/post-right-sidebar' element={<PostRightSidebar/>} />


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