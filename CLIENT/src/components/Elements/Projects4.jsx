import React from 'react';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const projects = [
    {
        // image: new URL('./../../images/projects/portrait/pic1.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready

        image: "https://images.pexels.com/photos/6933852/pexels-photo-6933852.jpeg?auto=compress&cs=tinysrgb&w=1600", // TEMP LIVE PREVIEW
        title: 'Chair Furniture',
        address: 'Muscat, Sultanate of Oman',
        filter: 'col-one'
    },
    {
        // image: new URL('./../../images/projects/portrait/pic2.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready

        image: "https://images.pexels.com/photos/6934189/pexels-photo-6934189.jpeg?auto=compress&cs=tinysrgb&w=1600", // TEMP LIVE PREVIEW
        title: 'Chair Furniture',
        address: 'Muscat, Sultanate of Oman',
        filter: 'col-two'
    },
    {
        // image: new URL('./../../images/projects/portrait/pic3.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready

        image: "https://images.pexels.com/photos/28991200/pexels-photo-28991200.jpeg?auto=compress&cs=tinysrgb&w=1600", // TEMP LIVE PREVIEW
        title: 'Chair Furniture',
        address: 'Muscat, Sultanate of Oman',
        filter: 'col-three'
    },
    {
        // image: new URL('./../../images/projects/portrait/pic4.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready

        image: "https://images.pexels.com/photos/7060814/pexels-photo-7060814.jpeg?auto=compress&cs=tinysrgb&w=1600", // TEMP LIVE PREVIEW
        title: 'Chair Furniture',
        address: 'Muscat, Sultanate of Oman',
        filter: 'col-four'
    },
    {
        // image: new URL('./../../images/projects/portrait/pic5.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready

        image: "https://images.pexels.com/photos/4468806/pexels-photo-4468806.jpeg?auto=compress&cs=tinysrgb&w=1600", // TEMP LIVE PREVIEW
        title: 'Chair Furniture',
        address: 'Muscat, Sultanate of Oman',
        filter: 'col-three'
    },
    {
        // image: new URL('./../../images/projects/portrait/pic6.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready

        image: "https://images.pexels.com/photos/19899071/pexels-photo-19899071.jpeg?auto=compress&cs=tinysrgb&w=1600", // TEMP LIVE PREVIEW
        title: 'Chair Furniture',
        address: 'Muscat, Sultanate of Oman',
        filter: 'col-two'
    },
    {
        // image: new URL('./../../images/projects/portrait/pic7.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready

        image: "https://images.pexels.com/photos/5179534/pexels-photo-5179534.jpeg?auto=compress&cs=tinysrgb&w=1600", // TEMP LIVE PREVIEW
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
    const slides = projects.map(item => ({ src: item.image }));

    const swiperOptions = {
        modules: [Navigation, Autoplay],
        loop: true,
        spaceBetween: 40,
        slidesPerView: 3,
        navigation: true,
        breakpoints: {
            0: { slidesPerView: 1, spaceBetween: 15 },
            640: { slidesPerView: 2, spaceBetween: 15 },
            800: { slidesPerView: 3, spaceBetween: 20 },
            1200: { slidesPerView: 4, spaceBetween: 40 }
        }
    };
    return (
        <>
            <div className="section-full p-tb80 bg-white inner-page-padding">
                <div className="container-fluid">
                    <div className="section-content">
                        {/* TITLE START */}
                        <div className="section-head">
                            <div className="sx-separator-outer separator-left">
                                <div className="sx-separator bg-white bg-moving bg-repeat-x" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
                                    <h3 className="sep-line-one">Carousel style 2</h3>
                                </div>
                            </div>
                        </div>
                        {/* TITLE END */}
                        <div className="work-carousel-outer">
                            <Swiper className="project-carousel project-carousel4 owl-btn-vertical-center" {...swiperOptions}>
                                {projects.map((item, index) => (
                                    <SwiperSlide key={index} className={`${item.filter} fadingcol overflow-hide`}>
                                        <div className="sx-box   image-hover-block">
                                            <div className="sx-thum-bx">
                                                <img src={item.image} alt="" className="cursor-pointer" onClick={() => { setCurrentIndex(index); setOpen(true); }} />
                                            </div>
                                            <div className="sx-info  p-t20 text-white">
                                                <h4 className="sx-tilte"><NavLink to={"/project-detail1"}>{item.title}</NavLink></h4>
                                                <p className="m-b0">{item.address}</p>
                                            </div>
                                            <button className="cursor-pointer bg-transparent border-none text-white absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/80 transition-colors" onClick={(e) => { e.preventDefault(); setCurrentIndex(index); setOpen(true); }}>
                                                <i className="fa fa-arrows-alt" />
                                            </button>
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

export default Projects4;