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

const UpcomingProjectsCarousel2 = () => {
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
                    address: item.location,
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
        spaceBetween: 30,
        slidesPerView: 4,
        navigation: true,
        breakpoints: {
            0: { slidesPerView: 1, spaceBetween: 15 },
            640: { slidesPerView: 2, spaceBetween: 15 },
            768: { slidesPerView: 2, spaceBetween: 15 },
            991: { slidesPerView: 3, spaceBetween: 15 },
            1200: { slidesPerView: 4, spaceBetween: 30 }
        }
    };
    return (
        <>
            <div className="relative py-8 md:py-20 bg-white">
                <div className="section-content">
                    {/* TITLE START */}
                    <div className="mb-10 text-center">
                        <div className="sx-separator-outer">
                            <div className="sx-separator bg-white bg-moving bg-repeat-x" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
                                <h3 className="sep-line-one">Carousel style 2</h3>
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
                        <Swiper className="project-carousel project-carousel4 owl-btn-vertical-center p-lr80" {...swiperOptions}>
                            {allProjects.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className="sx-box image-hover-block">
                                        <div className="sx-thum-bx">
                                            <img src={item.image} alt="" className="cursor-pointer" onClick={() => { setCurrentIndex(index); setOpen(true); }} />
                                        </div>
                                        <div className="sx-info p-t20 text-white">
                                            <h4 className="sx-tilte"><NavLink to={item.id ? `/project-detail/${item.id}` : "/project-detail"}>{item.title}</NavLink></h4>
                                            <p className="m-b0">{item.address}</p>
                                        </div>
                                        <NavLink className="mfp-link" to={"#"} onClick={(e) => { e.preventDefault(); setCurrentIndex(index); setOpen(true); }}>
                                            <i className="fa fa-arrows-alt" />
                                        </NavLink>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        )}
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

export default UpcomingProjectsCarousel2;
