import React from 'react';

const MissionVision = () => {
    return (
        <div className="relative py-12 md:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Mission Card */}
                    <div className="bg-white rounded-2xl p-8 md:p-12 shadow-md border-t-4 border-[#118A43] hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-16 h-16 bg-[#118A43]/10 rounded-full flex items-center justify-center mb-6">
                            <span className="text-4xl">🎯</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-4">Our Mission</h3>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            To empower every individual with the opportunity to own a legally sound and Vastu-compliant property. We strive to provide transparent, end-to-end real estate solutions that simplify the buying process and ensure maximum value for our customers' hard-earned money.
                        </p>
                    </div>

                    {/* Vision Card */}
                    <div className="bg-white rounded-2xl p-8 md:p-12 shadow-md border-t-4 border-[#fb5455] hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-16 h-16 bg-[#fb5455]/10 rounded-full flex items-center justify-center mb-6">
                            <span className="text-4xl">🚀</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-4">Our Vision</h3>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            To become the most trusted and preferred real estate partner globally, recognized for our unwavering ethical standards, innovative property solutions, and a deep commitment to sustainable and community-centric development.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MissionVision;
