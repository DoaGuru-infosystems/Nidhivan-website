import React from 'react';

var bgimg1 = new URL('../../images/background/cross-line2.png', import.meta.url).href;
var storyImg = "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80"; // Premium office/meeting image

const AboutStory = () => {
    return (
        <div className="relative py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Image Side */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-[#118A43] transform translate-x-4 translate-y-4 rounded-xl -z-10 transition-transform group-hover:translate-x-6 group-hover:translate-y-6"></div>
                        <img src={storyImg} alt="Our Story" className="w-full h-auto rounded-xl shadow-lg object-cover" />
                    </div>

                    {/* Content Side */}
                    <div className="space-y-6">
                        {/* TITLE START */}
                        <div className="mb-6">
                            <div className="sx-separator-outer separator-left mb-4">
                                <div className="sx-separator bg-white bg-moving bg-repeat-x" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
                                    <h3 className="sep-line-one">Our Story</h3>
                                </div>
                            </div>
                        </div>
                        {/* TITLE END */}
                        
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
                            Building Dreams, One Home at a Time since 2015
                        </h2>
                        
                        <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                            <p>
                                Nidhivan Real Estate started with a simple yet powerful vision: to make the journey of finding a home transparent, trustworthy, and completely stress-free. 
                            </p>
                            <p>
                                Back in 2015, we realized that the real estate market was filled with complexities and hidden agendas. We decided to change the narrative. By combining deep industry expertise with an unwavering commitment to honesty, we laid the foundation of a company that prioritizes people over profits.
                            </p>
                            <p>
                                Today, after years of relentless dedication, we have successfully guided hundreds of families to their dream homes, always ensuring legally verified, Vastu-compliant properties and comprehensive end-to-end support.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AboutStory;
