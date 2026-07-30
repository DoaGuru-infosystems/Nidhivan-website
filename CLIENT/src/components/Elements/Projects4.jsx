import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { fetchAllProjects, getMediaUrl } from '@/lib/api';

const projects = [
    {
        // image: new URL('./../../images/projects/portrait/pic1.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready

        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Chair Furniture',
        address: 'Muscat, Sultanate of Oman',
        filter: 'col-one'
    },
    {
        // image: new URL('./../../images/projects/portrait/pic2.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready

        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Chair Furniture',
        address: 'Muscat, Sultanate of Oman',
        filter: 'col-two'
    },
    {
        // image: new URL('./../../images/projects/portrait/pic3.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready

        image: "https://images.unsplash.com/photo-1745794621090-d856c53b0cc2?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Chair Furniture',
        address: 'Muscat, Sultanate of Oman',
        filter: 'col-three'
    },
    {
        // image: new URL('./../../images/projects/portrait/pic4.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready

        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Chair Furniture',
        address: 'Muscat, Sultanate of Oman',
        filter: 'col-four'
    },
    {
        // image: new URL('./../../images/projects/portrait/pic5.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready

        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Chair Furniture',
        address: 'Muscat, Sultanate of Oman',
        filter: 'col-three'
    },
    {
        // image: new URL('./../../images/projects/portrait/pic6.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready

        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Chair Furniture',
        address: 'Muscat, Sultanate of Oman',
        filter: 'col-two'
    },
    {
        // image: new URL('./../../images/projects/portrait/pic7.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready

        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Chair Furniture',
        address: 'Muscat, Sultanate of Oman',
        filter: 'col-one'
    }
]

var bgimg1 = new URL('./../../images/background/cross-line2.png', import.meta.url).href;

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Projects4 = () => {
    const [open, setOpen] = React.useState(false);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [allProjects, setAllProjects] = useState(projects);
    const slides = allProjects.map(item => ({ src: item.image }));

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const response = await fetchAllProjects();
                const data = response.data || response;
                const dynamic = data.map(item => ({
                    ...item,
                    address: item.location,
                    image: item.images && item.images.length > 0 ? getMediaUrl(item.images[0]) : (projects[item.id % projects.length]?.image || projects[0].image)
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

export default Projects4;
