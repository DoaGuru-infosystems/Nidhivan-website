import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaFileSignature, FaCity, FaTree, FaCheckCircle, FaUsers } from 'react-icons/fa';

const iconMap = {
    "flaticon-home": <FaHome className="text-4xl text-[#915523]" />,
    "flaticon-contract": <FaFileSignature className="text-4xl text-[#915523]" />,
    "flaticon-skyline": <FaCity className="text-4xl text-[#915523]" />,
    "flaticon-real-estate": <FaTree className="text-4xl text-[#915523]" />,
    "flaticon-sketch": <FaCheckCircle className="text-4xl text-[#915523]" />,
    "flaticon-users": <FaUsers className="text-4xl text-[#915523]" />
};

var bgimg1 = new URL('../../images/background/cross-line2.png', import.meta.url).href;

const usps = [
    {
        title: "Premium Farmhouse Destinations",
        description: "Experience beautifully planned farmhouse communities surrounded by lush greenery, scenic landscapes, and peaceful environments that offer the perfect escape from city life.",
        icon: "flaticon-home"
    },
    {
        title: "Trusted & Transparent Process",
        description: "From site visits to documentation and property registration, we maintain complete transparency at every stage, ensuring a smooth and worry-free buying experience.",
        icon: "flaticon-contract"
    },
    {
        title: "Prime Investment Locations",
        description: "Our projects are strategically located near rapidly developing areas with excellent road connectivity, making them ideal for both personal use and future appreciation.",
        icon: "flaticon-skyline"
    },
    {
        title: "Nature Inspired Living",
        description: "Enjoy a healthier lifestyle with open spaces, fresh air, landscaped surroundings, and thoughtfully designed environments that bring you closer to nature every day.",
        icon: "flaticon-real-estate"
    },
    {
        title: "Modern Amenities & Infrastructure",
        description: "Wide internal roads, gated entrances, green landscapes, recreational spaces, and essential infrastructure are carefully planned to enhance comfort and convenience.",
        icon: "flaticon-sketch"
    },
    {
        title: "Dedicated Customer Support",
        description: "Our experienced team is always available to guide you through every step—from selecting the right property to post-purchase assistance and customer care.",
        icon: "flaticon-users"
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
                                    <h3 className="sep-line-one ">Why Choose Nidhivan Developers?</h3>
                                </div>
                            </div>
                            <p className="max-w-2xl text-gray-600">
                                At Nidhivan Developers, we create more than just properties—we build peaceful destinations where nature, comfort, and long-term value come together. Whether you're looking for a weekend retreat, a farmhouse investment, or a secure land ownership opportunity, we ensure every project reflects quality, trust, and thoughtful planning.
                            </p>
                        </div>
                        {/* TITLE END */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {usps.map((item, index) => (
                                <div className="bg-gray-50 rounded-xl p-8 text-center hover:-translate-y-2 transition-transform duration-300 border border-gray-100 shadow-sm hover:shadow-md" key={index}>
                                    <div className="w-16 h-16 mx-auto bg-[#915523]/10 rounded-full flex items-center justify-center mb-6">
                                        {iconMap[item.icon] || <i className={`${item.icon} text-3xl text-[#915523]`} />}
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
