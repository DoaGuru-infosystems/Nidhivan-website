import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { fetchAllProjects, getMediaUrl } from '@/lib/api';



var bgimg1 = new URL('./../../images/background/cross-line2.png', import.meta.url).href;

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const UpcomingProjectsCarousel1 = (props) => {
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
            <div className={`${props.bgcolor} relative py-8 md:py-20`}>
                <div className="w-full">
                    <div className="section-content">
                        {/* TITLE START */}
                        <div className="mb-10">
                            <div className={`${props.alignment} sx-separator-outer`}>
                                <div className="sx-separator bg-white bg-moving bg-repeat-x" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
                                    <h3 className="sep-line-one">{props.title}</h3>
                                </div>
                            </div>
                        </div>
                        {/* TITLE END */}
                        <div className="work-carousel-outer">
                            {allProjects.length === 0 ? (
                                <div className="text-center py-12 text-gray-500 font-medium w-full">
                                    No projects available
                                </div>
                            ) : (
                            <Swiper className="project-carousel project-carousel3 owl-btn-vertical-center p-lr80" {...swiperOptions}>
                                {allProjects.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="project-mas hover-shadow m-a30">
                                            <div className="image-effect-one">
                                                <img src={item.image} alt="" className="cursor-pointer" onClick={() => { setCurrentIndex(index); setOpen(true); }} />
                                                <div className="figcaption">
                                                    <button className="cursor-pointer bg-transparent border-none text-white" onClick={(e) => { e.preventDefault(); setCurrentIndex(index); setOpen(true); }}>
                                                        <i className="fa fa-arrows-alt" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="project-info p-a20 bg-gray">
                                                <h4 className="sx-tilte m-t0"><NavLink to={item.id ? `/project-detail/${item.id}` : "/project-detail"}>{item.title}</NavLink></h4>
                                                <p>{item.description}</p>
                                                <NavLink to={"/services-detail"}><i className="link-plus bg-primary" /></NavLink>
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

export default UpcomingProjectsCarousel1;
