import React from 'react';
import { NavLink } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { siteData } from '../../data/siteContent';

var bgimg1 = new URL('./../../images/video-bg.jpg', import.meta.url).href;

class About3 extends React.Component {
    render() {
        return (
            <>
                <div className={`${this.props.bgcolor} section-full mobile-page-padding p-t80 p-b50`}>
                    <div className="container">
                        <div className="section-content">
                            <div className="row">
                                <div className="col-xl-6 col-lg-6 col-md-12">
                                    <div className="about-home-3 m-b30 bg-white">
                                        <h3 className="m-t0 m-b20 sx-tilte">{siteData.aboutUs.title}</h3>
                                        <p>{siteData.aboutUs.longDescription}</p>
                                        <ul className="list-angle-right anchor-line">
                                            <li><NavLink to="/about">We provide legally verified, Vastu-compliant homes.</NavLink></li>
                                            <li><NavLink to="/about">Our specialists guide you through home loans and legalities.</NavLink></li>
                                            <li><NavLink to="/about">We develop premium commercial hubs for high returns.</NavLink></li>
                                            <li><NavLink to="/about">Dedicated to bringing your dream property to reality.</NavLink></li>
                                        </ul>
                                        <div className="text-left">
                                            <NavLink to="/about" className="site-button btn-half"><span>Read More</span></NavLink>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-12">
                                    <div className="video-section-full-v2">
                                        <div className="video-section-full bg-no-repeat bg-cover bg-center overlay-wraper m-b30" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
                                            <div className="overlay-main bg-black opacity-04" />
                                            <div className="video-section-inner">
                                                <div className="video-section-content">
                                                    <NavLink to={"#"} className="play-now" data-toggle="modal" data-target="#myModal">
                                                        <i className="icon fa fa-play" />
                                                        <span className="ripple" />
                                                    </NavLink>

                                                    <div className="video-section-bottom">
                                                        <h3 className="sx-title text-white">{siteData.statistics[2].value}+ Years<br />Experience</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="myModal" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <ReactPlayer url='https://vimeo.com/34741214' />
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default About3;