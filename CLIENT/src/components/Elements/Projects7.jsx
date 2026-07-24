import React from 'react';
import { NavLink } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const projects = [
    {
        image: new URL('./../../images/projects/square/pic4.jpg', import.meta.url).href,
        title: 'Life style building',
        description: 'Engineering your dreams with us the architect has always.'
    },
    {
        image: new URL('./../../images/projects/square/pic9.jpg', import.meta.url).href,
        title: 'Modern Bathroom',
        description: 'Engineering your dreams with us the architect has always.'
    },
    {
        image: new URL('./../../images/projects/square/pic10.jpg', import.meta.url).href,
        title: 'Dream House',
        description: 'Engineering your dreams with us the architect has always.'
    },
    {
        image: new URL('./../../images/projects/square/pic6.jpg', import.meta.url).href,
        title: 'Bellevue Projects',
        description: 'Engineering your dreams with us the architect has always.'
    },
    {
        image: new URL('./../../images/projects/square/pic7.jpg', import.meta.url).href,
        title: 'Modish Interior',
        description: 'Engineering your dreams with us the architect has always.'
    },
    {
        image: new URL('./../../images/projects/square/pic8.jpg', import.meta.url).href,
        title: 'Vilters',
        description: 'Engineering your dreams with us the architect has always.'
    },
    {
        image: new URL('./../../images/projects/square/pic9.jpg', import.meta.url).href,
        title: 'Dream Home',
        description: 'Engineering your dreams with us the architect has always.'
    },
    {
        image: new URL('./../../images/projects/square/pic2.jpg', import.meta.url).href,
        title: 'Living Room',
        description: 'Engineering your dreams with us the architect has always.'
    }
]

var bgimg1 = new URL('./../../images/background/cross-line2.png', import.meta.url).href;

class Projects7 extends React.Component {
    render() {
        const options = {
            loop: true,
            autoplay: false,
            center: false,
            items: 3,
            margin: 40,
            nav: true,
            dots: false,
            navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
            responsive: {
                0: {
                    items: 1,
                    margin: 15,
                },
                640: {
                    items: 2,
                    margin: 15
                },
                768: {
                    items: 2,
                    margin: 15
                },
                991: {
                    items: 3,
                    margin: 15
                },
                1200: {
                    items: 3
                }

            }
        };
        return (
            <>
                <div className="section-full p-tb80 bg-gray inner-page-padding">
                    <div className="container-fluid">
                        <div className="section-content">
                            {/* TITLE START */}
                            <div className="section-head">
                                <div className="sx-separator-outer separator-left">
                                    <div className="sx-separator bg-white bg-moving bg-repeat-x" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
                                        <h3 className="sep-line-one">Similar Project</h3>
                                    </div>
                                </div>
                            </div>
                            {/* TITLE END */}
                            <div className="work-carousel-outer">
                            <OwlCarousel className="owl-carousel mfp-gallery project-carousel project-carousel3 owl-btn-vertical-center p-lr80" {...options}>
                                    {projects.map((item, index) => (
                                        <div key={index} className="item">
                                        <div className="project-mas m-a30">
                                            <div className="image-effect-one">
                                                <img src={item.image} alt=""/>
                                                <div className="figcaption">
                                                    <a className="mfp-link" href={item.image}>
                                                        <i className="fa fa-arrows-alt" />
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="project-info p-a20 bg-white">
                                                <h4 className="sx-tilte m-t0"><NavLink to={"/project-detail1"}>{item.title}</NavLink></h4>
                                                <p>{item.description}</p>
                                                <NavLink to={"#"}><i className="link-plus bg-primary" /></NavLink>
                                            </div>
                                        </div>
                                        </div>
                                    ))}
                                </OwlCarousel>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        );
    }
};

export default Projects7;