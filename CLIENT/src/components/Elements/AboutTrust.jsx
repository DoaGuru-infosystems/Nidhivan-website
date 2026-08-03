import React from 'react';
import { NavLink } from 'react-router-dom';
import { siteData } from '../../data/siteContent';
import { CheckCircle } from 'lucide-react';

const AboutTrust = ({ hideButton = false }) => {
    return (
        <section className="py-20 bg-bg-cream">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Left side: Image */}
                    <div className="relative">
                        <div className="rounded-2xl overflow-hidden shadow-2xl relative z-10 border-4 border-white">
                            <img src="/images/about/about.webp" alt="Nidhivan Developer Farmhouse" className="w-full h-[500px] object-cover" />
                        </div>
                        {/* Decorative element behind the image */}
                        <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-brand-gold rounded-full opacity-20 -z-10"></div>
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-green rounded-full opacity-20 -z-10"></div>
                    </div>

                    {/* Right side: Content */}
                    <div>
                        <h4 className="text-brand-green font-semibold uppercase tracking-wider mb-2">{siteData.aboutUs.title}</h4>
                        <h2 className="text-4xl md:text-5xl heading-font text-brand-ink mb-6 leading-tight">
                            {siteData.taglines[0]}
                        </h2>
                        
                        <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                            {siteData.aboutUs.longDescription}
                        </p>

                        {/* Checklist */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                            {siteData.whyChooseUs.map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <CheckCircle className="text-brand-gold w-6 h-6 flex-shrink-0" />
                                    <span className="text-brand-ink font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        {/* Button */}
                        {!hideButton && (
                            <NavLink to="/about" className="inline-block bg-brand-gold text-white px-8 py-4 rounded font-bold uppercase tracking-wider hover:bg-brand-ink transition-colors shadow-lg">
                                Discover More
                            </NavLink>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutTrust;
