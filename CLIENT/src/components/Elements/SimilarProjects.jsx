import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { getProjects } from '@/lib/dataStore';

const services = [
    {
        // image: new URL('./../../images/gallery/pic1.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready

        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Interior Work Avroko',
        description: 'Many of our projects cannot be featured in this section due to the Security levels of the space.'
    },
    {
        // image: new URL('./../../images/gallery/pic2.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready

        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Interior Work Avroko',
        description: 'Many of our projects cannot be featured in this section due to the Security levels of the space.'
    },
    {
        // image: new URL('./../../images/gallery/pic3.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready

        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Interior Work Avroko',
        description: 'Many of our projects cannot be featured in this section due to the Security levels of the space.'
    }
]

var bgimg1 = new URL('./../../images/background/cross-line2.png', import.meta.url).href;

const SimilarProjects = (props) => {
    const [allProjects, setAllProjects] = useState(services);

    useEffect(() => {
        const dynamic = getProjects().map(item => ({
            ...item,
            description: item.location
        }));
        setAllProjects([...dynamic, ...services]);
    }, []);

    const swiperOptions = {
        modules: [Navigation, Autoplay],
        loop: true,
        spaceBetween: 40,
        navigation: true,
        breakpoints: {
            0: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            991: { slidesPerView: 1 }
        }
    };
    return (
        <>
            <div className="relative py-8 md:py-20 bg-gray">
                <div className="max-w-7xl mx-auto px-4">
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
                            <Swiper className="project-carousel project-carousel1 owl-btn-vertical-center" {...swiperOptions}>
                                {allProjects.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="sx-box   image-single-carousel bg-cover" style={{ backgroundImage: 'url(' + item.image + ')' }}>
                                            <div className="sx-info  p-t20 text-white">
                                                <h4 className="sx-tilte m-t0"><NavLink to={item.id ? `/project-detail/${item.id}` : "/project-detail"}>{item.title}</NavLink></h4>
                                                <p>{item.description}</p>
                                                <NavLink to={item.id ? `/project-detail/${item.id}` : "/project-detail"} className="site-button btn-half button-sm"><span>View All</span></NavLink>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SimilarProjects;