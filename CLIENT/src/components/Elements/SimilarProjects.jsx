import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { fetchAllProjects, getMediaUrl } from '@/lib/api';



var bgimg1 = new URL('./../../images/background/cross-line2.png', import.meta.url).href;

const SimilarProjects = (props) => {
    const [allProjects, setAllProjects] = useState([]);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const response = await fetchAllProjects();
                const data = response.data || response;
                const dynamic = data.map(item => ({
                    ...item,
                    description: item.location,
                    image: item.images && item.images.length > 0 ? getMediaUrl(item.images[0]) : (services[item.id % services.length]?.image || services[0].image)
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
                            {allProjects.length === 0 ? (
                                <div className="text-center py-12 text-gray-500 font-medium w-full">
                                    No projects available
                                </div>
                            ) : (
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
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SimilarProjects;
