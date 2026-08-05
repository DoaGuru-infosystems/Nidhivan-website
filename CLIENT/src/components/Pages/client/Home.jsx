import React from 'react';
import Slider1 from '../../Elements/Slider1';
import AboutTrust from '../../Elements/AboutTrust';
import StatsBar from '../../Elements/StatsBar';
import ServicesGrid from '../../Elements/ServicesGrid';
import HomeProjectsFilter from '../../Elements/HomeProjectsFilter';
import HomeGalleryCategories from '../../Elements/HomeGalleryCategories';
import Testimonials1 from '../../Elements/Testimonials1';
import BlogsHome from '../../Elements/BlogsHome';
import CtaHome from '../../Elements/CtaHome';
import GoogleMapIframe from '../../Elements/GoogleMapIframe';
import FarmhouseSection from '../../Elements/FarmhouseSection';

class Home extends React.Component {
    render() {
        return (
            <>
                <div className="relative">
                    <Slider1 />
                    <StatsBar />
                    <AboutTrust />
                    <FarmhouseSection />
                    <ServicesGrid />
                    <HomeProjectsFilter />
                    <HomeGalleryCategories />
                    <Testimonials1 />
                    <BlogsHome />
                    <CtaHome />
                    <GoogleMapIframe />
                </div>
            </>
        );
    };
};

export default Home;
