import React from 'react';
import { NavLink } from 'react-router-dom';
import { siteData } from '../../data/siteContent';

var bgimg1 = new URL('./../../images/background/bg-5.png', import.meta.url).href;
var bgimg2 = new URL('./../../images/background/bg-2.jpg', import.meta.url).href;
var bgimg3 = new URL('./../../images/background/cross-line2.png', import.meta.url).href;

class WhatWeDo1 extends React.Component {
    render() {
        return (
            <>
                <div className="section-full  mobile-page-padding bg-white  p-t80 p-b30 bg-repeat overflow-hide" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
                    <div className="container right-half-bg-image-outer">
                        {/* <div className="right-half-bg-image bg-parallax bg-fixed bg-top-right" data-stellar-background-ratio={0} style={{ backgroundImage: 'url(' + bgimg2 + ')' }} /> */}
                        {/* TITLE START */}
                        <div className="section-head">
                            <div className="sx-separator-outer separator-left">
                                <div className="sx-separator bg-white bg-moving bg-repeat-x" style={{ backgroundImage: 'url(' + bgimg3 + ')' }}>
                                    <h3 className="sep-line-one">What We do</h3>
                                </div>
                            </div>
                        </div>
                        {/* TITLE END */}
                        <div className="section-content">
                            <div className="row number-block-one-outer justify-content-center">
                                {siteData.services.map((service, index) => {
                                    const images = [
                                        "https://images.unsplash.com/photo-1745794621090-d856c53b0cc2?w=1600&q=80",
                                        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&q=80",
                                        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80",
                                        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=80"
                                    ];
                                    return (
                                        <div className="col-lg-3 col-md-6 col-sm-6 m-b30" key={index}>
                                            <div className="number-block-one animate-in-to-top">
                                                <img src={images[index % images.length]} alt="" style={{height: '250px', objectFit: 'cover', width: '100%'}} />
                                                <div className="figcaption bg-white text-center p-a20">
                                                    <h4 className="m-a0">{service.title}</h4>
                                                </div>
                                                <div className="figcaption-number text-center sx-text-primary animate-in-to-top-content">
                                                    <span>0{index + 1}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="large-title-block full-content bg-gray">
                                <div className="row">
                                    <div className="col-lg-6 col-md-12 col-sm-12">
                                        <div className="large-title">
                                            <h3 className="m-tb0">We deliver excellence in real estate and property investments.</h3>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12	col-sm-12">
                                        <div className="large-title-info">
                                            <p>Discover strategic properties, secure your investments, and build a foundation for your dreams with our expert guidance.</p>
                                            <div className="text-left">
                                                <NavLink to={"/about"} className="site-button-link">Read More</NavLink>
                                            </div>
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

export default WhatWeDo1;
