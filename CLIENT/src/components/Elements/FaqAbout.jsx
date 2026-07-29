import React, { useState } from 'react';

var bgimg1 = new URL('../../images/background/cross-line2.png', import.meta.url).href;

const faqs = [
    {
        question: "Why choose Nidhivan Real Estate over others?",
        answer: "We offer 100% legally verified properties with transparent pricing. Our end-to-end assistance covers everything from site visits to registration and loan approvals, ensuring a hassle-free experience."
    },
    {
        question: "In which locations are your projects currently available?",
        answer: "We are currently operating in prime locations across the city, focusing on high-growth areas that offer excellent ROI and comfortable living environments."
    },
    {
        question: "How many projects have you successfully completed?",
        answer: "We have successfully completed over 10 major residential and commercial projects, bringing joy to more than 500 happy families."
    },
    {
        question: "What is your legal verification process?",
        answer: "Every property we list goes through a rigorous multi-point legal check by our expert legal team, ensuring clear titles, RERA compliance, and zero encumbrances."
    }
];

const FaqAbout = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="relative py-16 md:py-24 bg-white border-t border-gray-100">
            <div className="max-w-4xl mx-auto px-4">
                {/* TITLE START */}
                <div className="mb-12 text-center flex flex-col items-center">
                    <div className="sx-separator-outer separator-center mb-4">
                        <div className="sx-separator bg-white bg-moving bg-repeat-x" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
                            <h3 className="sep-line-one">Got Questions?</h3>
                        </div>
                    </div>
                    <p className="text-gray-600 text-lg">Learn more about our company, projects, and processes.</p>
                </div>
                {/* TITLE END */}
                
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index} 
                            className={`border rounded-lg bg-white overflow-hidden transition-all duration-300 ${activeIndex === index ? 'border-[#118A43] shadow-md' : 'border-gray-200 shadow-sm'}`}
                        >
                            <button
                                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                                onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
                            >
                                <span className={`font-semibold text-lg ${activeIndex === index ? 'text-[#118A43]' : 'text-slate-800'}`}>
                                    {faq.question}
                                </span>
                                <span className={`text-xl transition-transform duration-300 ${activeIndex === index ? 'rotate-180 text-[#118A43]' : 'text-gray-400'}`}>
                                    <i className="fa fa-angle-down" />
                                </span>
                            </button>
                            
                            <div 
                                className={`px-6 overflow-hidden transition-all duration-300 ${activeIndex === index ? 'max-h-40 pb-4 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <p className="text-gray-600">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FaqAbout;
