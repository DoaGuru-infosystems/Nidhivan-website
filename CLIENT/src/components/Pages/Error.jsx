import React from 'react';
import { NavLink } from 'react-router-dom';
import Banner from './../Elements/Banner';

// var bnrimg = new URL('./../../images/banner/8.jpg', import.meta.url).href; // ORIGINAL DUMMY - restore when real property photos are ready


var bnrimg = "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1600&q=80"; // TEMP LIVE PREVIEW

class Error extends React.Component {
    render() {
        return (
            <>
                <div className="page-content">
                    <Banner title="Error 404" pagename="Error" description="The essence of interior design will always be about people and how they live. It is about the realities of what makes for an attractive, civilized." bgimage={bnrimg}/>
                    {/* SECTION CONTENTG START */}
                    <div className="section-full mobile-page-padding p-tb150 bg-bottom-left bg-no-repeat" style={{ backgroundImage: 'url(images/background/bg-4.png)' }}>
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="section-content">
                                <div className="page-notfound grid grid-cols-12 gap-6">
                                    <div className="col-span-12 md:col-span-7">
                                        <img src={new URL('./../../images/error-404.png', import.meta.url).href} alt="" />
                                    </div>
                                    <div className="col-span-12 md:col-span-5">
                                        <strong>Page Not Found</strong>
                                        <span className="title">Error 404</span>
                                        <p>The Page Requested Could not be foundwe're working on it</p>
                                        <NavLink to={"/"} title="Back to home" className="site-button btn-half"><span> Back to home</span></NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* SECTION CONTENT END */}
                </div>

                </>
        );
    };
};

export default Error;