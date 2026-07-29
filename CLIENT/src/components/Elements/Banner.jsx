import React from 'react';
import { NavLink } from 'react-router-dom';

class Banner extends React.Component {
    render() {
        return (
            <>
                <div className="sx-bnr-inr overlay-wraper bg-parallax bg-top-center flex items-center relative h-[500px] bg-cover bg-fixed" data-stellar-background-ratio="0.5" style={{ backgroundImage: 'url(' + this.props.bgimage + ')' }}>
                    <div className="overlay-main bg-black/70 absolute inset-0 z-0" />
                    <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
                        <div className="sx-bnr-inr-entry w-full">
                            <div className="banner-title-outer mb-5">
                                <div className="banner-title-name">
                                    <h2 className="m-tb0 text-white text-5xl font-extrabold mb-5">{this.props.title}</h2>
                                    <p className="text-white max-w-[555px]">
                                        {this.props.description}
                                    </p>
                                </div>
                            </div>
                            {/* BREADCRUMB ROW */}
                            <div>
                                <ul className="sx-breadcrumb breadcrumb-style-2 flex gap-2 text-white/80">
                                    <li><NavLink to={"./"} className="hover:text-white transition-colors">Home</NavLink></li>
                                    <li>/</li>
                                    <li className="text-white">{this.props.pagename}</li>
                                </ul>
                            </div>
                            {/* BREADCRUMB ROW END */}
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default Banner;