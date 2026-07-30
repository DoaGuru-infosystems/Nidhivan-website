import React from 'react';
import { NavLink } from 'react-router-dom';
import Switcher from '../Elements/Switcher';
import { siteData } from '../../data/siteContent';

class Footer extends React.Component {
    render() {

        return (
            <>
                <footer className="bg-[#1e1e1e] text-gray-300 relative border-t-4 border-[#F4B54B]">
                    {/* FOOTER TOP */}
                    <div className="pt-20 pb-12">
                        <div className="container mx-auto px-4 max-w-7xl">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
                                
                                {/* ABOUT COMPANY */}
                                <div className="lg:col-span-4">
                                    <div className="mb-6 bg-white/5 inline-block p-4 rounded-xl border border-white/10">
                                        <NavLink to={"./"}>
                                            <img src={new URL('./../../images/nidhivan logo.png', import.meta.url).href} alt="Nidhivan Farms" style={{ maxHeight: '100px', width: 'auto' }} />
                                        </NavLink>
                                    </div>
                                    <p className="mb-6 leading-relaxed text-gray-400">{siteData.aboutUs.shortDescription}</p>
                                    <div className="flex gap-4">
                                        <a href={siteData.contactInfo.facebook} className="w-10 h-10 rounded-full bg-[#118A43]/20 flex items-center justify-center hover:bg-[#F4B54B] transition-colors group" target="_blank" rel="noreferrer" style={{ color: '#F4B54B' }}>
                                            <svg className="group-hover:text-[#1e1e1e]" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                        </a>
                                        <a href={siteData.contactInfo.instagram} className="w-10 h-10 rounded-full bg-[#118A43]/20 flex items-center justify-center hover:bg-[#F4B54B] transition-colors group" target="_blank" rel="noreferrer" style={{ color: '#F4B54B' }}>
                                            <svg className="group-hover:text-[#1e1e1e]" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                        </a>
                                        <a href="#" className="w-10 h-10 rounded-full bg-[#118A43]/20 flex items-center justify-center hover:bg-[#F4B54B] transition-colors group" target="_blank" rel="noreferrer" style={{ color: '#F4B54B' }}>
                                            <svg className="group-hover:text-[#1e1e1e]" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                                        </a>
                                        <a href="#" className="w-10 h-10 rounded-full bg-[#118A43]/20 flex items-center justify-center hover:bg-[#F4B54B] transition-colors group" target="_blank" rel="noreferrer" style={{ color: '#F4B54B' }}>
                                            <svg className="group-hover:text-[#1e1e1e]" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
                                        </a>
                                    </div>
                                </div>

                                {/* RECENT POSTS */}
                                <div className="lg:col-span-3">
                                    <h5 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#F4B54B]"></span> Recent Posts</h5>
                                    <div className="space-y-5">
                                        {/* Post 1 */}
                                        <div className="flex gap-4 group">
                                            <div className="flex flex-col items-center justify-center w-14 h-14 rounded-lg bg-[#118A43]/20 border border-[#118A43]/30 text-[#F4B54B] flex-shrink-0 group-hover:bg-[#F4B54B] group-hover:text-[#0f2416] transition-colors">
                                                <strong className="text-xl leading-none font-bold">15</strong>
                                                <span className="text-xs uppercase font-medium">Sep</span>
                                            </div>
                                            <div>
                                                <h6 className="text-sm font-semibold text-white mb-1 leading-snug group-hover:text-[#F4B54B] transition-colors"><NavLink to={"/blog-single"}>Explore our new premium farmlands.</NavLink></h6>
                                                <p className="text-xs text-gray-400"><i className="fa fa-user mr-1 text-[#F4B54B]"></i> By Admin</p>
                                            </div>
                                        </div>
                                        {/* Post 2 */}
                                        <div className="flex gap-4 group">
                                            <div className="flex flex-col items-center justify-center w-14 h-14 rounded-lg bg-[#118A43]/20 border border-[#118A43]/30 text-[#F4B54B] flex-shrink-0 group-hover:bg-[#F4B54B] group-hover:text-[#0f2416] transition-colors">
                                                <strong className="text-xl leading-none font-bold">17</strong>
                                                <span className="text-xs uppercase font-medium">Sep</span>
                                            </div>
                                            <div>
                                                <h6 className="text-sm font-semibold text-white mb-1 leading-snug group-hover:text-[#F4B54B] transition-colors"><NavLink to={"/blog-single"}>Benefits of investing in nature.</NavLink></h6>
                                                <p className="text-xs text-gray-400"><i className="fa fa-user mr-1 text-[#F4B54B]"></i> By Admin</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* USEFUL LINKS */}
                                <div className="lg:col-span-2">
                                    <h5 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#F4B54B]"></span> Useful Links</h5>
                                    <ul className="space-y-3">
                                        <li><NavLink to={"/about"} className="hover:text-[#F4B54B] transition-colors flex items-center gap-2"><i className="fa fa-angle-right text-[#F4B54B]"></i> About</NavLink></li>
                                        <li><NavLink to={"/gallery"} className="hover:text-[#F4B54B] transition-colors flex items-center gap-2"><i className="fa fa-angle-right text-[#F4B54B]"></i> Gallery</NavLink></li>
                                        <li><NavLink to={"/contact-us"} className="hover:text-[#F4B54B] transition-colors flex items-center gap-2"><i className="fa fa-angle-right text-[#F4B54B]"></i> Contact Us</NavLink></li>
                                        <li><NavLink to={"/terms"} className="hover:text-[#F4B54B] transition-colors flex items-center gap-2"><i className="fa fa-angle-right text-[#F4B54B]"></i> Terms & Conditions</NavLink></li>
                                        <li><NavLink to={"/privacy"} className="hover:text-[#F4B54B] transition-colors flex items-center gap-2"><i className="fa fa-angle-right text-[#F4B54B]"></i> Privacy Policy</NavLink></li>
                                    </ul>
                                </div>

                                {/* CONTACT US */}
                                <div className="lg:col-span-3">
                                    <h5 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#F4B54B]"></span> Contact Us</h5>
                                    <ul className="space-y-4">
                                        <li className="flex gap-3 items-start">
                                            <i className="fa fa-map-marker text-[#F4B54B] mt-1 text-lg"></i>
                                            <span className="text-gray-400">{siteData.contactInfo.address}</span>
                                        </li>
                                        <li className="flex gap-3 items-center">
                                            <i className="fa fa-envelope text-[#F4B54B] text-lg"></i>
                                            <a href={`mailto:${siteData.contactInfo.email}`} className="text-gray-400 hover:text-white transition-colors">{siteData.contactInfo.email}</a>
                                        </li>
                                        <li className="flex gap-3 items-center">
                                            <i className="fa fa-phone text-[#F4B54B] text-lg"></i>
                                            <a href={`tel:${siteData.contactInfo.phone}`} className="text-gray-400 hover:text-white transition-colors">{siteData.contactInfo.phone}</a>
                                        </li>
                                        <li className="flex gap-3 items-center">
                                            <i className="fa fa-clock-o text-[#F4B54B] text-lg"></i>
                                            <span className="text-gray-400">{siteData.contactInfo.workingHours}</span>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>



                    {/* FOOTER COPYRIGHT */}
                    <div className="bg-[#151515] py-6">
                        <div className="container mx-auto px-4 max-w-7xl">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                                <span className="text-gray-500 text-sm">© {new Date().getFullYear()} {siteData.companyName}. All Rights Reserved.</span>
                                
                                {/* HIDDEN ADMIN LINK */}
                                <NavLink 
                                    to="/admin/login" 
                                    className="w-8 h-8 opacity-0 cursor-default md:cursor-pointer flex-shrink-0"
                                    title="Admin Access"
                                    aria-label="Admin Access"
                                ></NavLink>

                                <span className="text-gray-500 text-sm flex flex-col md:flex-row items-center gap-1">
                                    Designed and developed by 
                                    <a href="https://doaguru.com" target="_blank" rel="noreferrer" className="text-[#F4B54B] font-semibold hover:text-white transition-colors">Doaguru Info Systems</a>
                                </span>
                            </div>
                        </div>
                    </div>
                </footer>
                <Switcher/>

            </>
        );
    };
};

export default Footer;
