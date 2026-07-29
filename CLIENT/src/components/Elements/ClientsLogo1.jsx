import React from 'react';
import { NavLink } from 'react-router-dom';

const logos = [
    { image: new URL('./../../images/client-logo/logo1.png', import.meta.url).href },
    { image: new URL('./../../images/client-logo/logo2.png', import.meta.url).href },
    { image: new URL('./../../images/client-logo/logo3.png', import.meta.url).href },
    { image: new URL('./../../images/client-logo/logo4.png', import.meta.url).href },
    { image: new URL('./../../images/client-logo/logo5.png', import.meta.url).href },
    { image: new URL('./../../images/client-logo/logo6.png', import.meta.url).href },
    { image: new URL('./../../images/client-logo/logo7.png', import.meta.url).href },
    { image: new URL('./../../images/client-logo/logo8.png', import.meta.url).href }
];

var bgimg1 = new URL('./../../images/background/bg-12.jpg', import.meta.url).href;
var bgimg2 = new URL('./../../images/background/cross-line2.png', import.meta.url).href;

class ClientsLogo1 extends React.Component {
    render() {
        return (
            <>
                <div className="relative  py-8 md:py-0 bg-gray  pt-20 pb-2 bg-repeat" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
                    <div className="max-w-7xl mx-auto px-4">
                        {/* TITLE START */}
                        <div className="mb-10">
                            <div className="sx-separator-outer separator-left">
                                <div className="sx-separator bg-white bg-moving bg-repeat-x" style={{ backgroundImage: 'url(' + bgimg2 + ')' }}>
                                    <h3 className="sep-line-one">Our Clients</h3>
                                </div>
                            </div>
                        </div>
                        {/* TITLE END */}
                        <div className="section-content">
                            <div className="client-grid m-b40">
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {logos.map((item, index) => (
                                        <div className="m-b30" key={index}>
                                            <NavLink to={"/about-1"} className="client-logo-pic">
                                                <img src={item.image} alt=""/>
                                                <div>
                                                    <span>View More</span>
                                                </div>
                                            </NavLink>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hilite-title text-left p-l50 text-uppercase">
                        <strong>Clients</strong>
                    </div>
                </div>
            </>
        );
    }
};

export default ClientsLogo1;