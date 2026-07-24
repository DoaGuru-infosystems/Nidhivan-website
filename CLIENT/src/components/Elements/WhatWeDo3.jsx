import React from 'react';
import { NavLink } from 'react-router-dom';

import { siteData } from '../../data/siteContent';

var bgimg1 = new URL('./../../images/background/cross-line2.png', import.meta.url).href;
var bgimg2 = new URL('./../../images/background/cross-line2.png', import.meta.url).href;

class WhatWeDo3 extends React.Component {
    render() {
        return (
            <>
                <div className="section-full  mobile-page-padding bg-white  p-t80 p-b50 bg-repeat overflow-hide" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
                    <div className="container">
                        {/* TITLE START */}
                        <div className="section-head">
                            <div className="sx-separator-outer separator-center">
                                <div className="sx-separator bg-white bg-moving bg-repeat-x" style={{ backgroundImage: 'url(' + bgimg2 + ')' }}>
                                    <h3 className="sep-line-one">What We Do</h3>
                                </div>
                            </div>
                        </div>
                        {/* TITLE END */}
                        <div className="section-content">
                            <div className="row number-block-three-outer justify-content-center">
                                {siteData.services.map((item, index) => {
                                    const imgUrl = new URL(`./../../images/services/service-projects/${index + 1}.jpg`, import.meta.url).href;
                                    return (
                                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 m-b30" key={index}>
                                        <div className="number-block-three slide-ani-top">
                                            <div className="sx-media">
                                                <img src={imgUrl} alt="" />
                                            </div>
                                            <div className="figcaption bg-gray  p-a30">
                                                <h4 className="m-tb0"><NavLink to={"/about"}>{item.title}</NavLink></h4>
                                                <div className="figcaption-number animate-top-content">
                                                    <span>0{index + 1}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )})}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default WhatWeDo3;