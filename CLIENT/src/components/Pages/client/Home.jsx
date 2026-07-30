import React from 'react';
import Slider1 from '../../Elements/Slider1';
import About1 from '../../Elements/About1';
import WhatWeDo1 from '../../Elements/WhatWeDo1';
import Testimonials1 from '../../Elements/Testimonials1';
import Services1 from '../../Elements/Services1';
import HomeProjectsFilter from '../../Elements/HomeProjectsFilter';
import HomeGalleryCategories from '../../Elements/HomeGalleryCategories';
import BlogsHome from '../../Elements/BlogsHome';
import WhyChooseUsHome from '../../Elements/WhyChooseUsHome';
import FaqHome from '../../Elements/FaqHome';
import CtaHome from '../../Elements/CtaHome';
import GoogleMapIframe from '../../Elements/GoogleMapIframe';

class Home extends React.Component {
    render() {
        return (
            <>
                <div className="relative">
                    <Slider1 />
                    <About1 />
                    <WhyChooseUsHome />
                    <HomeProjectsFilter />
                    <Testimonials1 />
                    <FaqHome />
                    <HomeGalleryCategories />
                    <BlogsHome />
                    <CtaHome />
                    <GoogleMapIframe />
                </div>
                </>
        );
    };
};

export default Home;
