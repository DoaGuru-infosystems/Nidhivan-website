import React, { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { siteData } from '../../data/siteContent';
import { Maximize, ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';

const filters = [
    { label: "Residential", filter: "cat-1" },
    { label: "Commercial", filter: "cat-2" },
    { label: "Plots", filter: "cat-3" }
];

var bgimg1 = new URL('./../../images/background/cross-line2.png', import.meta.url).href;

const getImgUrl = (id) => {
    const num = (id % 7) || 1;
    switch(num) {
        // case 1: return new URL('./../../images/projects/portrait/pic1.jpg', import.meta.url).href; // ORIGINAL DUMMY - restore when real property photos are ready
        case 1: return "https://images.pexels.com/photos/6933852/pexels-photo-6933852.jpeg?auto=compress&cs=tinysrgb&w=1600"; // TEMP LIVE PREVIEW
        // case 2: return new URL('./../../images/projects/portrait/pic2.jpg', import.meta.url).href; // ORIGINAL DUMMY - restore when real property photos are ready
        case 2: return "https://images.pexels.com/photos/6934189/pexels-photo-6934189.jpeg?auto=compress&cs=tinysrgb&w=1600"; // TEMP LIVE PREVIEW
        // case 3: return new URL('./../../images/projects/portrait/pic3.jpg', import.meta.url).href; // ORIGINAL DUMMY - restore when real property photos are ready
        case 3: return "https://images.pexels.com/photos/28991200/pexels-photo-28991200.jpeg?auto=compress&cs=tinysrgb&w=1600"; // TEMP LIVE PREVIEW
        // case 4: return new URL('./../../images/projects/portrait/pic4.jpg', import.meta.url).href; // ORIGINAL DUMMY - restore when real property photos are ready
        case 4: return "https://images.pexels.com/photos/7060814/pexels-photo-7060814.jpeg?auto=compress&cs=tinysrgb&w=1600"; // TEMP LIVE PREVIEW
        // case 5: return new URL('./../../images/projects/portrait/pic5.jpg', import.meta.url).href; // ORIGINAL DUMMY - restore when real property photos are ready
        case 5: return "https://images.pexels.com/photos/6934189/pexels-photo-6934189.jpeg?auto=compress&cs=tinysrgb&w=1600"; // TEMP LIVE PREVIEW
        // case 6: return new URL('./../../images/projects/portrait/pic6.jpg', import.meta.url).href; // ORIGINAL DUMMY - restore when real property photos are ready
        case 6: return "https://images.pexels.com/photos/19899071/pexels-photo-19899071.jpeg?auto=compress&cs=tinysrgb&w=1600"; // TEMP LIVE PREVIEW
        // case 7: return new URL('./../../images/projects/portrait/pic7.jpg', import.meta.url).href; // ORIGINAL DUMMY - restore when real property photos are ready
        case 7: return "https://images.pexels.com/photos/5179534/pexels-photo-5179534.jpeg?auto=compress&cs=tinysrgb&w=1600"; // TEMP LIVE PREVIEW
        // default: return new URL('./../../images/projects/portrait/pic1.jpg', import.meta.url).href; // ORIGINAL DUMMY - restore when real property photos are ready
        default: return "https://images.pexels.com/photos/6588599/pexels-photo-6588599.jpeg?auto=compress&cs=tinysrgb&w=1600"; // TEMP LIVE PREVIEW
    }
};

const Projects1 = () => {
    const [activeFilter, setActiveFilter] = useState('*');
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [prevEl, setPrevEl] = useState(null);
    const [nextEl, setNextEl] = useState(null);

    // Filter projects based on active state
    const filteredProjects = activeFilter === '*'
        ? siteData.projects
        : siteData.projects.filter(project => project.filter === activeFilter);

    return (
        <div className="section-full mobile-page-padding p-t80 p-b50 bg-white">
            <div className="section-content">
                <div className="container">
                    {/* TITLE START */}
                    <div className="section-head">
                        <div className="sx-separator-outer separator-center">
                            <div className="sx-separator bg-white bg-moving bg-repeat-x" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
                                <h3 className="sep-line-one">All Projects</h3>
                            </div>
                        </div>
                    </div>
                    {/* TITLE END */}
                </div>
                
                <div className="filter-carousal-1-outer relative z-10">
                    <div className="container">
                        {/* FILTER NAV START */}
                        <div className="text-center clearfix filter-pos-right shadow m-b30">
                            <ul className="btn-filter-wrap flex flex-wrap justify-center gap-2 p-4">
                                <li 
                                    className={`btn-filter cursor-pointer px-4 py-2 rounded-sm font-semibold transition-colors ${activeFilter === '*' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                    onClick={() => setActiveFilter('*')}
                                >
                                    All
                                </li>
                                {filters.map((item, index) => (
                                    <li 
                                        key={index} 
                                        className={`btn-filter cursor-pointer px-4 py-2 rounded-sm font-semibold transition-colors ${activeFilter === item.filter ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                        onClick={() => setActiveFilter(item.filter)}
                                    >
                                        {item.label}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* FILTER NAV END */}
                    </div>

                    <div className="filter-carousal-1 w-full p-b30 px-4 md:px-12 relative">
                        {/* Custom Navigation */}
                        <button ref={(node) => setPrevEl(node)} className="absolute left-2 top-1/3 z-20 bg-white w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors rounded-full">
                            <ChevronLeft size={20} className="text-gray-800" />
                        </button>
                        <button ref={(node) => setNextEl(node)} className="absolute right-2 top-1/3 z-20 bg-white w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors rounded-full">
                            <ChevronRight size={20} className="text-gray-800" />
                        </button>

                        {/* IMAGE CAROUSEL START */}
                        <div className="section-content">
                            {/* Key on activeFilter forces Swiper to remount/recalculate on filter change to avoid stale state issues */}
                            <Swiper
                                key={activeFilter}
                                modules={[Navigation]}
                                navigation={{
                                    prevEl,
                                    nextEl,
                                }}
                                spaceBetween={30}
                                slidesPerView={1}
                                breakpoints={{
                                    540: { slidesPerView: 2 },
                                    768: { slidesPerView: 3 },
                                    1136: { slidesPerView: 4 },
                                    1366: { slidesPerView: 5 },
                                }}
                                className="project-carousel"
                            >
                                {filteredProjects.map((item, index) => {
                                    const imgUrl = getImgUrl(item.id);
                                    return (
                                        <SwiperSlide key={item.id} className="item fadingcol overflow-hide">
                                            <div className="sx-box image-hover-block relative group">
                                                <div className="sx-thum-bx overflow-hidden">
                                                    <img src={imgUrl} alt={item.title} style={{ height: '400px' }} className="w-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer" onClick={() => { setLightboxIndex(index); setLightboxOpen(true); }} />
                                                </div>
                                                <div className="sx-info p-t20 text-white absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                                                    <h4 className="sx-tilte text-xl font-bold mb-1 pointer-events-auto"><NavLink to={"/about"} className="text-white">{item.title}</NavLink></h4>
                                                    <p className="m-b0 text-sm text-gray-200">{item.location}</p>
                                                </div>
                                                <button className="cursor-pointer absolute top-4 right-4 bg-white w-10 h-10 rounded-full flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md border-none" onClick={(e) => { e.preventDefault(); setLightboxIndex(index); setLightboxOpen(true); }}>
                                                    <Maximize size={16} />
                                                </button>
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                index={lightboxIndex}
                slides={filteredProjects.map(item => ({ src: getImgUrl(item.id) }))}
            />
        </div>
    );
};

export default Projects1;