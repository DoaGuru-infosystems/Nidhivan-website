import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Switcher from '../Elements/Switcher';
import { siteData } from '../../data/siteContent';
import { fetchAllBlogsClient } from '../../lib/api';

const Footer = () => {
    const [recentBlogs, setRecentBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetchAllBlogsClient();
                const data = response.data || response;
                const published = data.slice(0, 4).map(b => ({
                    ...b,
                    month: new Date(b.published_date).toLocaleString('default', { month: 'short' }),
                    date: new Date(b.published_date).getDate()
                }));
                setRecentBlogs(published);
            } catch (error) {
                console.error("Failed to load blogs in footer", error);
            }
        };
        fetchBlogs();
    }, []);

    return (
            <>
                <footer className="bg-brand-ink text-gray-300 relative border-t-4 border-brand-gold">
                    {/* FOOTER TOP */}
                    <div className="pt-20 pb-12">
                        <div className="container mx-auto px-4 max-w-[1500px]">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10 xl:gap-14">
                                
                                {/* ABOUT COMPANY */}
                                <div>
                                    <div className="mb-6 bg-white/5 inline-block p-4 rounded-xl border border-white/10">
                                        <NavLink to={"./"}>
                                            <img src={new URL('./../../images/nidhivan logo.png', import.meta.url).href} alt="Nidhivan Farms" style={{ maxHeight: '100px', width: 'auto' }} />
                                        </NavLink>
                                    </div>
                                    <p className="mb-6 leading-relaxed text-gray-400">{siteData.aboutUs.shortDescription}</p>
                                    <div className="flex gap-4">
                                        <a href={siteData.contactInfo.facebook} className="w-10 h-10 rounded-full bg-brand-green/20 text-brand-gold flex items-center justify-center hover:bg-brand-gold hover:text-brand-ink transition-colors group" target="_blank" rel="noreferrer">
                                            <svg className="group-hover:text-brand-ink" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                        </a>
                                        <a href={siteData.contactInfo.instagram} className="w-10 h-10 rounded-full bg-brand-green/20 text-brand-gold flex items-center justify-center hover:bg-brand-gold hover:text-brand-ink transition-colors group" target="_blank" rel="noreferrer">
                                            <svg className="group-hover:text-brand-ink" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                        </a>
                                        <a href="#" className="w-10 h-10 rounded-full bg-brand-green/20 text-brand-gold flex items-center justify-center hover:bg-brand-gold hover:text-brand-ink transition-colors group" target="_blank" rel="noreferrer">
                                            <svg className="group-hover:text-brand-ink" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                                        </a>
                                        <a href="#" className="w-10 h-10 rounded-full bg-brand-green/20 text-brand-gold flex items-center justify-center hover:bg-brand-gold hover:text-brand-ink transition-colors group" target="_blank" rel="noreferrer">
                                            <svg className="group-hover:text-brand-ink" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
                                        </a>
                                    </div>
                                </div>

                                {/* RECENT POSTS */}
                                <div>
                                    <h5 className="text-xl font-bold text-white mb-6 flex items-center gap-2 heading-font"><span className="w-2 h-2 rounded-full bg-brand-gold"></span> Recent Posts</h5>
                                    <div className="space-y-5">
                                        {recentBlogs.length > 0 ? recentBlogs.map((blog, idx) => (
                                            <div key={idx} className="flex gap-4 group">
                                                <div className="flex flex-col items-center justify-center w-14 h-14 rounded-lg bg-brand-green/20 border border-brand-green/30 text-brand-gold flex-shrink-0 group-hover:bg-brand-gold group-hover:text-brand-ink transition-colors">
                                                    <strong className="text-xl leading-none font-bold heading-font">{blog.date}</strong>
                                                    <span className="text-xs uppercase font-medium">{blog.month}</span>
                                                </div>
                                                <div>
                                                    <h6 className="text-sm font-semibold text-[#885023] mb-1 leading-snug group-hover:text-brand-gold transition-colors heading-font"><NavLink to={blog.slug ? `/blog-single/${blog.slug}` : "/blog-single"}>{blog.title}</NavLink></h6>
                                                    <p className="text-xs text-[#885023]"><i className="fa fa-user mr-1 text-brand-gold"></i> By {blog.author || 'Admin'}</p>
                                                </div>
                                            </div>
                                        )) : (
                                            <p className="text-sm text-gray-400">No recent posts available.</p>
                                        )}
                                    </div>
                                </div>

                                {/* USEFUL LINKS */}
                                <div>
                                    <h5 className="text-xl font-bold text-white mb-6 flex items-center gap-2 heading-font"><span className="w-2 h-2 rounded-full bg-brand-gold"></span> Useful Links</h5>
                                    <ul className="space-y-3">
                                        <li><NavLink to={"/about"} className="hover:text-brand-gold transition-colors flex items-center gap-2"><i className="fa fa-angle-right text-brand-gold"></i> About</NavLink></li>
                                        <li><NavLink to={"/gallery"} className="hover:text-brand-gold transition-colors flex items-center gap-2"><i className="fa fa-angle-right text-brand-gold"></i> Gallery</NavLink></li>
                                        <li><NavLink to={"/contact-us"} className="hover:text-brand-gold transition-colors flex items-center gap-2"><i className="fa fa-angle-right text-brand-gold"></i> Contact Us</NavLink></li>
                                        <li><NavLink to={"/terms"} className="hover:text-brand-gold transition-colors flex items-center gap-2"><i className="fa fa-angle-right text-brand-gold"></i> Terms & Conditions</NavLink></li>
                                        <li><NavLink to={"/privacy"} className="hover:text-brand-gold transition-colors flex items-center gap-2"><i className="fa fa-angle-right text-brand-gold"></i> Privacy Policy</NavLink></li>
                                    </ul>
                                </div>

                                {/* OUR PROJECTS */}
                                <div>
                                    <h5 className="text-xl font-bold text-white mb-6 flex items-center gap-2 heading-font"><span className="w-2 h-2 rounded-full bg-brand-gold"></span> Our Projects</h5>
                                    <ul className="space-y-3">
                                        <li><NavLink to={"/ongoing-projects"} className="hover:text-brand-gold transition-colors flex items-center gap-2"><i className="fa fa-angle-right text-brand-gold"></i> Ongoing Projects</NavLink></li>
                                        <li><NavLink to={"/completed-projects"} className="hover:text-brand-gold transition-colors flex items-center gap-2"><i className="fa fa-angle-right text-brand-gold"></i> Completed Projects</NavLink></li>
                                        <li><NavLink to={"/upcoming-projects"} className="hover:text-brand-gold transition-colors flex items-center gap-2"><i className="fa fa-angle-right text-brand-gold"></i> Upcoming Projects</NavLink></li>
                                    </ul>
                                </div>

                                {/* CONTACT US */}
                                <div>
                                    <h5 className="text-xl font-bold text-white mb-6 flex items-center gap-2 heading-font"><span className="w-2 h-2 rounded-full bg-brand-gold"></span> Contact Us</h5>
                                    <ul className="space-y-4">
                                        <li className="flex gap-3 items-start">
                                            <i className="fa fa-map-marker text-brand-gold mt-1 text-lg"></i>
                                            <span className="text-gray-400">{siteData.contactInfo.address}</span>
                                        </li>
                                        <li className="flex gap-3 items-center">
                                            <i className="fa fa-envelope text-brand-gold text-lg"></i>
                                            <a href={`mailto:${siteData.contactInfo.email}`} className="text-gray-400 hover:text-white transition-colors">{siteData.contactInfo.email}</a>
                                        </li>
                                        <li className="flex gap-3 items-center">
                                            <i className="fa fa-phone text-brand-gold text-lg"></i>
                                            <a href={`tel:${siteData.contactInfo.phone}`} className="text-gray-400 hover:text-white transition-colors">{siteData.contactInfo.phone}</a>
                                        </li>
                                        <li className="flex gap-3 items-center">
                                            <i className="fa fa-clock-o text-brand-gold text-lg"></i>
                                            <span className="text-gray-400">{siteData.contactInfo.workingHours}</span>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>



                    {/* FOOTER COPYRIGHT */}
                    <div className="bg-black/40 py-6 border-t border-white/5">
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
                                    <a href="https://doaguru.com" target="_blank" rel="noreferrer" className="text-brand-gold font-semibold hover:text-white transition-colors">Doaguru Info Systems</a>
                                </span>
                            </div>
                        </div>
                    </div>
                </footer>
                <Switcher/>

            </>
        );
};

export default Footer;
