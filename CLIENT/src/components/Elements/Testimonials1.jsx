import React from 'react';
import CountUp from 'react-countup';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { siteData } from '../../data/siteContent';
import { Quote } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';

// var bgimg1 = new URL('./../../images/background/bg-8.jpg', import.meta.url).href; // ORIGINAL DUMMY - restore when real property photos are ready

var bgimg1 = "https://images.pexels.com/photos/6985136/pexels-photo-6985136.jpeg?auto=compress&cs=tinysrgb&w=1600"; // TEMP LIVE PREVIEW
// var bgimg2 = new URL('./../../images/background/bg-5.png', import.meta.url).href; // ORIGINAL DUMMY - restore when real property photos are ready
var bgimg2 = "https://images.pexels.com/photos/7134997/pexels-photo-7134997.jpeg?auto=compress&cs=tinysrgb&w=1600"; // TEMP LIVE PREVIEW
var bgimg3 = new URL('./../../images/background/cross-line2.png', import.meta.url).href;
// var bgimg4 = new URL('./../../images/background/bg-12.jpg', import.meta.url).href; // ORIGINAL DUMMY - restore when real property photos are ready
var bgimg4 = "https://images.pexels.com/photos/29101878/pexels-photo-29101878.jpeg?auto=compress&cs=tinysrgb&w=1600"; // TEMP LIVE PREVIEW

const Testimonials1 = () => {
    return (
        <div className="section-full container-fluid px-0">
            <div className="section-content">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="bg-gray bg-cover bg-no-repeat" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
                        <div className="sx-left-part mobile-page-padding p-8 md:p-16 lg:p-24">
                            {/* TITLE START */}
                            <div className="section-head">
                                <div className="sx-separator-outer separator-left">
                                    <div className="sx-separator bg-white bg-moving bg-repeat-x" style={{ backgroundImage: 'url(' + bgimg3 + ')' }}>
                                        <h3 className="sep-line-one">Infographic</h3>
                                    </div>
                                </div>
                            </div>
                            {/* TITLE END */}
                            <div className="counter-blocks">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    {siteData.statistics.map((stat, index) => (
                                        <div key={index}>
                                            <div className="sx-count text-black sx-icon-box-wraper bg-repeat bg-white p-a30 shadow-md transition-transform hover:-translate-y-2" style={{ backgroundImage: 'url(' + bgimg2 + ')' }}>
                                                <h2 className="st-count-number sx-text-primary text-left flex items-baseline">
                                                    <span className="counter"><CountUp end={parseInt(stat.value)} duration={5} enableScrollSpy={true} scrollSpyOnce={true} /></span>
                                                    <span>{stat.suffix}</span>
                                                </h2>
                                                <h4 className="m-tb0">{stat.label}</h4>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white bg-repeat" style={{ backgroundImage: 'url(' + bgimg4 + ')' }}>
                        <div className="sx-right-part mobile-page-padding p-8 md:p-16 lg:p-24 lg:pl-16">
                            {/* TITLE START */}
                            <div className="section-head">
                                <div className="sx-separator-outer separator-left">
                                    <div className="sx-separator bg-white bg-moving bg-repeat-x" style={{ backgroundImage: 'url(' + bgimg3 + ')' }}>
                                        <h3 className="sep-line-one">Testimonial</h3>
                                    </div>
                                </div>
                            </div>
                            {/* TITLE END */}
                            {/* TESTIMONIAL START */}
                            <Swiper
                                modules={[Autoplay, Pagination]}
                                loop={true}
                                autoplay={{ delay: 6000, disableOnInteraction: false }}
                                pagination={{ clickable: true, el: '.testimonial-pagination' }}
                                spaceBetween={30}
                                slidesPerView={1}
                                className="testimonial-home"
                            >
                                {siteData.testimonials.map((item, index) => {
                                    const imgUrl = new URL(`./../../images/testimonials/pic${(index % 4) + 1}.jpg`, import.meta.url).href;
                                    return (
                                        <SwiperSlide key={index}>
                                            <div className="testimonial-2 hover-animation-1 pb-12">
                                                <div className="testimonial-detail clearfix relative mb-6">
                                                    <div className="testimonial-pic shadow scale-in-center w-20 h-20 rounded-full overflow-hidden float-left mr-4">
                                                        <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="pt-2">
                                                        <h4 className="testimonial-name text-lg font-bold m-0">{item.name}</h4>
                                                        <span className="testimonial-position text-sm text-gray-500">{item.role}</span>
                                                    </div>
                                                    <Quote className="absolute right-0 top-4 text-gray-200 w-12 h-12" />
                                                </div>
                                                <div className="testimonial-text bg-white shadow-sm p-6 rounded-lg relative z-10">
                                                    <p className="italic text-gray-600 m-0">{item.text}</p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                            <div className="testimonial-pagination flex justify-start mt-4 gap-2"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonials1;