import React from 'react';
import { NavLink } from 'react-router-dom';
import Header4 from './../Common/Header4';
import Footer from './../Common/Footer';
import Banner from './../Elements/Banner';

const teamMembers = [
    {
        image: new URL('./../../images/our-team5/1.jpg', import.meta.url).href,
        membername: 'Johnny Jackman',
        position: 'Architect'
    },
    {
        image: new URL('./../../images/our-team5/2.jpg', import.meta.url).href,
        membername: 'Daniel Rickman',
        position: 'Architect'
    },
    {
        image: new URL('./../../images/our-team5/3.jpg', import.meta.url).href,
        membername: 'Mark Norwich',
        position: 'Finances'
    },
    {
        image: new URL('./../../images/our-team5/4.jpg', import.meta.url).href,
        membername: 'Nich Jonas',
        position: 'Finances'
    },
    {
        image: new URL('./../../images/our-team5/5.jpg', import.meta.url).href,
        membername: 'Johnny Jackman',
        position: 'Architect'
    },
    {
        image: new URL('./../../images/our-team5/6.jpg', import.meta.url).href,
        membername: 'Daniel Rickman',
        position: 'Architect'
    },
    {
        image: new URL('./../../images/our-team5/7.jpg', import.meta.url).href,
        membername: 'Mark Norwich',
        position: 'Finances'
    },
    {
        image: new URL('./../../images/our-team5/8.jpg', import.meta.url).href,
        membername: 'Nich Jonas',
        position: 'Finances'
    }
]

var bnrimg = new URL('./../../images/banner/3.jpg', import.meta.url).href;

class Team1 extends React.Component {
    render() {
        return (
            <>
                <Header4 />
                <div className="page-content">
                    <Banner title="Our Experts" pagename="Team" description="The essence of interior design will always be about people and how they live. It is about the realities of what makes for an attractive, civilized." bgimage={bnrimg} />
                    {/* OUR Team START */}
                    <div className="section-full p-t80 p-b50 mobile-page-padding">
                        <div className="container">
                            {/* IMAGE CAROUSEL START */}
                            <div className="section-content">
                                <div className="row our-team-2-outer">
                                    {teamMembers.map((item, index) => (
                                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 m-b30" key={index}>
                                            <div className="our-team-2">
                                                <div className="profile-image">
                                                    <img src={item.image} alt="" />
                                                    <div className="icons">
                                                        <a href="https://www.facebook.com" target="_blank"><i className="fa fa-facebook" /></a>
                                                        <a href="https://www.twitter.com" target="_blank"> <i className="fa fa-twitter" /></a>
                                                        <a href="https://www.instagram.com" target="_blank"> <i className="fa fa-instagram" /></a>
                                                        <a href="https://in.linkedin.com" target="_blank"> <i className="fa fa-linkedin" /></a>
                                                    </div>
                                                </div>
                                                <div className="figcaption text-black">
                                                    <h4 className="m-t0"><NavLink to={"/team-single"}>{item.membername}</NavLink></h4>
                                                    <span>{item.position}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* OUR Team END */}
                </div>

                <Footer />
            </>
        );
    };
};

export default Team1;