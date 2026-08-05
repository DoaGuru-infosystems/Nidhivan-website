import React, { useState } from 'react';

var bgimg1 = new URL('../../images/background/cross-line2.png', import.meta.url).href;

const faqs = [
    {
        question: "Are your properties legally verified?",
        answer: "Yes, all our plots and farmhouses come with proper registry. We handle the entire legal verification, mutation, and nakal process ourselves."
    },
    {
        question: "Do you provide home or agricultural loans?",
        answer: "Yes, we provide loan assistance from leading banks. Our team helps with the entire documentation process."
    },
    {
        question: "Is a site visit possible before purchasing?",
        answer: "Absolutely. We arrange guided site visits near the Pariyat Dam location. Call or WhatsApp us to schedule your slot."
    },
    {
        question: "What is the minimum plot size available?",
        answer: " Client to confirm fill minimum plot size (in bigha/sqft)]"
    },
    {
        question: "Are the farmhouse plots Vastu compliant?",
        answer: "Yes, all our plots are designed keeping Vastu principles in mind with proper orientation, road facing, and natural sunlight."
    },
    {
        question: "How long does the registry and possession process take?",
        answer: " Client to confirm  e.g. 'Registry is completed within 30-45 days']"
    },
    {
        question: "Can the land be used for farming or agriculture?",
        answer: "Yes, this is agricultural land where you can do farming as well as farmhouse construction. Dual-purpose use is allowed."
    }
];

const FaqHome = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="relative py-12 md:py-20 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4">
                {/* TITLE START */ }
                <div className="mb-12 text-center flex flex-col items-center">
                    <div className="sx-separator-outer separator-center mb-4">
                        <div className="sx-separator bg-white bg-moving bg-repeat-x" style={ { backgroundImage: 'url(' + bgimg1 + ')' } }>
                            <h3 className="sep-line-one">Frequently Asked Questions</h3>
                        </div>
                    </div>
                    <p className="text-gray-600">Find answers to the most common questions about our properties and services.</p>
                </div>
                {/* TITLE END */ }

                <div className="space-y-4">
                    { faqs.map((faq, index) => (
                        <div
                            key={ index }
                            className={ `border rounded-lg bg-white overflow-hidden transition-all duration-300 ${activeIndex === index ? 'border-[#118A43] shadow-md' : 'border-gray-200 shadow-sm'}` }
                        >
                            <button
                                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                                onClick={ () => setActiveIndex(activeIndex === index ? -1 : index) }
                            >
                                <span className={ `font-semibold text-lg ${activeIndex === index ? 'text-[#118A43]' : 'text-slate-800'}` }>
                                    { faq.question }
                                </span>
                                <span className={ `text-xl transition-transform duration-300 ${activeIndex === index ? 'rotate-180 text-[#118A43]' : 'text-gray-400'}` }>
                                    <i className="fa fa-angle-down" />
                                </span>
                            </button>

                            <div
                                className={ `px-6 overflow-hidden transition-all duration-300 ${activeIndex === index ? 'max-h-40 pb-4 opacity-100' : 'max-h-0 opacity-0'}` }
                            >
                                <p className="text-gray-600">{ faq.answer }</p>
                            </div>
                        </div>
                    )) }
                </div>
            </div>
        </div>
    );
};

export default FaqHome;
