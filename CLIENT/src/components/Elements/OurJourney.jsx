import React from 'react';

var bgimg1 = new URL('../../images/background/cross-line2.png', import.meta.url).href;

const milestones = [
    { year: "2015", title: "Company Started", desc: "The foundation of Nidhivan Real Estate was laid with a vision to redefine trust." },
    { year: "2018", title: "100+ Customers", desc: "Reached a major milestone of helping 100 families find their dream homes." },
    { year: "2021", title: "10+ Projects Completed", desc: "Successfully delivered multiple residential and commercial projects." },
    { year: "2024", title: "Expanded to New Locations", desc: "Opened new branches to serve a wider demographic of home buyers." },
    { year: "2026", title: "500+ Happy Families", desc: "Celebrating half a thousand satisfied customers and a growing community." }
];

const OurJourney = () => {
    return (
        <div className="relative py-16 md:py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                
                {/* TITLE START */}
                <div className="mb-16 text-center flex flex-col items-center">
                    <div className="sx-separator-outer separator-center mb-4">
                        <div className="sx-separator bg-white bg-moving bg-repeat-x" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
                            <h3 className="sep-line-one">Our Journey</h3>
                        </div>
                    </div>
                    <p className="text-gray-600 max-w-2xl text-lg">
                        A timeline of our growth, milestones, and the smiles we've earned along the way.
                    </p>
                </div>
                {/* TITLE END */}

                <div className="relative wrap overflow-hidden p-10 h-full">
                    {/* Vertical Line */}
                    <div className="absolute border-opacity-20 border-gray-700 h-full border" style={{ left: '50%' }}></div>

                    {milestones.map((item, index) => {
                        const isLeft = index % 2 === 0;
                        return (
                            <div key={index} className={`mb-8 flex justify-between items-center w-full ${isLeft ? 'flex-row-reverse left-timeline' : 'right-timeline'}`}>
                                <div className="order-1 w-5/12"></div>
                                <div className="z-20 flex items-center order-1 bg-[#118A43] shadow-xl w-16 h-16 rounded-full justify-center text-white font-bold text-lg">
                                    {item.year}
                                </div>
                                <div className={`order-1 bg-gray-50 rounded-lg shadow-md w-5/12 px-6 py-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-t-4 border-[#118A43] ${isLeft ? 'text-right' : 'text-left'}`}>
                                    <h3 className="mb-3 font-bold text-slate-800 text-xl">{item.title}</h3>
                                    <p className="text-sm leading-snug tracking-wide text-gray-600 text-opacity-100">{item.desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
};

export default OurJourney;
