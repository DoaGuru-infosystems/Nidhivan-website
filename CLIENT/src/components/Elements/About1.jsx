import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCards, Pagination } from 'swiper/modules';
import { siteData } from '../../data/siteContent';

import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';

const images = [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
    "https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?w=1600&q=80",
    "https://images.unsplash.com/photo-1510563800743-aed236490d08?w=1600&q=80"
];

var bgimg1 = new URL('./../../images/background/bg-4.png', import.meta.url).href;
var bgimg2 = new URL('./../../images/background/cross-line2.png', import.meta.url).href;
var aboutBeforeImg = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80";

const About1 = () => {
    return (
        <div className="relative py-8 md:py-20 bg-white bg-no-repeat bg-bottom-left" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
            <div className="max-w-7xl mx-auto px-4">
                {/* TITLE START */}
                <div className="mb-10">
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
                            <div className="about-home-right relative flex flex-col items-center justify-center h-full">
                                <Swiper
                                    effect={'cards'}
                                    grabCursor={true}
                                    modules={[EffectCards, Autoplay, Pagination]}
                                    loop={true}
                                    autoplay={{ delay: 3500, disableOnInteraction: false }}
                                    pagination={{ clickable: true, el: '.about-swiper-pagination' }}
                                    className="w-[85%] max-w-[450px]"
                                >
                                    {images.map((item, index) => (
                                        <SwiperSlide key={index} className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                                            <img src={item} alt="" className="w-full h-[400px] md:h-[500px] object-cover" />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                
                                <div className="about-swiper-pagination flex justify-center mt-8 gap-2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About1;