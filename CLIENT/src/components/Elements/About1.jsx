import React from 'react';
import { NavLink } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const images = [
    new URL('./../../images/about-slider/1.jpg', import.meta.url).href,
    new URL('./../../images/about-slider/2.jpg', import.meta.url).href,
    new URL('./../../images/about-slider/3.jpg', import.meta.url).href,
    new URL('./../../images/about-slider/4.jpg', import.meta.url).href,
    new URL('./../../images/about-slider/5.jpg', import.meta.url).href
]

var bgimg1 = new URL('./../../images/background/bg-4.png', import.meta.url).href;
var bgimg2 = new URL('./../../images/background/cross-line2.png', import.meta.url).href;

class About1 extends React.Component {

    render() {
        const options = {
            loop: true,
            autoplay: true,
            margin: 30,
            nav: true,
            dots: true,
            navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
            responsive: {
                0: {
                    items: 1
                },
                991: {
                    items: 1
                }
            }
        };
        return (
            <>
                <div className="section-full mobile-page-padding p-t80 p-b80 bg-white bg-no-repeat bg-bottom-left" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
                    <div className="container">
                        {/* TITLE START */}
                        <div className="section-head">
                            <div className="sx-separator-outer separator-left">
                                <div className="sx-separator bg-white bg-moving bg-repeat-x" style={{ backgroundImage: 'url(' + bgimg2 + ')' }}>
                                    <h3 className="sep-line-one">About us</h3>
                                </div>
                            </div>
                        </div>
                        {/* TITLE END */}
                        <div className="section-content">
                            <div className="row">
                                <div className="col-lg-5 col-md-12 col-sm-12">
                                    <div className="about-home-left">
                                        <h3 className="m-t0 sx-tilte">We are competitive in architecture solutions</h3>
                                        <p>Landscape design is a process of developing practical and pleasing outdoor living space. there are six principles of design that have been used by artists for centuries throughout all art forms, painting and floral design.</p>
                                        <div className="text-left">
                                            <NavLink to="/about-1" className="site-button-secondry btn-half"><span>Read More</span></NavLink>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-7 col-md-12 col-sm-12">
                                    <div className="about-home-right">
                                        <OwlCarousel className="owl-carousel about-home number-slider owl-btn-vertical-center" {...options}>
                                            {images.map((item, index) => (
                                                <div className="item" key={index}>
                                                    <div className="sx-img-effect zoom-slow">
                                                    <NavLink to={"/about-1"}><img src={item} alt="" /></NavLink>
                                                    </div>
                                                </div>

                                            ))}

                                        </OwlCarousel>
                                        <div className="about-home-before">
                                            <img src={new URL('./../../images/about-slider/1-ab.jpg', import.meta.url).href} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default About1;