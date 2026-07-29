import React from 'react';
import { NavLink } from 'react-router-dom';

var bgimg = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"; // Luxury house background

const CtaHome = () => {
    return (
        <div className="relative py-16 md:py-24 bg-slate-900 overflow-hidden" style={{ backgroundImage: `url(${bgimg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-slate-900/85"></div>
            
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    <div className="lg:col-span-7 text-white space-y-6">
                        <h2 className="text-3xl md:text-5xl font-bold leading-tight">Ready to Find Your Dream Home?</h2>
                        <p className="text-lg md:text-xl text-slate-300 max-w-2xl">
                            Get in touch with our real estate experts today. Whether you want to buy a property or just have some questions, we are here to help you 24/7.
                        </p>
                        
                        <div className="flex flex-wrap gap-4 pt-4">
                            <a href="tel:+919876543210" className="inline-flex items-center gap-3 bg-[#118A43] text-white px-6 py-3 rounded-md font-bold text-lg hover:bg-[#0f7a3b] transition-colors shadow-lg">
                                <i className="fa fa-phone" /> Call Us Now
                            </a>
                            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-[#25D366] text-white px-6 py-3 rounded-md font-bold text-lg hover:bg-[#20bd5a] transition-colors shadow-lg">
                                <i className="fa fa-whatsapp" /> WhatsApp
                            </a>
                        </div>
                    </div>
                    
                    <div className="lg:col-span-5">
                        <div className="bg-white p-8 rounded-xl shadow-2xl">
                            <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">Quick Inquiry</h3>
                            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#118A43] focus:border-transparent transition-all" />
                                </div>
                                <div>
                                    <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#118A43] focus:border-transparent transition-all" />
                                </div>
                                <div>
                                    <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#118A43] focus:border-transparent transition-all" />
                                </div>
                                <button type="submit" className="w-full bg-[#fb5455] hover:bg-[#e04546] text-white font-bold py-3 rounded-md transition-colors shadow-md">
                                    Get a Free Consultation
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CtaHome;
