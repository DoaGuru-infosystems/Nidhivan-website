import React, { useState, useEffect } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { siteData } from '../../data/siteContent';
import { Maximize, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchAllProjects, getMediaUrl } from '@/lib/api';

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
        case 1: return "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&q=80"; // TEMP LIVE PREVIEW
        // case 2: return new URL('./../../images/projects/portrait/pic2.jpg', import.meta.url).href; // ORIGINAL DUMMY - restore when real property photos are ready
        case 2: return "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80"; // TEMP LIVE PREVIEW
        // case 3: return new URL('./../../images/projects/portrait/pic3.jpg', import.meta.url).href; // ORIGINAL DUMMY - restore when real property photos are ready
        case 3: return "https://images.unsplash.com/photo-1745794621090-d856c53b0cc2?w=1600&q=80"; // TEMP LIVE PREVIEW
        // case 4: return new URL('./../../images/projects/portrait/pic4.jpg', import.meta.url).href; // ORIGINAL DUMMY - restore when real property photos are ready
        case 4: return "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&q=80"; // TEMP LIVE PREVIEW
        // case 5: return new URL('./../../images/projects/portrait/pic5.jpg', import.meta.url).href; // ORIGINAL DUMMY - restore when real property photos are ready
        case 5: return "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80"; // TEMP LIVE PREVIEW
        // case 6: return new URL('./../../images/projects/portrait/pic6.jpg', import.meta.url).href; // ORIGINAL DUMMY - restore when real property photos are ready
        case 6: return "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1600&q=80"; // TEMP LIVE PREVIEW
        // case 7: return new URL('./../../images/projects/portrait/pic7.jpg', import.meta.url).href; // ORIGINAL DUMMY - restore when real property photos are ready
        case 7: return "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=80"; // TEMP LIVE PREVIEW
        // default: return new URL('./../../images/projects/portrait/pic1.jpg', import.meta.url).href; // ORIGINAL DUMMY - restore when real property photos are ready
        default: return "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80"; // TEMP LIVE PREVIEW
    }
};

const HomeProjectsFilter = () => {
    const [activeFilter, setActiveFilter] = useState('*');
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [prevEl, setPrevEl] = useState(null);
    const [nextEl, setNextEl] = useState(null);
    const [allProjects, setAllProjects] = useState([]);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const response = await fetchAllProjects();
                const data = response.data || response;
                const dynamic = data.map(item => ({
                    ...item,
                    address: item.location,
                    filter: filters.find(f => f.label === item.category)?.filter || item.category,
                    // If image doesn't exist, fallback to null
                    imgUrl: item.images && item.images.length > 0 ? getMediaUrl(item.images[0].image_url || item.images[0].image || item.images[0]) : null
                }));
                setAllProjects(dynamic);
            } catch (error) {
                console.error("Failed to load projects", error);
            }
        };
        loadProjects();
    }, []);

    // Filter projects based on active state
    const filteredProjects = activeFilter === '*'
        ? allProjects
        : allProjects.filter(project => project.filter === activeFilter);

    return (
        <div className="relative py-8 md:pt-20 md:pb-12 bg-white">
            <div className="section-content">
                <div className="max-w-7xl mx-auto px-4">
                    {/* TITLE START */}
                    <div className="mb-10">
                        <div className="sx-separator-outer separator-center">
                            <div className="sx-separator bg-white bg-moving bg-repeat-x" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
                                <h3 className="sep-line-one">All Projects</h3>
                            </div>
                        </div>
                    </div>
                    {/* TITLE END */}
                </div>
                
                <div className="filter-carousal-1-outer relative z-10">
                    <div className="max-w-7xl mx-auto px-4">
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

                    <div className="filter-carousal-1 w-full pb-8 px-4 md:px-12 relative">
                        {/* Custom Navigation */}
                        <button ref={(node) => setPrevEl(node)} className="absolute left-2 top-1/3 z-20 bg-white w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors rounded-full">
                            <ChevronLeft size={20} className="text-gray-800" />
                        </button>
                        <button ref={(node) => setNextEl(node)} className="absolute right-2 top-1/3 z-20 bg-white w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors rounded-full">
                            <ChevronRight size={20} className="text-gray-800" />
                        </button>

                        {/* IMAGE CAROUSEL START */}
                        <div className="section-content">
                            {filteredProjects.length === 0 ? (
                                <div className="text-center w-full py-12 text-gray-500 text-xl font-medium">
                                    No content available
                                </div>
                            ) : (
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
                                    return (
                                        <SwiperSlide key={`${item.id}-${index}`} className="item fadingcol overflow-hide">
                                            <div className="sx-box image-hover-block relative group">
                                                <div className="sx-thum-bx overflow-hidden">
                                                    <NavLink to={`/project-detail/${item.id}`}>
                                                        <img src={item.imgUrl || getImgUrl(item.id)} alt={item.title} style={{ height: '400px' }} className="w-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer" />
                                                    </NavLink>
                                                </div>
                                                <div className="sx-info p-t20 text-white absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 transition-all duration-300 pointer-events-none">
                                                    <h4 className="sx-tilte text-xl font-bold mb-1 pointer-events-auto !opacity-100"><NavLink to={`/project-detail/${item.id}`} className="text-white">{item.title}</NavLink></h4>
                                                    <p className="m-b0 text-sm text-gray-200 !opacity-100">{item.location}</p>
                                                </div>
                                                <button className="cursor-pointer absolute top-4 right-4 bg-white w-10 h-10 rounded-full flex items-center justify-center text-[#2B2B2B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md border-none" onClick={(e) => { e.preventDefault(); setLightboxIndex(index); setLightboxOpen(true); }}>
                                                    <Maximize size={16} />
                                                </button>
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                index={lightboxIndex}
                slides={filteredProjects.map(item => ({ src: item.imgUrl || getImgUrl(item.id) }))}
            />
        </div>
    );
};

export default HomeProjectsFilter;
