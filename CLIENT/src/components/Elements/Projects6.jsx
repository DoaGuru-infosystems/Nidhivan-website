import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { getProjects } from '@/lib/dataStore';

const projects = [
    {
        // image: new URL('./../../images/projects/square/pic4.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready

        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Life style building',
        description: 'Engineering your dreams with us the architect has always.'
    },
    {
        // image: new URL('./../../images/projects/square/pic9.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready

        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Modern Bathroom',
        description: 'Engineering your dreams with us the architect has always.'
    },
    {
        // image: new URL('./../../images/projects/square/pic10.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready

        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Dream House',
        description: 'Engineering your dreams with us the architect has always.'
    },
    {
        // image: new URL('./../../images/projects/square/pic6.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready

        image: "https://images.unsplash.com/photo-1745794621090-d856c53b0cc2?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Bellevue Projects',
        description: 'Engineering your dreams with us the architect has always.'
    },
    {
        // image: new URL('./../../images/projects/square/pic7.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready

        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Modish Interior',
        description: 'Engineering your dreams with us the architect has always.'
    },
    {
        // image: new URL('./../../images/projects/square/pic8.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready

        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Vilters',
        description: 'Engineering your dreams with us the architect has always.'
    },
    {
        // image: new URL('./../../images/projects/square/pic9.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready

        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Dream Home',
        description: 'Engineering your dreams with us the architect has always.'
    },
    {
        // image: new URL('./../../images/projects/square/pic2.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready

        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Living Room',
        description: 'Engineering your dreams with us the architect has always.'
    }
];

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Projects6 = () => {
    const [open, setOpen] = React.useState(false);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [allProjects, setAllProjects] = useState(projects);
    const slides = allProjects.map(item => ({ src: item.image }));

    useEffect(() => {
        const dynamic = getProjects().map(item => ({
            ...item,
            description: item.location
        }));
        setAllProjects([...dynamic, ...projects]);
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
                        <div className="mb-10 text-center">
                            <div className="sx-separator-outer text-black">
                                <div className="sx-separator bg-white bg-moving bg-repeat-x">
                                    <h3 className="sep-line-one">Similar Projects</h3>
                                </div>
                            </div>
                        </div>
                        {/* TITLE END */}
                        <div className="work-carousel-outer">
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
                                            <div className="project-info p-a20 bg-white">
                                                <h4 className="sx-tilte m-t0"><NavLink to={item.id ? `/project-detail/${item.id}` : "/project-detail"}>{item.title}</NavLink></h4>
                                                <p>{item.description}</p>
                                                <NavLink to={item.id ? `/project-detail/${item.id}` : "/project-detail"}><i className="link-plus bg-primary" /></NavLink>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
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

export default Projects6;