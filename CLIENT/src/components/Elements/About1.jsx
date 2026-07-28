import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { siteData } from '../../data/siteContent';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const images = [
    // new URL('./../../images/about-slider/1.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80", // TEMP LIVE PREVIEW
    // new URL('./../../images/about-slider/2.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&q=80", // TEMP LIVE PREVIEW
    // new URL('./../../images/about-slider/3.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80", // TEMP LIVE PREVIEW
    // new URL('./../../images/about-slider/4.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready
    "https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?w=1600&q=80", // TEMP LIVE PREVIEW
    // new URL('./../../images/about-slider/5.jpg', import.meta.url).href // ORIGINAL DUMMY - restore when real property photos are ready
    "https://images.unsplash.com/photo-1510563800743-aed236490d08?w=1600&q=80" // TEMP LIVE PREVIEW
];

// var bgimg1 = new URL('./../../images/background/bg-4.png', import.meta.url).href; // ORIGINAL DUMMY - restore when real property photos are ready

var bgimg1 = "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?w=1600&q=80"; // TEMP LIVE PREVIEW
var bgimg2 = new URL('./../../images/background/cross-line2.png', import.meta.url).href;
// var aboutBeforeImg = new URL('./../../images/about-slider/1-ab.jpg', import.meta.url).href; // ORIGINAL DUMMY - restore when real property photos are ready
var aboutBeforeImg = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"; // TEMP LIVE PREVIEW

const About1 = () => {
    const [prevEl, setPrevEl] = useState(null);
    const [nextEl, setNextEl] = useState(null);

    return (
        <div className="section-full mobile-page-padding p-t80 p-b80 bg-white bg-no-repeat bg-bottom-left" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
            <div className="container">
                {/* TITLE START */}
                <div className="section-head">
                    <div className="sx-separator-outer separator-left">
                        <div className="sx-separator bg-white bg-moving bg-repeat-x" style={{ backgroundImage: 'url(' + bgimg2 + ')' }}>
                            <h3 className="sep-line-one">About us</h3>
                        </div>
                    </div>
                </div>
                {/* TITLE END */}
                <div className="section-content">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-5">
                            <div className="about-home-left">
                                <h3 className="m-t0 sx-tilte">{siteData.aboutUs.title}</h3>
                                <p>{siteData.aboutUs.longDescription}</p>
                                <div className="text-left">
                                    <NavLink to="/about" className="site-button-secondry btn-half"><span>Read More</span></NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-7">
                            <div className="about-home-right relative">
                                <Swiper
                                    modules={[Autoplay, Navigation, Pagination]}
                                    loop={true}
                                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                                    navigation={{
                                        prevEl,
                                        nextEl,
                                    }}
                                    pagination={{ clickable: true, el: '.about-swiper-pagination' }}
                                    className="about-home number-slider"
                                    spaceBetween={30}
                                    slidesPerView={1}
                                >
                                    {images.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="sx-img-effect zoom-slow">
                                                <NavLink to={"/about"}><img src={item} alt="" className="w-full" /></NavLink>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                
                                {/* Custom Navigation */}
                                <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 z-10 pointer-events-none">
                                    <button ref={(node) => setPrevEl(node)} className="pointer-events-auto bg-white w-10 h-10 flex items-center justify-center shadow-md -ml-5 hover:bg-gray-100 transition-colors">
                                        <ChevronLeft size={20} className="text-gray-800" />
                                    </button>
                                    <button ref={(node) => setNextEl(node)} className="pointer-events-auto bg-white w-10 h-10 flex items-center justify-center shadow-md -mr-5 hover:bg-gray-100 transition-colors">
                                        <ChevronRight size={20} className="text-gray-800" />
                                    </button>
                                </div>

                                <div className="about-swiper-pagination flex justify-center mt-4 gap-2"></div>

                                <div className="about-home-before absolute bottom-[-40px] left-[-40px] z-20 hidden md:block">
                                    <img src={aboutBeforeImg} alt="" className="border-8 border-white shadow-lg" style={{ maxWidth: '200px' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About1;