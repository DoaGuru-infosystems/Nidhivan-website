import React from 'react';
import CountUp from 'react-countup';
import { siteData } from '../../data/siteContent';

const StatsBar = () => {
    return (
        <section className="bg-brand-ink py-16 border-y-4 border-brand-gold">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x md:divide-gray-800">
                    {siteData.statistics.map((stat, index) => (
                        <div key={index} className="text-center px-4">
                            <h2 className="text-4xl md:text-5xl font-bold text-brand-gold mb-2 heading-font flex justify-center items-baseline">
                                <CountUp end={parseInt(stat.value)} duration={5} enableScrollSpy={true} scrollSpyOnce={true} />
                                <span>{stat.suffix}</span>
                            </h2>
                            <p className="text-gray-300 font-medium uppercase tracking-wider text-sm">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsBar;
