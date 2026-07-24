import React from 'react';
import { NavLink } from 'react-router-dom';
import { siteData } from '../../data/siteContent';

var bgimg1 = new URL('./../../images/background/cross-line2.png', import.meta.url).href;

class Services1 extends React.Component {
    render() {

        return (
            <>
                <div className="section-full mobile-page-padding p-t80  p-b50 bg-gray">
                    <div className="section-content">
                        <div className="container">
                            {/* TITLE START */}
                            <div className="section-head">
                                <div className="sx-separator-outer separator-left">
                                    <div className="sx-separator bg-white bg-moving bg-repeat-x" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
                                        <h3 className="sep-line-one ">All Services</h3>
                                    </div>
                                </div>
                            </div>
                            {/* TITLE END */}
                            <div className="row">
                                {siteData.services.map((item, index) => (
                                    <div className="col-lg-4 col-md-6 col-sm-12 m-b30" key={index}>
                                        <div className="sx-icon-box-wraper  icon-count-2-outer">
                                            <div className="icon-count-2 bg-white">
                                                <span className="icon-count-number">{"0" + item.id}</span>
                                                <div className="icon-xl inline-icon m-b5 scale-in-center">
                                                    <span className="icon-cell"><i className={item.icon} /></span>
                                                </div>
                                                <div className="icon-content">
                                                    <h4 className="sx-tilte">{item.title}</h4>
                                                    <p>{item.description}</p>
                                                    <div className="text-left">
                                                        <NavLink to={"/about"} className="site-button-link">Read More</NavLink>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="hilite-title text-left p-l50 text-uppercase">
                        <strong>Services</strong>
                    </div>
                </div>
            </>
        );
    }
};

export default Services1;