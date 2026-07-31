import React from 'react';

const TimelineSection = ({ 
    title = "Our Journey", 
    subtitle = "Milestones", 
    description = "Discover the key milestones that shaped Nidhivan Developer into the trusted real estate brand it is today.",
    data = [] 
}) => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4">
                
                {/* Section Header */}
                <div className="text-center mb-16">
                    {subtitle && <h4 className="text-brand-green font-semibold uppercase tracking-wider mb-2">{subtitle}</h4>}
                    {title && <h2 className="text-4xl md:text-5xl heading-font text-brand-ink mb-4">{title}</h2>}
                    {description && <p className="text-gray-600 text-lg max-w-2xl mx-auto">{description}</p>}
                </div>

                {/* Timeline Container */}
                <div className="relative border-l-2 border-brand-green/20 ml-4 md:ml-0 md:border-l-0">
                    
                    {/* Central Line for Desktop */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-brand-green/20 transform -translate-x-1/2"></div>
                    
                    <div className="space-y-12">
                        {data.map((item, index) => (
                            <div key={index} className={`relative flex flex-col md:flex-row items-start md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                
                                {/* Timeline Dot */}
                                <div className="absolute left-[-9px] md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-brand-gold border-4 border-white shadow-sm mt-1.5 md:mt-0 z-10"></div>
                                
                                {/* Content Card */}
                                <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12 text-left md:text-right'}`}>
                                    <div className="bg-bg-cream-alt p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="text-brand-green font-bold text-lg mb-1">{item.year}</div>
                                        <h3 className="text-xl font-bold text-brand-ink heading-font mb-2">{item.title}</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default TimelineSection;
