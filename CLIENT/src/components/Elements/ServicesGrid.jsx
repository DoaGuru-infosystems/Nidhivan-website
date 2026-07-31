import React from 'react';
import { NavLink } from 'react-router-dom';
import { siteData } from '../../data/siteContent';
import { Home, Trees, Building2, FileCheck, Users, Handshake, Search } from 'lucide-react';

const iconMap = {
    "flaticon-home": <Home className="w-8 h-8 text-brand-gold" />,
    "flaticon-real-estate": <Trees className="w-8 h-8 text-brand-gold" />,
    "flaticon-building": <Building2 className="w-8 h-8 text-brand-gold" />,
    "flaticon-contract": <FileCheck className="w-8 h-8 text-brand-gold" />,
    "flaticon-users": <Users className="w-8 h-8 text-brand-gold" />,
    "flaticon-handshake": <Handshake className="w-8 h-8 text-brand-gold" />,
    "flaticon-window": <Search className="w-8 h-8 text-brand-gold" />
};

const ServicesGrid = ({ 
    title = "Our Premium Services", 
    subtitle = "What We Do", 
    description = "We provide a comprehensive range of real estate services to help you find, develop, and secure your perfect property.",
    data = siteData.services,
    gridCols = "lg:grid-cols-4",
    sectionBg = "bg-bg-cream-alt",
    cardBg = "bg-white"
}) => {
    return (
        <section className={`py-20 ${sectionBg}`}>
            <div className="max-w-7xl mx-auto px-4">
                
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    {subtitle && <h4 className="text-brand-green font-semibold uppercase tracking-wider mb-2">{subtitle}</h4>}
                    {title && <h2 className="text-4xl md:text-5xl heading-font text-brand-ink mb-4">{title}</h2>}
                    {description && (
                        <p className="text-gray-600 text-lg">
                            {description}
                        </p>
                    )}
                </div>

                {/* Services Grid */}
                <div className={`grid grid-cols-1 md:grid-cols-2 ${gridCols} gap-8`}>
                    {data.map((service, index) => (
                        <div key={service.id || index} className={`${cardBg} rounded-xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group`}>
                            
                            {/* Icon Container */}
                            <div className="w-16 h-16 rounded-2xl bg-brand-gold/10 flex items-center justify-center mb-6 group-hover:bg-brand-gold/20 transition-colors">
                                {iconMap[service.icon]}
                            </div>
                            
                            {/* Content */}
                            <h3 className="text-xl font-bold text-brand-ink mb-4 heading-font group-hover:text-brand-gold transition-colors">
                                {service.title}
                            </h3>
                            
                            <p className="text-gray-600 leading-relaxed mb-6">
                                {service.description}
                            </p>
                            
                            {/* Optional Link (Can be styled if needed) */}
                            {service.link && (
                                <NavLink to={service.link} className="text-brand-green font-medium hover:text-brand-ink transition-colors flex items-center gap-2">
                                    Learn More <i className="fa fa-angle-right" />
                                </NavLink>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ServicesGrid;
