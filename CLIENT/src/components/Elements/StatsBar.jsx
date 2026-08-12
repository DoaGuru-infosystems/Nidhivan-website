import React from 'react';
import CountUp from 'react-countup';
import { siteData } from '../../data/siteContent';

const StatsBar = () => {
    return (
        <section className="bg-[#fcfaf8] py-16 border-y-4 border-[#eae0d5] relative overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%235F351D\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}></div>
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x md:divide-[#eae0d5]">
                    {siteData.statistics.map((stat, index) => (
                        <div key={index} className="text-center px-2 sm:px-4">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#9C652A] mb-2 heading-font flex justify-center items-baseline">
                                <CountUp end={parseInt(stat.value)} duration={5} enableScrollSpy={true} scrollSpyOnce={true} />
                                <span>{stat.suffix}</span>
                            </h2>
                            <p className="text-[#5F351D] font-bold uppercase tracking-wider text-xs sm:text-sm">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsBar;
