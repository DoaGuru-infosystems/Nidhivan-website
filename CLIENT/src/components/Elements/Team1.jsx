import React from 'react';
import { NavLink } from 'react-router-dom';

import { siteData } from '../../data/siteContent';

var bgimg1 = new URL('./../../images/background/cross-line2.png', import.meta.url).href;

class Team1 extends React.Component {
    render() {
        return (
            <>
                <div className="section-full p-t80 p-b50 mobile-page-padding">
                    <div className="container">
                        {/* TITLE START */}
                        <div className="section-head">
                            <div className="sx-separator-outer separator-left">
                                <div className="sx-separator bg-white bg-moving bg-repeat-x" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
                                    <h3 className="sep-line-one">Super Team</h3>
                                </div>
                            </div>
                        </div>
                        {/* TITLE END */}
                        {/* IMAGE CAROUSEL START */}
                        <div className="section-content">
                            <div className="row team-item-four">
                                {siteData.team.map((item, index) => {
                                    const imgUrl = new URL(`./../../images/our-team5/${(index % 4) + 1}.jpg`, import.meta.url).href;
                                    return (
                                    <div className="col-lg-3 col-md-6 col-sm-6 m-b30" key={index}>
                                        <div className="our-team-2 ">
                                            <div className="profile-image">
                                                <img src={imgUrl} alt="" />
                                                <div className="icons">
                                                    <a href="https://www.facebook.com" target="_blank" rel="noreferrer"><i className="fa fa-facebook" /></a>
                                                    <a href="https://www.twitter.com" target="_blank" rel="noreferrer"> <i className="fa fa-twitter" /></a>
                                                    <a href="https://www.instagram.com" target="_blank" rel="noreferrer"> <i className="fa fa-instagram" /></a>
                                                    <a href="https://in.linkedin.com" target="_blank" rel="noreferrer"> <i className="fa fa-linkedin" /></a>
                                                </div>
                                            </div>
                                            <div className="figcaption text-black">
                                                <h4 className="m-t0"><NavLink to={"/about"}>{item.name}</NavLink></h4>
                                                <span className="m-b0">{item.role}</span>
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

export default Team1;