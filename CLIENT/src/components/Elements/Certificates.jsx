import React from 'react';

var bgimg1 = new URL('../../images/background/cross-line2.png', import.meta.url).href;

const certificates = [
    {
        title: "RERA Registered",
        description: "Fully compliant with Real Estate Regulatory Authority standards.",
        icon: "fa fa-certificate"
    },
    {
        title: "ISO 9001:2015",
        description: "Certified for quality management systems in real estate.",
        icon: "fa fa-trophy"
    },
    {
        title: "Best Broker Award",
        description: "Recognized as the top real estate consultant of the year.",
        icon: "fa fa-star"
    },
    {
        title: "CREDAI Member",
        description: "Proud member of the Confederation of Real Estate Developers.",
        icon: "fa fa-handshake-o"
    }
];

const Certificates = () => {
    return (
        <div className="relative py-16 md:py-24 bg-gray-50 border-t border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4">
                
                {/* TITLE START */}
                <div className="mb-12 text-center flex flex-col items-center">
                    <div className="sx-separator-outer separator-center mb-4">
                        <div className="sx-separator bg-white bg-moving bg-repeat-x" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
                            <h3 className="sep-line-one">Certifications & Awards</h3>
                        </div>
                    </div>
                    <p className="text-gray-600 max-w-2xl text-lg">
                        Our commitment to excellence is recognized by industry leaders and regulatory bodies.
                    </p>
                </div>
                {/* TITLE END */}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {certificates.map((cert, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center border-b-4 border-[#118A43] hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-16 h-16 mx-auto bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center mb-4 border border-yellow-100">
                                <i className={`${cert.icon} text-2xl`} />
                            </div>
                            <h4 className="font-bold text-lg text-slate-800 mb-2">{cert.title}</h4>
                            <p className="text-sm text-gray-500">{cert.description}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Certificates;
