import React from 'react';
import { NavLink } from 'react-router-dom';

var bgimg1 = new URL('../../images/background/cross-line2.png', import.meta.url).href;

const usps = [
    {
        title: "Legally Verified Properties",
        description: "Every property goes through a strict legal verification process so you invest with complete peace of mind.",
        icon: "flaticon-sketch"
    },
    {
        title: "Vastu-Compliant Homes",
        description: "We ensure our properties adhere to Vastu principles, bringing positive energy and prosperity to your family.",
        icon: "flaticon-stairs"
    },
    {
        title: "End-to-End Assistance",
        description: "From property visits to legal registration and home loan approvals, we handle everything for you.",
        icon: "flaticon-window"
    },
    {
        title: "Transparent Pricing",
        description: "No hidden charges, no surprise fees. We believe in 100% transparency in all our dealings.",
        icon: "flaticon-skyline"
    }
];

class WhyChooseUsHome extends React.Component {
    render() {
        return (
            <div className="relative py-8 md:pt-20 md:pb-12 bg-white">
                <div className="section-content">
                    <div className="max-w-7xl mx-auto px-4">
                        {/* TITLE START */}
                        <div className="mb-10 text-center flex flex-col items-center">
                            <div className="sx-separator-outer separator-center mb-4">
                                <div className="sx-separator bg-white bg-moving bg-repeat-x" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
                                    <h3 className="sep-line-one ">Why Choose Us</h3>
                                </div>
                            </div>
                            <p className="max-w-2xl text-gray-600">
                                Discover the benefits and unique selling propositions that make Nidhivan Real Estate your trusted partner in finding your dream home.
                            </p>
                        </div>
                        {/* TITLE END */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {usps.map((item, index) => (
                                <div className="bg-gray-50 rounded-xl p-8 text-center hover:-translate-y-2 transition-transform duration-300 border border-gray-100 shadow-sm hover:shadow-md" key={index}>
                                    <div className="w-16 h-16 mx-auto bg-[#118A43]/10 rounded-full flex items-center justify-center mb-6">
                                        <i className={`${item.icon} text-3xl text-[#118A43]`} />
                                    </div>
                                    <h4 className="font-semibold text-lg mb-4 text-slate-800">{item.title}</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WhyChooseUsHome;
