import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { fetchAllProjects, getMediaUrl } from '@/lib/api';

const projects = [];

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const SimilarProjectsCarousel = () => {
    const [open, setOpen] = React.useState(false);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [allProjects, setAllProjects] = useState([]);
    const slides = allProjects.map(item => ({ src: item.image }));

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const response = await fetchAllProjects();
                const data = response.data || response;
                const dynamic = data.map(item => ({
                    ...item,
                    description: item.location,
                    image: item.images && item.images.length > 0 ? getMediaUrl(item.images[0].image_url || item.images[0].image || item.images[0]) : null
                }));
                setAllProjects(dynamic);
            } catch (error) {
                console.error("Failed to load projects", error);
            }
        };
        loadProjects();
    }, []);

    const swiperOptions = {
        modules: [Navigation, Autoplay],
        loop: true,
        spaceBetween: 40,
        slidesPerView: 3,
        navigation: true,
        breakpoints: {
            0: { slidesPerView: 1, spaceBetween: 15 },
            640: { slidesPerView: 2, spaceBetween: 15 },
            768: { slidesPerView: 2, spaceBetween: 15 },
            991: { slidesPerView: 3, spaceBetween: 15 },
            1200: { slidesPerView: 3, spaceBetween: 40 }
        }
    };
    return (
        <>
            <div className="relative py-8 md:pt-20 md:pb-12 bg-gray">
                <div className="w-full">
                    <div className="section-content">
                        {/* TITLE START */}
                        <div className="mb-12 text-left">
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">Similar Projects</h2>
                            <p className="text-slate-500 mt-2">Explore other properties that match this style</p>
                        </div>
                        {/* TITLE END */}
                        <div className="work-carousel-outer">
                            {allProjects.length === 0 ? (
                                <div className="text-center py-12 text-gray-500 font-medium w-full">
                                    No projects available
                                </div>
                            ) : (
                            <Swiper className="pb-12" {...swiperOptions}>
                                {allProjects.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
                                            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                                                <img 
                                                    src={item.image || "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80"} 
                                                    alt={item.title} 
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                                />
                                                {item.status && (
                                                    <div className="absolute top-4 left-4">
                                                        <span className="bg-white/90 backdrop-blur text-slate-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                                                            {item.status}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-6">
                                                <h4 className="text-lg font-bold text-slate-800 mb-2 truncate">
                                                    <NavLink to={item.id ? `/project-detail/${item.id}` : "/project-detail"} className="hover:text-[#118A43] transition-colors">
                                                        {item.title}
                                                    </NavLink>
                                                </h4>
                                                <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                                                    {item.description || item.location || "No description provided."}
                                                </p>
                                                <NavLink 
                                                    to={item.id ? `/project-detail/${item.id}` : "/project-detail"} 
                                                    className="inline-flex items-center text-sm font-semibold text-[#118A43] hover:text-[#0d6e35] transition-colors"
                                                >
                                                    View Details 
                                                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </NavLink>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                index={currentIndex}
                slides={slides}
            />
        </>
    );
};

export default SimilarProjectsCarousel;
