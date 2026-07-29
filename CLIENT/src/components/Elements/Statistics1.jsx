import React from 'react';
import CountUp from 'react-countup';
import { siteData } from '../../data/siteContent';

var bgimg1 = "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?w=1600&q=80"; // TEMP LIVE PREVIEW

class Statistics1 extends React.Component {
    
    render() {
        return (
            <>
                <div className="section-full relative mobile-page-padding p-t80 p-b80 bg-parallax ml-auto" data-stellar-background-ratio="0.5" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
                    {/* Darker Overlay for better contrast */}
                    <div className="absolute inset-0 bg-black/70 z-0" />
                    
                    <div className="max-w-7xl mx-auto px-4 relative z-10">
                        <div className="section-content">
                            <div className="counter-blocks">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {siteData.statistics.map((stat, index) => (
                                        <div className="flex flex-col items-center justify-center p-8 border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg hover:-translate-y-2 transition-transform duration-300 group" key={index}>
                                            <div className="mb-4">
                                                <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 group-hover:from-[#fb5455] group-hover:to-[#ff9a9a] transition-all duration-500 m-0 text-center">
                                                    <span className="counter"><CountUp end={parseInt(stat.value)} duration={3} enableScrollSpy={true} scrollSpyOnce={true} /></span>
                                                    <span>{stat.suffix}</span>
                                                </h2>
                                            </div>
                                            <div className="w-12 h-1 bg-[#fb5455] mb-4 group-hover:w-24 transition-all duration-500 rounded"></div>
                                            <h4 className="m-0 text-white text-lg tracking-wider uppercase font-semibold text-center">{stat.label}</h4>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default Statistics1;