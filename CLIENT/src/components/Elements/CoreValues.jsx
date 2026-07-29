import React from 'react';

var bgimg1 = new URL('../../images/background/cross-line2.png', import.meta.url).href;

const values = [
    {
        title: "Trust",
        description: "Building long-term relationships through absolute honesty in every deal.",
        icon: "fa fa-shield"
    },
    {
        title: "Transparency",
        description: "Clear pricing, no hidden fees, and complete disclosure of property facts.",
        icon: "fa fa-eye"
    },
    {
        title: "Quality",
        description: "Curating only the best, legally verified, and Vastu-compliant properties.",
        icon: "fa fa-star"
    },
    {
        title: "Customer First",
        description: "Your needs dictate our actions. We are dedicated to your complete satisfaction.",
        icon: "fa fa-heart"
    },
    {
        title: "Innovation",
        description: "Embracing modern technology and approaches to simplify real estate.",
        icon: "fa fa-lightbulb-o"
    },
    {
        title: "Sustainability",
        description: "Promoting eco-friendly spaces and sustainable community living.",
        icon: "fa fa-leaf"
    }
];

const CoreValues = () => {
    return (
        <div className="relative py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                
                {/* TITLE START */}
                <div className="mb-16 text-center flex flex-col items-center">
                    <div className="sx-separator-outer separator-center mb-4">
                        <div className="sx-separator bg-white bg-moving bg-repeat-x" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
                            <h3 className="sep-line-one">Our Core Values</h3>
                        </div>
                    </div>
                    <p className="text-gray-600 max-w-2xl text-lg">
                        The fundamental beliefs that guide our actions, behavior, and the way we do business.
                    </p>
                </div>
                {/* TITLE END */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {values.map((item, index) => (
                        <div key={index} className="group p-8 rounded-xl border border-gray-100 hover:border-[#118A43] hover:shadow-xl transition-all duration-300 text-center bg-gray-50 hover:bg-white cursor-pointer">
                            <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-[#118A43] transition-all duration-300">
                                <i className={`${item.icon} text-3xl text-[#118A43] group-hover:text-white transition-colors`} />
                            </div>
                            <h4 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h4>
                            <p className="text-gray-600">{item.description}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default CoreValues;
