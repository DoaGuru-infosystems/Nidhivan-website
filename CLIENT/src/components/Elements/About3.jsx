import React from 'react';
import { NavLink } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { siteData } from '../../data/siteContent';
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Play } from 'lucide-react';

var bgimg1 = "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1600&q=80"; // TEMP LIVE PREVIEW

class About3 extends React.Component {
    render() {
        return (
            <>
                <div className={`${this.props.bgcolor} section-full mobile-page-padding p-t80 p-b50`}>
                    <div className="container">
                        <div className="section-content">
                            <div className="grid grid-cols-12 gap-8">
                                <div className="col-span-12 lg:col-span-6">
                                    <div className="about-home-3 m-b30">
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
                                <div className="col-span-12 lg:col-span-6 relative mt-10 mr-10 mb-12">
                                    {/* The Black Frame (Offset) */}
                                    <div className="absolute -top-10 -right-10 -bottom-10 w-full border-[15px] border-[#2b2b2b] z-0 hidden lg:block"></div>
                                    
                                    {/* The Image Container */}
                                    <div className="relative z-10 w-full min-h-[450px] bg-cover bg-center shadow-2xl flex items-center justify-center group" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
                                        {/* Dark Overlay */}
                                        <div className="absolute inset-0 bg-black/40"></div>
                                        
                                        {/* Top Left White Accents */}
                                        <div className="absolute top-5 left-5 w-[30px] h-[2px] bg-white transition-all duration-500 group-hover:w-[40px]"></div>
                                        <div className="absolute top-5 left-5 w-[2px] h-[30px] bg-white transition-all duration-500 group-hover:h-[40px]"></div>
                                        
                                        {/* Bottom Right White Accents */}
                                        <div className="absolute bottom-5 right-5 w-[30px] h-[2px] bg-white transition-all duration-500 group-hover:w-[40px]"></div>
                                        <div className="absolute bottom-5 right-5 w-[2px] h-[30px] bg-white transition-all duration-500 group-hover:h-[40px]"></div>

                                        {/* Play Button */}
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button className="relative z-20 w-[80px] h-[80px] bg-white rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform cursor-pointer shadow-xl border-none outline-none focus:outline-none">
                                                    <Play className="icon" style={{fill: 'currentColor', width: '28px', height: '28px', marginLeft: '4px'}} />
                                                    {/* Pulse effect */}
                                                    <div className="absolute inset-0 rounded-full border border-white animate-ping"></div>
                                                </button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[800px] p-0 bg-transparent border-none shadow-none">
                                                <ReactPlayer url='https://vimeo.com/34741214' width="100%" height="450px" />
                                            </DialogContent>
                                        </Dialog>

                                        {/* Experience Tag */}
                                        <div className="absolute bottom-0 left-0 bg-[#fb5455] px-8 py-5 text-white z-20">
                                            <h3 className="sx-title text-white text-xl font-bold leading-tight m-0">{siteData.statistics[2].value}+ Years<br />Experience</h3>
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

export default About3;