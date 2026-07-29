import React from 'react';
import { NavLink } from 'react-router-dom';

var bgimg = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"; // Premium interior image

const CtaAbout = () => {
    return (
        <div className="relative py-20 md:py-32 bg-slate-900 overflow-hidden" style={{ backgroundImage: `url(${bgimg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-slate-900/70"></div>
            
            <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                    Ready to Own Your Dream Property?
                </h2>
                <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                    Take the first step towards a better future. Let our experts guide you to a property that perfectly matches your lifestyle and investment goals.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <NavLink to="/project-grid" className="w-full sm:w-auto px-8 py-4 bg-[#118A43] text-white rounded-md font-bold text-lg hover:bg-[#0f7a3b] transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-300">
                        Explore Projects
                    </NavLink>
                    <NavLink to="/contact-us" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 rounded-md font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-300">
                        Contact Us
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default CtaAbout;
